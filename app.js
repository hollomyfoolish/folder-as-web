var express = require('express'),
	args = process.argv.splice(2);

if(args.length === 0){
	console.error('argument of folder path is required.');
	return;
}

var server = express();
server.use(express.static(args[0]));
server.listen(18888, function(){
	console.log('folder [' + args[0] + '] as web on port 18888');
});