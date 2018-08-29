var http = require('http'); 
var url = require('url');



var server  = http.createServer(function (req, res) {

	var parsedUrl = url.parse(req.url, true);

    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var choosenhandler = (typeof(router[trimmedPath]) != 'undefined') ? router[trimmedPath] : handlers.notfound;
        // console.log(choosenhandler);
        // console.log(router[trimmedPath]);
        // console.log(handlers.notfound);

        var data = {

        };

        choosenhandler(data, function(statusCode, payload) {

            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type','application/json');   
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('status code: ', statusCode, 'payload: ', payloadString);

        });

})

server.listen(7000, function () {
	console.log('Server listening on port ' + 7000);
})

var handlers = {};

handlers.hello = function(data, callback) {

    callback(200, {
    	'data': 'Hi, Welcome to node app.'
    });

}

handlers.notfound = function(data, callback) {

     callback(404, {
    	'data': 'Page Not found'
    });

}

var router = {
    'hello': handlers.hello
}
