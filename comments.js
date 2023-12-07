//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

var comments = {
    "comment1": "This is the first comment",
    "comment2": "This is the second comment"
};

//create server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var extname = path.extname(pathname);
    console.log(extname);
    if (pathname == '/') {
        fs.readFile('index.html', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (extname == '.css') {
        fs.readFile(pathname.substring(1), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/css' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (pathname == '/comment') {
        var postData = '';
        req.on('data', function (chunk) {
            postData += chunk;
        });
        req.on('end', function () {
            var postComment = querystring.parse(postData);
            var comment = postComment.comment;
            var commentId = 'comment' + (Object.keys(comments).length + 1);
            comments[commentId] = comment;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(comments));
        });
    } else {
        fs.readFile(pathname.substring(1), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
}).listen(8080);
