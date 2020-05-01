"use strict";

function LocStorage(keyLocalStorage) {
    let self = this;
    let keyLS=keyLocalStorage;
    self.storage = JSON.parse(localStorage.getItem(keyLS));
    // console.log(self.storage);
    if (self.storage === null) {
        self.storage = {};
    }
    ;
    self.addValue = function (key, value) {
        self.storage[key] = value;
        localStorage.setItem(keyLS, JSON.stringify(self.storage));
        return self;
    };
    self.getValue = function (key) {
        return (key in self.storage) ? self.storage[key] : undefined;
    };
    self.deleteValue = function (key) {
        if (key in self.storage) {
            delete self.storage[key];
            localStorage.setItem(keyLS, JSON.stringify(self.storage));
            return true;
        }
        return false;
    };
    self.getKeys = function () {
        return Object.keys(self.storage);
    };
};