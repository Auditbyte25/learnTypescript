let items = [1, 2, 3];

items.forEach((item, index, array) => {
    console.log(`Index${index} -- Value = ${item} -- Array = ${array}`)
});

// Should be OK!
items.forEach((item) => console.log(item));