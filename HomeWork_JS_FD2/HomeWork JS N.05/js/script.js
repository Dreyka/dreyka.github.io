function treeSum(m) {
    let count = null;
    for (let i = 0; i < m.length; i++) {
        if (typeof m[i] === "object")
            count = count + treeSum(m[i]);
        else
            count = count + m[i];
    }
    ;
    return count;
};
let mass = [
    5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8
];
console.log(treeSum(mass));