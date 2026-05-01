/* Decorators
A Decorator is a special kind of declaration that can be attached 
to a class declaration, method, accessor, property, or parameter. 
Decorators use the form @expression, where expression must evaluate 
to a function that will be called at runtime with information about 
the decorated declaration. */
function sealed(target) {
  // do something with 'target' ...
}

// Decorator Factories
/* A Decorator Factory is simply a function that returns the expression 
that will be called by the decorator at runtime. */
function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

/* ----------------- Class Decorators ---------------- */
/* A Class Decorator is declared just before a class declaration. 
The class decorator is applied to the constructor of the class and 
can be used to observe, modify, or replace a class definition. */
@sealedx
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// Declaring @sealed decorator
/* When TypeScript compiles this, the decorator runs right after the class is created.
When `@sealed` is executed, it will seal both the constructor and its 
prototype, and will therefore prevent any further functionality from being 
added to or removed from this class during runtime by accessing 
BugReport.prototype or by defining properties on BugReport itself */
function sealedx(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

/* Next we have an example of how to override the constructor to set 
new defaults. */
function reportableClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www...";
    };
}

@reportableClassDecorator
class BugReportNew {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

/* Note that the decorator _does not_ change the TypeScript type
and so the new property `reportingURL` is not known
to the type system: */

// bug.reportingURL;

// TO FIX ABOVE ERROR REPORTING BY TS:
const bugX = new BugReport("Needs dark mode") as BugReport & {
    reportingURL: string;
}
bugX.reportingURL;

/* ----------------- Method Decorators ---------------- */
/*
| Property flag  | Controls                    |
| -------------- | --------------------------- |
| `enumerable`   | Shows up in loops / JSON    |
| `configurable` | Can be redefined or deleted |
| `writable`     | Can value be changed        |
 */

// A Method Decorator is declared just before a method declaration. 
class GreeterD {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    }
}

/* ----------------- Accessor Decorators ---------------- */
// An Accessor Decorator is declared just before an accessor declaration. 
class PointD {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    }
}

const p = new PointD(10, 20);
console.log(p.x); // 10

/* ----------------- Property Decorators ---------------- */
// A Property Decorator is declared just before a property declaration.
