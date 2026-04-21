/* ----------- CLASSES ---------- */
/* A TYPE annotation is simply when you explicitly tell the compiler what type 
a variable, parameter, or value should be. 
🧠 The simple truth
👉 Property = anything that belongs to an object/class
👉 Field = a property that stores data
👉 Method = a property that is a function
👉 Attribute = a property/field (data on an object)
*/
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

/* ----------- readonly ---------- */
class Greeter {
  readonly name: string = "world";

  constructor(names?: string) {
    names !== undefined ? (this.name = names) : "";
    // if (names !== undefined) {
    //     this.name = names
    // }
  }
    
    err() {
        // this.name = "not ok"
        console.log("first")
    }
}
let g = new Greeter();

/* ----------- Constructors ---------- */
/* Class constructors are very similar to functions. You can add 
parameters with type annotations, default values, and overloads: 

There are just a few differences between class constructor signatures 
and function signatures:
1. Constructors can’t have type parameters, EXAMPLE: ❌ constructor<T>() 
INSTEAD make class itself generic ✅ class Box<T>
2. Constructors can’t have return type annotations */
class Point {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Points {
  x: number = 0;
  y: number = 0;

  // Constructor overloads
  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {}
  // Code logic here
}

/* ----------- Super Calls ---------- */
/* Just as in JavaScript, if you have a base class, you’ll need to 
call super(); in your constructor body before using any this. members: */
class Base {
    k = 4;
}

class Derived extends Base {
    constructor() {
        super();
        console.log(this.k);
    }
}

/* ----------- Methods ---------- */
/* Background Reading:
Method definitions

A function property on a class is called a method. Methods can use 
all the same type annotations as functions and constructors: */
class PointClass {
    x = 10;
    y = 10;
    
    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}

/* Note that inside a method body, it is still mandatory to access 
fields and other methods via `this.`. An unqualified name in a method 
body will always refer to something in the enclosing scope:  */
let x = 10;
class C {
    x: string = "hello";

    m() {
      // This is trying to modify 'x' from line 1, not the class property
    //   x = "world";
    }
}

/* ----------- Getters / Setters ---------- */
// Classes can also have accessors:
/* TypeScript has some special inference rules for accessors:
1. If get exists but no set, the property is automatically readonly
2. If the type of the setter parameter is not specified, it is 
inferred from the return type of the getter */
class accessorsClass {
    _length = 0;

    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}

// Since TypeScript 4.3, it is possible to have accessors with different 
// types for getting and setting.
class Thing {
    _size = 0;

    get size() {
        return this.size;
    }

    set size(value: string | number | boolean) {
      let num = Number(value);

      // Don't allow NaN, Infinity, etc
        if (!Number.isFinite(num)) {
          this._size = 0;
          return;
        }
        
        this._size = num;
    }
}

/* ----------- Index Signatures ---------- */
class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
        return this[s] as boolean;
    }
}

/* ----------- Class Heritage ---------- */
// Like other languages with object-oriented features, classes 
// in JavaScript can inherit from base classes.

// implements Clauses
/* You can use an implements clause to check that a class 
satisfies a particular interface. An error will be issued 
if a class fails to correctly implement it: 
Classes may also implement multiple interfaces, e.g. class C implements A, B {. */
interface Pingable {
  ping(): void;
}
class Sonar implements Pingable {
    ping() {
        console.log("void");
    }
}
// Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
// class Ball implements Pingable {
//   poultry() {
//     console.log("pong!");
//   }
// }

/* ----------- Overriding Methods ---------- */
/* A derived class can also override a base class field or property. 
You can use the `super.` syntax to access base class methods */
class BaseClass {
    namestr = "tyu";
    greet() {
        console.log("Hello World");
    }
}
class DerivedClass extends BaseClass {
    greet(name?: string) {
        if (name === undefined) {
            super.greet();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}
const d = new DerivedClass();
d.greet();
d.greet("reader");

/* ----------- Type-only Field Declarations ---------- */
/* When you extend a class and redeclare a field, TypeScript 
might generate JavaScript that overwrites the parent’s value. 
In modern JavaScript: Class fields are initialized AFTER super() runs
So if you redeclare a field in the child class, it can reset/overwrite 
what the parent already set.
NOTE::Without `declare`, You lost the value set by the parent.
✅ Solution: declare:: 🧠 What declare means:
👉 “This is only for type checking”
👉 “Do NOT generate any JavaScript for this”
So:
1. TypeScript knows resident is now Dog
2. But at runtime, nothing extra happens */
interface Animal {
    dateOfBirth: any;
}
interface Dog extends Animal {
    breed: any;
}
class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
        this.resident = animal;
    }
}
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
    declare resident: Dog;
    constructor(dog: Dog) {
        super(dog);
    }
}

/* ----------- Member Visibility ---------- */
// public
// The default visibility of class members is public. A public member can be accessed anywhere:
class Greeters {
  public greet() {
    console.log("hi!");
  }
}
const gs = new Greeters();
gs.greet();

// protected
// protected members are only visible to subclasses of the class they’re declared in.
class GreeterP {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends GreeterP {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const gP = new SpecialGreeter();
gP.greet(); // OK
gP.howdy(); // OK
// gP.getName(); //<-- Error

// private
// private is like protected, but doesn’t allow access to the member even from subclasses:
class BaseKlass {
  private x = 0;
}
const bK = new BaseKlass();
// Can't access from outside the class
// Property 'x' is private and only accessible within class 'Base'.
// console.log(bK.x);

// Cross-instance private access
// TypeScript does allow cross-instance private access:
class A {
    private x = 10;

    public sameAs(other: A) {
      // No error
      return other.x === this.x;
    }
}

class MySafe {
  private secretKey = 12345;
}
// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s["secretKey"]);

/* ----------- Static Members ---------- */
/* Background Reading:
Static Members (MDN)

Classes may have static members. These members aren’t associated 
with a particular instance of the class. They can be accessed 
through the class constructor object itself: 
Static members can also use the same public, protected, and private visibility modifiers:*/
class MyStaticClass {
    static x = 340;
    static printX() {
        console.log(MyStaticClass.x)
    }
}
console.log(MyStaticClass.x);
MyStaticClass.printX();

// Static members are also inherited:
class StaticBase {
    namestr= 0
    static getGreeting() {
        return "Hello World";
    }
}
class DerivedStaticBase extends StaticBase {
    myGreeting = DerivedStaticBase.getGreeting();
}

/* ----------- Special Static Names ---------- */
/* In JavaScript/TypeScript, classes are actually functions
So this: In TS `class S {}` is like `function S() {}`.
Functions already have built-in properties like: name, length, call
❌ So this is NOT allowed: 👉 Because::name already exists on functions,
You’re trying to overwrite it */
// class S {
//     static name = "S!"
// }


/* ----------- Why No Static Classes? ---------- */
/* 🧠 Core meaning
👉 TypeScript does NOT need “static classes”
👉 Because you can already write code without putting everything inside a class
🔍 Why other languages have static classes
Languages like C#:
Force everything (all data and functions) to be inside a class
So they created “static class” for utility functions */
// Unnecessary "static" class
class MyStaticClassS {
  static doSomething() {}
}
 
// Preferred (alternative 1)
function doSomething() {}
 
// Preferred (alternative 2)
const MyHelperObject = {
  dosomething() {},
};

/* ----------- static Blocks in Classes ---------- */
/* 🧠 What is a static block?
👉 A static { } block is code that runs once automatically when the 
class is created (loaded), not when an object is created.
🚀 Simple analogy
Constructor → runs when object is created 🧱
Static block → runs when class is loaded ⚙️  */
// class Foo {
//   static #count = 0;

//   get count() {
//     return Foo.#count;
//   }

//   static {
//     try {
//       const lastInstances = loadLastInstances();
//       Foo.#count += lastInstances.length;
//     } catch {}
//   }
// }

/* ----------- Generic Classes ---------- */
/* Classes, much like interfaces, can be generic. When a generic 
class is instantiated with new, its type parameters are inferred 
the same way as in a function call: */
class Box<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
const genericBox = new Box("hello!");

/* ----------- Type Parameters in Static Members ---------- */
// This code isn’t legal, and it may not be obvious why:
class Boxe<Type> {
  // Static members cannot reference class type parameters.
//   static defaultValue: Type;
}

/* ----------- `this` at Runtime in Classes ---------- */
/* Background Reading: this keyword (MDN) It’s important to remember 
that TypeScript doesn’t change the runtime behavior of JavaScript, 
NOTE::JavaScript’s handling of this is indeed unusual:
Long story short, by default, the value of this inside a function 
depends on how the function was called. In this example, 
because the function was called through the obj reference, 
its value of this was obj rather than the class instance.*/
class MyClasses {
  name = "MyClass......";
  getName() {
    return this.name;
  }
}
const cN = new MyClasses();
const objN = {
  name: "obj",
  getName: cN.getName,
};
// 👉 NOTE THE DIFFERENCE `getName: cN.getName(),` NOT `getName: cN.getName`
const objS = {
  name: "obj",
  getName: cN.getName(),
};
// Prints "obj", not "MyClass"
console.log(objN.getName());
// NOTE::Prints "MyClass", not "obj"
console.log(objS.getName);

/* ----------- Arrow Functions ---------- */
/* If you have a function that will often be called in a way that 
loses its this context, it can make sense to use an arrow function 
property instead of a method definition: 

This has some trade-offs: 
👉 The `this` value is guaranteed to be correct at runtime, 
❌ This will use more 👉memory, because each class instance 
will have its own copy of each function defined this way
❌ You can’t use super.getName in a derived class, because 
there’s no entry in the prototype chain to fetch the base class method from
*/
class MyClassModified {
  name = "MyClassModified";
  getName = () => {
    return this.name;
  };
}
const cM = new MyClassModified();
const gM = cM.getName;
// Prints "MyClass" instead of crashing
console.log(gM());

/* ----------- `this` parameters ---------- */
/* In a method or function definition, an initial parameter named this has 
special meaning in TypeScript. These parameters are erased during compilation: */
// TypeScript input with 'this' parameter
function fn(this: string, x: number) {
  /* ... */
}
// JavaScript output
`function fn(x) {
  /* ... */
}`

/* ----------- `this` Types ---------- */
/* In classes, a special type called this refers dynamically to 
the type of the current class. Let’s see how this is useful: */