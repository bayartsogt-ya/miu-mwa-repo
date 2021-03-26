/* 
Exercise 02
- Build a pseudo-class named Gym that emits a boom event every 1 second.
- Add a method rest() to stop the interval.
- Create an instance of Gym and bind to the boom event, printing Athlete
is working out every time it gets one.

 */

const { EventEmitter } = require("events");

class Gym extends EventEmitter {
    constructor() {
        super();
        this.interval_id;
        this.on("boom", function() {
            this.interval_id = setInterval(() => console.log("booming"), 1000);
        });
        this.emit("boom");
    }

    rest() {
        clearInterval(this.interval_id);
    }
}

// const gym = new Gym();
// setTimeout(gym.rest.bind(gym), 3000);

const newGym = new Gym();
newGym.on.bind(newGym).on("boom", () => console.log("Athlete is working out"));
console.log(newGym);