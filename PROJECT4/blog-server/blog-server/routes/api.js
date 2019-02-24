var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


async function authenticateCookie(token,username){
	if(token===undefined||username===undefined){
		console.log("params undefined");
		return false;
	}
	try {
		var secretKey="C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
 		var decoded = await jwt.verify(token,secretKey);
 		return (username===decoded.usr&& (new Date().getTime()/1000<decoded.exp));
	} catch(err) {
		return false;
	}
}

function checkParameter(array){
	for (let element of array){
		if(element===undefined)
			return false;
	}
	return true;
}

router.get('/:username', async function(req, res, next) {
	console.log("get1 ")

	if(await authenticateCookie(req.cookies.jwt,req.params.username)
			===false){
		console.log("authenticateCookie failed");
		res.status(401).redirect('http://localhost:3000/login?redirect=/edit/');
		return;
	}
	try{
		var result;
		var query={username:req.params.username};
		var col=req.app.get('PostsColl')
        result = await col.find(query).toArray();
        console.log("finish reading");
    }catch(e){
        console.error(e.message);
    }
    res.status(200).json(result)
});

router.get('/:username/:postid', async function(req, res, next) {
	console.log("get2 ")

	if(await authenticateCookie(req.cookies.jwt,req.params.username)
			===false){
		console.log("authenticateCookie failed");
		res.status(401).redirect('http://localhost:3000/login?redirect=/edit/');
		return;
	}
	try{
		var result;
		var query={username:req.params.username,
			postid:parseInt(req.params.postid)};
		var col=req.app.get('PostsColl')
        result = await col.findOne(query);
        console.log("finish reading");
    }catch(e){
        console.error(e.message);
    }
    if(result===null)
    	res.status(404).json({success:false});
    else
    	res.status(200).json(result)
});

router.post('/:username/:postid', async function(req, res, next) {
	console.log("post ")

	if(await authenticateCookie(req.cookies.jwt,req.body.username)
			===false){
		console.log("authenticateCookie failed");
		res.status(401).redirect('http://localhost:3000/login?redirect=/edit/');
		return;
	}
	try{
		console.log(req.body)
		if(checkParameter(
			[req.body.username,req.body.postid,req.body.body,req.body.title])
			===false){
			console.log("checkParameter failed")
			res.status(400).json({success:false});
			return;
		}
		var query={username:req.body.username,
			postid:parseInt(req.body.postid)};
		var col=req.app.get('PostsColl')
        var found = await col.find(query).count();
        if(found > 0){
			console.log("fOUND >0 failed")
    		res.status(400).json({success:false});
    		return;
        }
		var newPost={
			postid:parseInt(req.body.postid),
			username:req.body.username,
			created:new Date().getTime(),
			modified:new Date().getTime(),
			title:req.body.title,
			body:req.body.body};
    	await col.insertOne(newPost);
		res.status(201).json({success:true});
    }catch(e){
        console.error(e.message);
    }
})

router.put('/:username/:postid', async function(req, res, next){
	console.log("put ")

	if(await authenticateCookie(req.cookies.jwt,req.params.username)
			===false){
		console.log("authenticateCookie failed");
		res.status(401).redirect('http://localhost:3000/login?redirect=/edit/');
		return;
	}

	try{
		if(checkParameter(
			[req.params.username,req.params.postid,req.body.body,req.body.title])
			===false){
			res.status(400).json({success:false});
			return;
		}
		var query={username:req.params.username,
			postid:parseInt(req.params.postid)};
		var col=req.app.get('PostsColl')
        var found = await col.find(query).count();
        if(found === 0){
        	console.log("here")
    		res.status(400).json({success:false});
    		return;
        }
        var query={postid:parseInt(req.params.postid),username:req.params.username};
		var newContent={
			modified:new Date().getTime(),
			title:req.body.title,
			body:req.body.body};
    	await col.updateOne(query,{$set:newContent});
		res.status(200).json({success:true});
    }catch(e){
        console.error(e.message);
    }
});

router.delete('/:username/:postid', async function(req, res, next){
	console.log("delete ")
	if(await authenticateCookie(req.cookies.jwt,req.params.username)
			===false){
		console.log("authenticateCookie failed");
		res.status(401).redirect('http://localhost:3000/login?redirect=/edit/');
		return;
	}
	try{
		if(checkParameter([req.params.username,req.params.postid])===false){
			res.status(400).json({success:false});
			return;
		}
		var query={username:req.params.username,
			postid:parseInt(req.params.postid)};
		var col=req.app.get('PostsColl')
        var found = await col.find(query).count();
        if(found === 0){
    		res.status(400).json({success:false});
    		return;
        }
        var query={postid:parseInt(req.params.postid),username:req.params.username};
    	await col.deleteOne(query);
		res.status(204).json({success:true});
    }catch(e){
        console.error(e.message);
    }

});

module.exports = router;
