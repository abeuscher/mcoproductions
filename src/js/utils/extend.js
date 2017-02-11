function extend(Super, Subfunc) {
    var ChildClass = function() {
        Super.apply(this, arguments);
        Subfunc.apply(this, arguments);
    };

    ChildClass.prototype = Object.create(Super.prototype, {
        constructor: {value: ChildClass, configurable:true}
    });

    return ChildClass;
}

module.exports = extend;
