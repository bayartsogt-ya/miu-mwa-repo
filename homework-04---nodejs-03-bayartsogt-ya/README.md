# MWA Homework 4 - NodeJS 03
## Exercise
Create a **Reactive HTTP server** that receives a number passed in the request as query parameter as following: `http://localhost:4000/?n=10` and returns a `JSON` object contains the Fibonacci number of `n`.  
**Example**: `?n=10` should return a `JSON` object: `{fib: 55}`  
  
**Note:** Calculating Fibonacci is considered an intense CPU work, design your code so it does not block the main event-loop of the master process. 
  
  **Note: Add `node_modules` folder to your `.gitignore` file. You should only push your code along with `package.json` and `package-lock.json`**
