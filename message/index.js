var http = require("http")
var url = require('url')
var fs = require("fs")
const qs = require('querystring') 


http.createServer(function (req,res) {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<form method='POST' action='/message'>")
        res.write("<label>Message</label>")
        res.write("<p><input type='input' name='message'></p>")
        res.write("<p><button type='submit'>Submit</button></p>")
        res.write("</form>")
        res.end()
    }
    if(req.method == 'POST'){
        var body = "";
        req.on('data', function(data){
            data = data.toString()
            data = data.split('=')
            fs.appendFile('message.txt',data[1], (err, file)=>{
                if(err) throw err;
                console.log('Saved!')
                res.write(data[1])
            })
        });       
       res.on('end', function () {
           var post = qs.parse(body);
           console.log(post)
       });
    }
}).listen(8080);