/**
 * Exercise 03
 * Write an asynchronous Node program that has a function checkSystem() that checks 
 * if the system memory size is at least 4 GB and the processor has more than 2 cores (use os core module).
 * 
 * When you call the function, you should receive an immediate message on the console Checking your system…
 * If the system doesn't have enough memory we should print a message to the console: This app needs at least 4 GB of RAM
 * If the system doesn't have at least 2 cores, print this message to the console: Processor is not supported
 * If the system has enough specs, print the following message System is checked successfully.
 */

const { cpus } = require('os');

var minMemory = 4; // GB
var minCores = 2 // # of cores

function checkSystem() {
    /* it will check system memory */
    console.log("Checking your system...");

    var checkSystemPromise = new Promise((resolve, response) => {
        const memoryEnough = process.memoryUsage().heapTotal / (1024 ** 2) > minMemory;
        const coreEnough = cpus().length > minCores;
        let log = "";
        if (!memoryEnough)              log += "This app needs at least 4 GB of RAM\n";

        if (!coreEnough)                log += "Processor is not supported\n";

        if (memoryEnough && coreEnough) log += "System is checked successfully."

        resolve(log);
    });

    checkSystemPromise.then(console.log);
}

checkSystem();