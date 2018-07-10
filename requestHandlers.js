var exec = require("child_process").exec;
var querystring = require("querystring");
var StringDecoder = require("string_decoder").StringDecoder;
var fs = require("fs");
var formidable = require("formidable")

var decoder = new StringDecoder("utf8");
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

//文本框输入文字
// function start(response, postData) {
//   console.log("Request handler 'start' was called.");
//   var body = '<html>'+
//     '<head>'+
//     '<meta http-equiv="Content-Type" content="text/html"'+
//     'chartset=UTF-8" />'+
//     '</head>'+
//     '<body>'+
//     '<form action="/upload" method="post">'+
//     '<textarea name="text" rows="20" cols="60"></textarea>'+
//     '<input type="submit" value="Submit text"/>'+
//     '</form>'+
//     '</body>'+
//     '</html>';

//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(body);
//     response.end();
// }

//上传图片
function start(response) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html"'+
    'chartset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

//上传文字
// function upload(response, postData) {
//   console.log("Request handler 'upload' was called.")
//   response.writeHead(200, {"Content-Type": "text/html"});//设置成text/html不需要解码
//   response.write("You've sent: " + querystring.parse(postData).text);
//   response.end(); 
// }

//上传图片
function upload(response, request) {
  console.log("Request handler 'upload' was called.")
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "./tmp/test.png");

  })
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br/>");
  response.write("<img src='/show' />");//src的值就是一个url
  response.end(); 
}

//展示图片
function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png","binary", function(error, file) {
    if(error)  {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    }else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
