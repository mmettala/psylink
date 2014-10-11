var users = function()
{
    var db = null;
};

exports.register_db = function (_db)
{
    db = _db;
};

exports.create_user = function(name, age, sex, answers)
{
    return {name: name,
	    age: age,
	    sex: sex,
	    answers: answers}; //One can't get the list of argument-names and zipwith arguments' values in JS?
};

exports.find_user = function(search_terms)
{
    if(db == null) console.log( "Db not registered");
    else  return db.users.find(search_terms);
};

exports.users = users;
