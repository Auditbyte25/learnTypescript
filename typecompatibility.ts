let items = [1, 2, 3];

items.forEach((item, index, array) => {
    console.log(`Index${index} -- Value = ${item} -- Array = ${array}`)
});

// Should be OK!
items.forEach((item) => console.log(item));

/* `SETTIMEOUT` - RUNS A FUNCTION ONCE AFTER A SPECIFIED DELAY 
   `SETINTERVAL` - RUNS A FUNCTION REPEATEDLY AT A FIXED INTERVALS */
setTimeout(() => { console.log("Runs Once After 5 Seconds") }, 5000)
// setInterval(()=> console.log("Runs repeatedly after 1 second"), 1000)

for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (x) {
        setTimeout(function() {console.log(x)}, 100 * x)
    })(i);
}

let fa = 400;
function foo() {
    let fa = 800
    console.log(fa)
    return A1
}

let A1 = 2
foo()

let xf = 10;
// let xf = 20;
console.log(fa);
// 