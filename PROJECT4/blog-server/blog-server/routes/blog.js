var express = require('express');
var router = express.Router();
const cm = require('commonmark');


/* GET home page. */
router.get('/:username', async function(req, res, next) {
	var start=req.query.start;
	if(start===undefined || start ===NaN){
		start='0';
	}
	var query={postid:{$gte:parseInt(start)}, username:req.params.username};
	var result;
	try{
		var col=req.app.get('PostsColl')
        result = await col.find(query).limit(6).toArray();
        console.log("finish reading");
    }catch(e){
        console.error(e.message);
    }
    if(result.length===0){
    	res.send('No Post Found');
    	return;
    }
    data={posts:result,username:req.params.username};
	res.render('postList',data);
});


router.get('/:username/:postid', async function(req, res, next) {
	var start=0;
	var result;

	function markdownToHtml(str){
		var reader = new cm.Parser();
	    var writer = new cm.HtmlRenderer();
	    var parsed = reader.parse(str); // parsed is a 'Node' tree
	   	return writer.render(parsed); // result is a String
	}

	const query={postid:parseInt(req.params.postid), username:req.params.username}
	try{
		var col=req.app.get('PostsColl')
        result = await col.findOne(query);
        console.log("finish reading");
    }catch(e){
        console.error(e.message);
    }
    if(result===null)
    	result={title:"NOT FOUND",body:"NOT FOUND"};
    result.title=markdownToHtml(result.title)
    result.body=markdownToHtml(result.body)
  	res.render('post',result);
});

module.exports = router;
