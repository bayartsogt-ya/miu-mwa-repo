/**
 * Exercise 04
 * Create a web server that's going to send a response of big file (bigger than 500MB)
 * to any client that sends a request to your specified server:port.
 * Solve this question in three different ways and inspect the loading time in the browser, 
 * try to send many requests at the same time to observe performance differences, 
 * and write down your observations.
 * 
 * [ ] Use readFileSync
 * [ ] Use readFile
 * [ ] Use streams API
 */

const fs = require('fs');
const {join} = require('path');


const port = 5050;
const pathToRead = "files/УЛААН БАЛ- Л.ЭНХ-АМГАЛАН  _ULAAN BAL-L.ENKH-AMGALAN-xZ26IJ4Fw1M.mp4"


require('http').createServer(function(req, res) {
    console.log("[success] entered in !");
    // resHandler0(res);
    // resHandler1(res);
    resHandler2(res);
}).listen(port, () => console.log(`listening port=${port}`));


var resHandler0 = (res) => {
    const f = fs.readFileSync(join(__dirname, pathToRead), 'utf-8');
    console.log("[success] read file!");

    res.writeHead(200, {'Content-Type': 'video/mp4'});
    res.end(f);
    return "done";
}

var resHandler1 = (res) => {
    fs.readFile(join(__dirname, pathToRead), 'utf-8', (err, data) => {
        console.log("[success] read file!");
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        res.end(data);
    });
}

var resHandler2 = (res) => {
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    fs.createReadStream(join(__dirname, pathToRead)).pipe(res);
}

