/* ----------- CLASSES ---------- */
// Fields:: A field declaration creates a public writeable property on a class:
// class Point {
//     x: number;
//     y: number;
// }
// const pt = new Point();
// pt.x = 0;
// pt.y = 0;

/* As with other locations, the type annotation is optional, 
BUT IT WILL BE IMPLICIT `any` if not specified. */
class NewPoint {
    x = 0;
    y = 0;
}
const pt = new NewPoint();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);
// The initializer of a class property will be used to infer its type:
console.log(typeof pt.x)

/* ----------- --strictPropertyInitialization ---------- */
// class BadGreeter {
//     name: string;
// }
class BadGreeter {
    name: string;
    
    constructor() {
        this.name = "hello"
    }
}

/* If you intend to definitely initialize a field through 
means other than the constructor (for example, maybe an 
external library is filling in part of your class for you), 
you can use the definite assignment assertion operator, !: */
class OkGreeter {
  // Not initialized, but no error
    name!: string;
}