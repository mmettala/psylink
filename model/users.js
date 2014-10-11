db = null;

exports.register_db = function (connectiondriver)
{
    db = connectiondriver;
};

exports.create_user = function(name, age, sex, answers, pwd)
{
    return {name: name,
	    age: age,
	    sex: sex,
	    hash: pwd,
	    answers: answers}; //One can't get the list of argument-names and zipwith arguments' values in JS?
};

exports.find_user = function(search_terms)
{
    if(db == null) console.log( "Db not registered");
//    else db.
};

exports.save_user = function(user_obj, callback)
{
    db.save("Users", user_obj, function(error, stuff)
	    {
		if(error) callback(false);
		else callback(true);
	    });
}

