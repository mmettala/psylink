// based on http://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app

var http = require('http'),
express = require('express'),
path = require('path'),
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./collectionDriver').CollectionDriver,
u = require("./model/users");


var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/resources", express.static(__dirname + '/resources'));


var mongoHost = 'localHost';
var mongoPort = 27017;
var collectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function(err, mongoClient) {
    if (!mongoClient) {
    	console.error("Error! Exiting... Must start MongoDB first");
    	process.exit(1);
    }
    var db = mongoClient.db("MyDatabase");
    collectionDriver = new CollectionDriver(db);
    u.register_db(collectionDriver);
});


app.get('/', function(req, res){
    res.render('frontpage');
});

app.get('/ptprofiles', function(req, res){
  res.render('ptprofiles');
});

app.get('/register-client', function(req, res){
  res.render('clientprofile');
});


app.get('/register', function(req, res){
    res.render('questionnaire');
});

app.get('/register-doctor', function(req, res){
    res.render('doctorquestionnaire');
});

function calculateScore(answers)
{
    return Math.sqrt(answers
	       .map(function(x)
		    {
			return x*x;
		    })
	        .reduce(function(x,y)
			{
			    return x+y; 
			}));
}

function textToNumbers(doc_user)
{
    return [doc_user.Cognitive ? doc_user.Cognitive == "on"? 2:1:0,
	    doc_user.Psychodynamic ? doc_user.Psychodynamic == "on"? 2:1:0,
	    doc_user.Behavioral ? doc_user.Behavioral == "on"? 2:1:0,
	    doc_user.Interpersonal ? doc_user.Interpersonal == "on"? 2:1:0,
	    doc_user.Gestalt ? doc_user.Gestalt == "on"? 2:1:0,
	    2 * doc_user.reserved,
	    2 * doc_user.considered,
	    2 * doc_user.outsider[0],
	    2 * doc_user.outsider[1],
	    2 * doc_user.leader_appointedness[0],
	    2 * doc_user.leader_appointedness[1],
	    2 * doc_user.family_first,
	    2 * doc_user.love_job,
	    2 * doc_user.achivied_success,

	    doc_user["Health"] ? doc_user["Health"] == "on"? 2:1:0,
	    doc_user["Restored work ability"] ? doc_user["Restored work ability"] == "on"? 2:1:0,
	    doc_user["Acceptance and managment of your situation"] ? doc_user["Acceptance and managment of your situation"] == "on"? 2:1:0,
	    doc_user["Better relationships"] ? doc_user["Better relationships"] == "on"? 2:1:0,
	    doc_user["Resources to tackle the challenges in life"] ? doc_user["Resources to tackle the challenges in life"] == "on"? 2:1:0];
}

Array.prototype.take = function (l) { return this.slice(0,l);}

app.post('/search', function(req, res){
    collectionDriver.findAll("doctors", function(error, allDoctors){
	if(error){res.send(400, error); }
	else {
	    console.log("All doctors:");
	    //console.log(allDoctors);
	    var doctors = allDoctors.
		map(function(doc)
		     {
			 return {doc: doc,
				 score: calculateScore(textToNumbers(doc))};
		     }).
		sort(function(a,b)
		      {
			  return b.score-a.score;
		      }).
	        map(function(doc)
		     {
			 return doc.doc;
		     }).
		take(10);
	    console.log("iojfsdijfoojis");
	    //   console.log(doctors);
	    
	    // for(var i=0; i<doctors.length; i++)
	    // {
	    // 	console.log(doctors[i]);
//	    }			
			    
	    res.render('searchresults', doctors);
	}
    });    
});

app.get('/admin', function(req, res){
    res.render('admin');
});

app.get('/api/:collection', function(req, res) {
    var params = req.params;
    console.log(params);
    collectionDriver.findAll(req.params.collection, function(error, objs) {
        if (error) { res.send(400, error); }
        else {
            res.set('Content-Type','application/json');
            res.send(200, objs);
        }
    });
});

app.get('/data/:collection', function(req, res) {
    var params = req.params;
    console.log(params);
    collectionDriver.findAll(req.params.collection, function(error, objs) {
        if (error) { res.send(400, error); }
        else {
            if (req.accepts('html')) {
              console.log("sadsa")
                res.render('data',{objects: objs, collection: req.params.collection});
            } else {
		            res.set('Content-Type','application/json');
                res.send(200, objs);
            }
        }
    });
});


app.get('/data/:collection/:entity', function(req, res) {
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
    	collectionDriver.get(collection, entity, function(error, objs) {
                if (error) { res.send(400, error); }
                else { res.send(200, objs); }
    	});
    } else {
      res.send(400, {error: 'bad url', url: req.url});
    }
});

app.post('/data/:collection', function(req, res) {
    var object = req.body;
    var collection = req.params.collection;
    collectionDriver.save(collection, object, function(err,docs) {
        if (err) { res.send(400, err); }
        else { res.send(201, docs); }
    });
});

function extractRecipientSex(form)
{
    return form.male == "on"? "Male":"Female";
}

function getYear(iso8061)
{
    return Number(iso8061.match(/^\d{4}/)[0]);
}

app.post('/insert_user', function(req, res){ //Server returns JSON from somewhere if the path is /data/insert

    req.body.name = req.body.name[0];

    console.log(req.body);

    //Never do this IRL
    collectionDriver.save(req.body.collection, req.body, function(err, docs){
	if (err) { res.send(400, err); }
        else { res.send(201, docs); }
    });
});
    
   
app.put('/data/:collection/:entity', function(req, res) {
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
    	collectionDriver.update(collection, req.body, entity, function(error, objs) {
                if (error) { res.send(400, error); }
                else { res.send(200, objs); }
    	});
    } else {
    	var error = { "message" : "Cannot PUT a whole collection" };
    	res.send(400, error);
    }
});

app.delete('/data/:collection/:entity', function(req, res) {
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
    	collectionDriver.delete(collection, entity, function(error, objs) {
                if (error) { res.send(400, error); }
                else { res.send(200, objs); }
    	});
    } else {
    	var error = { "message" : "Cannot DELETE a whole collection" };
    	res.send(400, error);
    }
});


app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
