var Visitor = {}
Visitor.push  = function() {
    return Array.prototype.push.apply(this, arguments);
};

var obj = {};
obj.push = Visitor .push;
obj.push("first");
console.log(obj);
console.log(obj[0])  //"first"
console.log(obj.length);  //1