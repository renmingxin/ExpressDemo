let url = require('url');
let fs = require('fs');

let path = new Map();


function getPicture(request,response){
    let params = url.parse(request.url,true).query;
    try{
        let fileData = fs.readFileSync('./' + params.path);
        console.log(fileData);
        response.writeHead(200);
        response.write(fileData);
        response.end();
    }catch (e) {
        response.writeHead(404);
        response.end();
    }
}

path.set('/getPicture', getPicture);
module.exports.path = path;