const port = 3030;

// eslint-disable-next-line no-undef
const http = require('http');
const url = require('url');
const { fork } = require('child_process');
const { Subject } = require('rxjs');

const subject = new Subject();

subject.subscribe({
    next: (object) => {
        if (object.req.url === '/favicon.ico') return object.res.end('no icon');

        const n = parseInt(url.parse(object.req.url, true).query.n);
        const childProcess = fork('./src/fib.js');
        childProcess.send(n);
        childProcess.on('message', (fibn) => {
            object.res.end(`FIB(${n}) = ${fibn}`);
        });
    },
});

const server = http.createServer(function (req, res) {
    subject.next({ req, res });
});

server.listen(port, () => console.log(`listening port=${port}`));
