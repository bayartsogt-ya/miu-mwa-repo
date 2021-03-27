const RANDOM_USER_LINK = 'https://randomuser.me/api/?page=3&results=10';

// ------ import deps ------
const express = require('express');
const superagent = require('superagent');
const { from, Subject } = require('rxjs');
const { map } = require('rxjs/operators');

// ------ init ------
const app = express();

// ------ configure express ------
// app.set | app.enable
app.disable('etag');
app.disable('x-powered-by');

// ------ middleware ------
// it will come tomorrow

// ------ subject ------
const subject = new Subject();

subject.subscribe({
    next: async (reqObj) => {
        const results = await superagent.get(RANDOM_USER_LINK);
        let users = [];
        from(results.body.results)
            .pipe(
                map((obj, index) => {
                    users[index] = obj.name;
                })
            )
            .subscribe();

        reqObj.res.json({ users });
    },
});

// ------ routes ------
app.get('/users', async (req, res) => {
    res.set('Cache-control', 'private, max-age=86400');
    console.log(`url ${req.url}`);
    subject.next({ req, res });
});

// ------ error handlers ------
// it will come tomorrow

// ------ bootup ------
app.listen(3000, () => console.log(`listening on 3000`));
