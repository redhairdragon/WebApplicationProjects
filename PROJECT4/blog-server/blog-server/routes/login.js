var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

async function checkPassword(req,username,password){
	try{
		var col=req.app.get('UsersColl');
		var query={username:username};
		var projection={password:1}
        result = await col.findOne(query,projection);
        if(result===null)
        	return false;
        var authenticated=await bcrypt.compare(password,result.password);
    }catch(e){
        console.error(e.message);
    }
    if(authenticated===true){
    	console.log("authentication passed checkPassword")
    	return true;
    }
    else{
    	console.log("authentication failed checkPassword")
    	return false;
    }
}

async function getCookie(username){
	const option={header:{"typ": "JWT","alg": "HS256"}};
	var payload={"exp":Math.floor(Date.now()/1000)+2*(60*60),
				"usr":username};
	var key="C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
	try{
		var token = await jwt.sign(payload, key,option);		
	}catch(e){
        console.error(e.message);
    }
  	return token;
}

router.get('/', async function(req, res, next) {
	var username=req.query.username;
	var password=req.query.password;
	var redirect=req.query.redirect;
	if(redirect===undefined)
		redirect="edit/";
	if(username===undefined)
		username=""
	if(password===undefined)
		password=""

	var authenticated=await checkPassword(req,username,password);
	if(authenticated===true){
		var cookie=await getCookie(username);
		res.cookie("jwt",cookie);
    	console.log("authentication passed")
		res.redirect('http://localhost:3000/'+redirect)
	}
	else{
    	console.log("authentication failed")
  		res.render('login', {password:password,username:username});
	}
});




module.exports = router;
