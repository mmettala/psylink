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

app.post('/search', function(req, res){
    res.render('searchresults');
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
