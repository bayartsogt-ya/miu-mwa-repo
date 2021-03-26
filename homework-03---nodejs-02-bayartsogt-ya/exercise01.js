/*
## Exercise 01
Create a simple Node script that converts `www.miu.edu` domain name to the equivalent IP address.
Use `dns` core module, `resolve4()`
Note: convert the callback function of `resolve4()` to a `Promise` object using `promisify`
and then use `async/await`
*/

const { promisify } = require('util');
const { resolve4 } = require("dns")

const url = "www.miu.edu";

const resolve4Promise = promisify(resolve4);

(async function () {
    result = await resolve4Promise(url);
    console.log("IP: " + result);
})();