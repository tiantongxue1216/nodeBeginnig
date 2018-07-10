var exec = require("child_process").exec;
var querystring = require("querystring");
var StringDecoder = require("string_decoder").StringDecoder;
var fs = require("fs");
var formidable = require("formidable");//解析上传的文件数据

// function start(response) {
//   console.log("Request handler 'start' was called.");
  
//   //模拟阻塞操作
//   // function sleep(milliSeconds) {
//   //   var startTime = new Date().getTime();
//   //   while(new Date().getTime() < startTime + milliSeconds);
//   // }

//   // sleep(5000);
//   // return "hello start";
//   exec("find /", { timeout: 10000, maxBuffer: 20000*1024 }, function(error, stdout, stderr) {
//     response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
//     response.write(stdout);
//     response.end();
//   });
// }

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html"'+
    'chartset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.")
  response.writeHead(200, {"Content-Type": "text/html"});//设置成text/html不需要解码
  response.write("You've sent: " + querystring.parse(postData).text);
  response.end(); 
}

exports.start = start;
exports.upload = upload;