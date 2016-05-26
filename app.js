var express = require('express');
var formidable = require('formidable');
var args = process.argv.splice(2),
	fs = require('fs'),
	path = require('path');

if(args.length === 0){
	console.error('argument of folder path required.');
	return;
}
var folder = args[0];
var app = express();
app.use(function(req, res, next){
	if(req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') >= 0){
		var form = new formidable.IncomingForm();
		form.uploadDir = folder;
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files) {
			var filePath = files['VideoAudioBlobData'].path;
			fs.rename(filePath, path.join(filePath, '../record.wav'), function(err){
				if(err){
					console.log(err);
				} else {
					console.log('rename record success.')
				}
			});
			res.writeHead(200, {'content-type': 'text/plain'});
			res.end('received upload:\n\n');
	    });
	    return;
	}
	next();
});
app.use(express.static(folder));

app.listen(1888, function(){
	console.log('app on port: 1888');
});