/* ------------------ Template Literal Types --------------- */
/* Template literal types build on string literal types, 
and have the ability to expand into many strings via unions. */
type World = "world";
type Greeting = `hello ${World}`;

/* When a union is used in the interpolated position, 
the type is the set of every possible string literal that 
could be represented by each union member: */
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// For each interpolated position in the template literal, the unions are cross multiplied:
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

/* ------------------ String Unions in Types --------------- */
/* The power in template literals comes when defining a new string 
based on information inside a type. 
We can imagine the base object as looking like: */
const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

/* The on function that will be added to the base object expects 
two arguments, an eventName (a string) and a callback (a function)
The eventName should be of the form attributeInThePassedObject + "Changed"; 
thus, firstNameChanged as derived from the attribute firstName in the base object.  */

type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
}

/// Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

// With this, we can build something that errors when given the wrong property:
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", () => { });
// Prevent easy human error (using the key instead of the event name)
// person.on("firstName", () => { });

/* ------------------ Inference with Template Literals --------------- */
type PropEventSources<Type> = {
    on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
}

declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;

const personType = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
  
person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})

/* Here we made on into a generic method.
When a user calls with the string "firstNameChanged", TypeScript 
will try to infer the right type for Key. To do that, it will match 
Key against the content before "Changed" and infer the string "firstName".
Once TypeScript figures that out, the on method can fetch the type of 
firstName on the original object, which is string in this case. 
Similarly, when called with "ageChanged", TypeScript finds the 
type for the property age which is number.  */

/* ------------------ Intrinsic String Manipulation Types --------------- */
/* Uppercase<StringType>
Converts each character in the string to the uppercase version. */
// Example
type Greetings = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>;
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;

// Lowercase<StringType>;
// Converts each character in the string to the lowercase equivalent.
// Example
type GreetingLower = "Hello, world"
type QuietGreetingLower = Lowercase<Greeting>   
type QuietGreeting = "hello, world"
type ASCIICacheKeys<Str extends string> = `id-${Lowercase<Str>}`
type MainIDs = ASCIICacheKey<"MY_APP">

// Capitalize<StringType>
// Converts the first character in the string to an uppercase equivalent.
// Example
type LowercaseGreeting = "hello, world";
type GreetingCapitalize = Capitalize<LowercaseGreeting>;

// Uncapitalize<StringType>
// Converts the first character in the string to a lowercase equivalent.
// Example;
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;

