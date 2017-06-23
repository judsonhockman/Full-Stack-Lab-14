var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');

var app = express();
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.route('/api/chirps')
    .get(function (req, res) {
        res.sendFile(dataPath);
    }).post(function (req, res) {
        var newChirp = req.body;
        readFile(dataPath, 'utf8')
            .then(function (fileContents) {
                var chirps = JSON.parse(fileContents); // JavaScript Object Notation...Parse converts the JSON string into an object.
                chirps.push(newChirp);
                return writefile(dataPath, JSON.stringify(chirps)); // Stringify converts the JavaScript value back int a JSON strin.
            }).then(function () {
                res.sendStatus(201);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });
app.listen(3000);

function readFile(filePath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, encoding, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
function writefile(filePath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
       //Instead of: res.end();
       //use:
   //   res.send("Hello World"); 
             // to send text/html
            // or this...
   //     res.send({name: "John"});
           // application/json (and it stringifies it for you!)

         // When using res.send()...
         // Express will automatically set the response status code to 200
         // If you want to set a different value, use res.status()
         //•Can be chained
        //  res.status(201).end(); // or 
        //  res.status(200).send("Hello!"); // or
        //  res.status(404).send("Not found!"); 
// **** Remember:
//           res.status(404); Sets the status code to 404, but does not send a response (connection remains open). 
//                            Requires a .send(...) later.
 //       res.sendStatus(404);  
 //       Sets the status code to 404 and sends NOT FOUND as the response which closes the connection.



