var utils = {
    removeHash: require("./remove-hash.js"),
    setHash: require("./set-hash.js"),
    extend: require("./extend.js"),
    parseHTML: require("./parse-html.js"),
    findReplace: require("./find-replace.js")
};


utils.supportsTransitions  = (function() {
    var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
        v = ['ms','O','Moz','Webkit']; // 'v' for vendor

    if( s['transition'] == '' ) return true; // check first for prefeixed-free support
    while( v.length ) // now go over the list of vendor prefixes and check support until one is found
        if( v.pop() + 'Transition' in s )
            return true;
    return false;
})();

utils.isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
utils.isIE = detectIE();
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

utils.dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
};

utils.normalize = function(dataObj, normObj, opts, recursive) {
    if (!utils.exists(recursive)) {
        recursive = true;
    }
    if (typeof opts == "string") {
        //if only denormalized prop is needed, a string may be supplied instead.
        var denormPropName = opts;
        opts = {denormPropName: denormPropName};
    } else if (!utils.exists(opts)) {
        console.warn("third argument to normalize function is required with at least denormalizedPropName value.");
        return;
    }

    function checkDenormProp(currentString, denormPropName) {
        if (Array.isArray(denormPropName)) {
            return denormPropName.indexOf(currentString) > -1;
        } else {
            return propName == denormPropName;
        }
    }
    for (var propName in dataObj) {
        if (propName == "title" && !opts.normPropName) {
            // debugger;
        }
        if (typeof dataObj[propName] == "string") {
            if (checkDenormProp(propName, opts.denormPropName)) {
                var normObjTemp = normObj;
                if (opts.normDrilldownProp && dataObj[opts.normDrilldownProp] && normObjTemp[dataObj[opts.normDrilldownProp]]) {
                    normObjTemp = normObjTemp[dataObj[opts.normDrilldownProp]];
                }
                if (normObjTemp.hasOwnProperty(dataObj[propName])) {
                    dataObj[opts.normPropName || propName] = normObjTemp[dataObj[propName]];
                } else if (opts.fallbackProp && normObj.hasOwnProperty(opts.fallbackProp)) {
                    dataObj[opts.normPropName || propName] = normObjTemp[opts.fallbackProp];
                    //console.warn("normalization failed - defaulting to fallback '" + opts.fallbackProp + "' for '" + dataObj[propName] + "'.");
                } else {
                    //console.warn("normalization failed - normalization object does not have a node for '" + dataObj[propName] + "'");
                }
            }
        } else if (recursive && dataObj.propertyIsEnumerable(propName)){
            utils.normalize(dataObj[propName], normObj, opts, recursive);
        }
    }
};

utils.arrayToObj = function(arr, keys) {
    var obj = {};
    utils.forEach(arr, function(item, i){
        if (utils.exists(keys)) {
            if (typeof keys == "string" &&
                typeof item == "object" &&
                utils.exists(item[keys])) {
                //when keys is a string, we assume each item is an object and that our key is stored in a property there
                i = item[keys];
            } else if (utils.isArrayLike(keys)) {
                //keys is an array-like, so we use respective indices as keys
                i = keys[i];
            }
        }

        obj[i] = item;
    });
    return obj;
};

utils.objToArray = function(obj) {
    var arr = [];
    var keys = Object.keys(obj);

    utils.forEach(keys, function(key){
        arr.push(obj[key]);
    });

    return arr;
};

utils.convertSeparators = function(inputString, type) {
    var currentSeparator = inputString.indexOf("-") > -1 ? "-" : inputString.indexOf("_") > -1 ? "_" : "camel";
    if (currentSeparator == type) {
        return inputString;
    }
    switch (currentSeparator) {
        case "-":
        case "_":
            switch(type) {
                case "-":
                case "_":
                    return inputString.replace(currentSeparator, type);
                    break;
                default: //camel-case
                    var parts = inputString.split(currentSeparator);
                    var finalString = "";
                    utils.forEach(parts, function(part, i){
                        part = part.toLowerCase();
                        if (i == 0) {
                            finalString += part;
                        } else {
                            finalString += part.charAt(0).toUpperCase() + part.slice(1);
                        }
                    });
                    return finalString;
                    break;
            }
            break;
        default: //camel-case
            var parts = inputString.split(/(?=[A-Z])/);
            var finalString = "";
            utils.forEach(parts, function(part, i){
                part = part.toLowerCase();
                if (i == 0) {
                    finalString += part;
                } else {
                    finalString += type + part;
                }
            });
            return finalString;
            break;
    }
};

utils.HTMLMixin = function(HTMLString, dataObj, embeds, convertSeparators){
    if (!utils.exists(convertSeparators)) {
        convertSeparators = true;
    }
    var mixinEmbed = HTMLString.match(/{>(.*?)}/);
    while(mixinEmbed) {
        var embedHTML = embeds[mixinEmbed[1]];
        if (!embedHTML) {
            embedHTML = "";
        }
        HTMLString = utils.findReplace(HTMLString, mixinEmbed[0], utils.HTMLMixin(embedHTML, dataObj, embeds, convertSeparators));

        mixinEmbed = HTMLString.match(/{>(.*?)}/);
    }

    var mixinVar = HTMLString.match(/{(.*?)}/);

    while (mixinVar) {
        var drillSteps = mixinVar[1].split(".");
        if (convertSeparators) {
            utils.forEach(drillSteps, function(drillStep, i){
                drillSteps[i] = utils.convertSeparators(drillStep, "camel");
            });
        }
        if (utils.exists(dataObj[mixinVar[1]])) {
            HTMLString = utils.findReplace(HTMLString, mixinVar[0], dataObj[mixinVar[1]]);
        } else {
            var result = utils.drillDown(dataObj, drillSteps);
            if (result != dataObj) {
                HTMLString = utils.findReplace(HTMLString, mixinVar[0], result);
            } else {
                HTMLString = utils.findReplace(HTMLString, mixinVar[0], null);
            }
        }
        mixinVar = HTMLString.match(/{(.*?)}/);
    }
    return HTMLString;
};

utils.parseHTMLMixin = function(HTMLString, dataObj, embeds) {
    return utils.parseHTML(utils.HTMLMixin(HTMLString, dataObj, embeds));
};

utils.boolToBinary = function(arg) {
    if (typeof arg == "boolean") {
        return arg ? 1 : 0;
    }
    return arg;
};

utils.indexIn = function(val, objOrArray) {
    if (utils.isArrayLike(objOrArray)) {
        for (var i = 0, len = objOrArray.length; i < len; ++i) {
            if (objOrArray[i] == val) {
                return i;
            }
        }
    } else if (utils.isObjLiteral(objOrArray[i])) {
        for (var key in objOrArray) {
            if (objOrArray[key] == val) {
                return key;
            }
        }
    }
    return -1;
};

utils.isArrayLike = function(o) {
    if (o &&                         // o is not null, undefined, etc.
        typeof o === "object" &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967296)              // o.length < 2^32
        return true;                        // Then o is array-like
    else
        return false;                       // Otherwise it is not
};

utils.getFunctionName = function(fun) {
    var arr = /^function\s+([\w\$]+)\s*\(/.exec(fun.toString());
    return arr ? arr[1] : null;
};

utils.removeClass = function(el, matchClass) {
    utils.manipulateClass(el, matchClass, "remove");
};

utils.addClass = function(el, newClass) {
    utils.manipulateClass(el, newClass, "add");
};

utils.toggleClass = function(el, newClass) {
    utils.manipulateClass(el, newClass, "toggle");
};

utils.manipulateClass = function(el, classInput, addOrRemove) {
    var classes = el.className.split(" ");
    var funcs = {
        remove : function(className) {
            if (classes.indexOf(className) > -1) {
                classes.splice(classes.indexOf(className), 1);
            }
        },
        add : function(className) {
            if (classes.indexOf(className) == -1) {
                classes.push(className);
            }
        },
        toggle: function(className) {
            if (classes.indexOf(className) == -1) {
                classes.push(className);
            } else {
                classes.splice(classes.indexOf(className), 1);
            }
        }
    };
    if (typeof classInput === "string") {
        funcs[addOrRemove](classInput);
    } else if (utils.isArrayLike(classInput)) {
        for (var i = 0, len = classInput.length; i < len; ++i) {
            funcs[addOrRemove](classInput[i]);
        }
    }
    el.className = classes.join(" ");
};

utils.toggleClass = function(el, matchClass) {
    var classes = el.className.split(" ");
    if (classes.indexOf(matchClass) == -1) {
        classes.push(matchClass);
        var result = true;
    } else {
        classes.splice(classes.indexOf(matchClass));
        var result = false;
    }
    el.className = classes.join(" ");
    //returns true if class was added, false if it was removed.
    return result;
};

utils.isElement = function(obj) {
    return obj instanceof HTMLElement;
};

utils.removeDOM = function(el) {
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
};

utils.getYoutubeThumb = function(ytID, size){
    var url = "//img.youtube.com/vi/" + ytID;
    switch (size) {
        case "small":
            url += "/default.jpg";
            break;
        case "mq":
            url += "/mqdefault.jpg";
            break;
        case "hq":
            url += "/hqdefault.jpg";
            break;
        case "sd":
            url += "/sddefault.jpg";
            break;
        case "max":
        default:
            url += "/maxresdefault.jpg";
            break;
    }
    return url;
};

utils.exists = function(obj) {
    return typeof obj !== "undefined";
};

utils.isObjLiteral = function(_obj) {
  var _test  = _obj;
  return (  typeof _obj !== 'object' || _obj === null ?
              false :
              (
                (function () {
                  while (!false) {
                    if (  Object.getPrototypeOf( _test = Object.getPrototypeOf(_test)  ) === null) {
                      break;
                    }
                  }
                  return Object.getPrototypeOf(_obj) === _test;
                })()
              )
          );
};

utils.clamp = function(val, min, max) {
  return Math.min(Math.max(val, min), max);
};

utils.buildURL = function(baseString, params) {
    var paramString = baseString;
    var queryChar;
    for (var paramName in params) {
        queryChar = paramString == baseString ? "?" : "&";
        paramString += queryChar + paramName + "=" + encodeURIComponent(params[paramName]);
    }
    return paramString;
};

utils.buildYoutubeEmbed = function(id, opts, hookString) {
    var defaults = {
        rel : false,
        autoplay : false,
        modestbranding : true,
        aspectRatio : "16-9",
        classes : "",
        enablejsapi: true,
    };

    var opts = opts ? opts : {};
    for (var prop in defaults) {
        opts[prop] = this.exists(opts[prop]) ? this.boolToBinary(opts[prop]) : this.boolToBinary(defaults[prop]);
    }
    var iframe = document.createElement("iframe");
    utils.parseHooks(iframe, hookString);
    iframe.src = "https://www.youtube.com/embed/" + id;
    var first;
    for (var name in opts) {
        first = first ? "&" : "?";
        if (utils.isBinary(opts[name])) {
            iframe.src += first + name + "=" + opts[name];
        }
    }
    iframe.setAttribute("allowfullscreen", true);
    iframe.setAttribute("frameborder", "0");
    return iframe;
};

utils.isBinary = function(val){
    return val === 1 || val === 0;
};

utils.skipTransition = function(el, changes) {
    utils.prefixedCSS(el, "transition", "none");
    changes.call(el);
    window.getComputedStyle(el).display;
    utils.prefixedCSS(el, "transition", "");
};
utils.onTransitionEnd = function(el, prop, func) {
    if (utils.supportsTransitions) {
        el.addEventListener("transitionend", function onTransitionEnd(e){
            if (e.target == el && (prop == e.propertyName || (Array.isArray(prop) && prop.indexOf(e.propertyName) > -1))) {
                func.call(el);
                el.removeEventListener("transitionend", onTransitionEnd);
            }
        });
    } else {
        func.call(el);
    }
};

utils.prefixedCSS = function(el, property, value) {
    var vendors = ["webkit", "moz", "o", "ms"];
    el.style[property] = value;
    utils.forEach(vendors, function(prefix){
        el.style[prefix + utils.capitalizeFirstLetter(property)] = value;
    });
};

utils.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

utils.cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

utils.patchObj = function(patcheeObj, patcherObj, recursive, skipClone) {
    if (!skipClone) {
        var newObj = utils.cloneObj(patcheeObj);
    } else {
        var newObj = patcheeObj;
    }
    recursive = utils.exists(recursive) ? recursive : true;
    for (var prop in patcherObj) {
        if (utils.exists(patcheeObj[prop])) {
            if (recursive && utils.isObjLiteral(patcheeObj[prop]) && utils.isObjLiteral(patcherObj[prop])) {
                newObj[prop] = utils.patchObj(newObj[prop], patcherObj[prop], recursive, true);
            } else {
                newObj[prop] = patcheeObj[prop]
            }
        } else {
            newObj[prop] = patcherObj[prop];
        }
    }
    return newObj;
};

utils.extends = function(base, sub) {
    // Avoid instantiating the base class just to setup inheritance
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    // for a polyfill
    // Also, do a recursive merge of two prototypes, so we don't overwrite
    // the existing prototype, but still maintain the inheritance chain
    // Thanks to @ccnokes
    var origProto = sub.prototype;
    sub.prototype = Object.create(base.prototype);
    for (var key in origProto)  {
        sub.prototype[key] = origProto[key];
    }
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
    // In ECMAScript5+ (all modern browsers), you can make the constructor property
    // non-enumerable if you define it like this instead
    Object.defineProperty(sub.prototype, 'constructor', {
        enumerable: false,
        value: sub
    });
};


utils.createEl = function(tagName, hooks, nestedNode) {
    var el = document.createElement(tagName);
    if (hooks) {
        utils.parseHooks(el, hooks);
    }
    if (nestedNode) {
        if (Array.isArray(nestedNode)) {
            utils.forEach(nestedNode, function(node){
                if (node) {
                    el.appendChild(node);
                }
            });
        } else {
            el.appendChild(nestedNode);
        }
    }
    return el;
};

utils.processHooks = function(hooks, obj){
    if (!obj) {
        obj = {};
    }
    if (Array.isArray(hooks)) {
        hooks = utils.flattenArrayOfArrays(hooks);
        utils.forEach(hooks, function(hook) {
            obj = utils.processHooks(hook, obj);
        });
    } else if (typeof hooks == "string") {
        var splitHook = hooks.split(" ");
        if (splitHook.length > 1) {
            obj = utils.processHooks(splitHook, obj);
        } else {
            splitHook = splitHook[0].trim();
            switch (splitHook.charAt(0)) {
                case "#":
                    obj.id = splitHook.substring(1);
                    break;
                case ".":
                    var className = splitHook.substring(1);
                    break;
                default:
                    var className = splitHook;
                    break;
            }
            if (className) {
                if (obj.classes) {
                    obj.classes.push(className);
                } else {
                    obj.classes = [className];
                }
            }
        }
    } else {//assuming object - this is how we set attributes
        if (!obj.attributes) {
            obj.attributes = hooks;
        } else {
            for (var attrName in hooks) {
                obj.attributes[attrName] = hooks[attrName];
            }
        }
    }
    return obj;
};

utils.parseHooks = function(el, hooks){
    if (!(utils.isObjLiteral(hooks) && hooks.id || hooks.classes || hooks.attributes)) {
        hooks = utils.processHooks(hooks);
    }
    for (var key in hooks) {
        switch (key) {
            case "id":
                el.id = hooks[key];
                break;
            case "attributes":
                for (var attrName in hooks[key]) {
                    el.setAttribute(attrName, hooks[key][attrName]);
                }
                break;
            default: //assuming class
                utils.addClass(el, hooks[key]);
                break;
        }
    }
};

utils.flattenArrayOfArrays = function(a, r){
    if(!r){ r = []}
    for(var i=0; i<a.length; i++){
        if(a[i].constructor == Array){
            utils.flattenArrayOfArrays(a[i], r);
        }else{
            r.push(a[i]);
        }
    }
    return r;
};

utils.createText = function(text) {
    return document.createTextNode(text);
};

utils.loadStyles = function(url) {
    if(document.createStyleSheet) {
        document.createStyleSheet(url);
    } else {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.media = "all";
        css.href = url;
        document.getElementsByTagName("head")[0].appendChild(css);
    }
};

utils.exists = function(arg) {
    return typeof arg !== "undefined";
};

utils.drillDown = function(data, drillData) {
    if (typeof drillData == "string") {
        if (data[drillData]) {
            data = data[drillData];
        }
    } else if (utils.isArrayLike(drillData)) {
        for (var i = 0, len = drillData.length; i < len; i++) {
            data = utils.drillDown(data, drillData[i]);
        }
    } else if (utils.isObjLiteral(drillData)) {
        for (var drillKey in drillData) {
            var matches = utils.filter(data, function(item){
                return item[drillKey] == drillData[drillKey];
            }, false);
            if (matches.length) {
                data = matches[0];
            }
        }
    }
    return data;
};

utils.sign = function(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
};

utils.generateHash = function() {
    //limit of ~1mil unique IDs
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
};

utils.filter = function(arrOrObj, test, flattenResult) {
    if (!utils.exists(flattenResult)) {
        flattenResult = true;
    }
    if (arrOrObj) {
        var i, len, newArr = [];
        if (utils.isArrayLike(arrOrObj)) {
            for (i = 0, len = arrOrObj.length; i < len; ++i) {
                if (test(arrOrObj[i], i)) {
                    newArr.push(arrOrObj[i]);
                }
            }
        } else {
            //assuming object
            for (var propName in arrOrObj) {
                if (test(arrOrObj[propName], propName)) {
                    newArr.push(arrOrObj[propName]);
                }
            }
        }
        if (!newArr.length) {
            return;
        }
        return flattenResult ? (newArr.length == 1 ? newArr[0] : newArr) : newArr;
    }
};

utils.forEach = function(arr, func) {
    if (utils.isArrayLike(arr)) {
        var i, len;
        for (i = 0, len = arr.length; i < len; ++i) {
            func(arr[i], i);
        };
    } else if (typeof arr == "object") {
        for (var propName in arr) {
            func(arr[propName], propName);
        }
    } else {
        func(arr);
    }
};


utils.flattenByKey = function(obj, key, fallback) {
    var newObj = utils.cloneObj(obj);
    for (var propName in obj) {
        if (utils.isObjLiteral(obj[propName])) {
            var val = obj[propName][key] || obj[propName][fallback];
            if (utils.exists(val)) {
                newObj[propName] = val;
            } else {
                newObj[propName] = utils.flattenByKey(obj[propName], key, fallback);
            }
        }
    }
    return newObj;
};

utils.forEachElement = function(queryOrEls, func) {
    if (typeof queryOrEls == "string") {
        utils.forEachElement(document.querySelectorAll(queryOrEls), func);
    } else if (utils.isArrayLike(queryOrEls)) {
        utils.forEach(queryOrEls, func);
    } else if (utils.isElement(queryOrEls)) {
        func(queryOrEls, 0);
    }
};

utils.pluck = function(arr, property) {
  var newArr = [];
  utils.forEach(arr, function(item){
    if (item[property]) {
      newArr.push(item[property]);
    }
  });
  return newArr;
};

utils.pluckObj = function(obj, property) {
    var arr = [];
    for (var propName in obj) {
        arr.push(obj[propName][property]);
    }
    return arr;
};

utils.loadImage = function(path, callback) {
    var img = new Image();
    img.src = path;
    img.onload = callback;

    return img;
};

utils.matchBreakpoint = function(breakpoints, mobileFirst) {
    if (typeof mobileFirst == "undefined") mobileFirst = true;
    var finalMatch = null;
    var currentMatch = mobileFirst ? 0 : Infinity
    for (var bp in breakpoints) {
        if (mobileFirst) {
            if (window.innerWidth > Number(bp) && Number(bp) >= currentMatch) {
                finalMatch = bp;
                currentMatch = bp;
            }
        } else {
            if (window.innerWidth < Number(bp) && Number(bp) <= currentMatch) {
                finalMatch = bp;
                currentMatch = bp;
            }
        }
    }
    return finalMatch;
};

utils.inViewport = function(el, buffer) {
    var rect      = el.getBoundingClientRect();
    var winHeight = (window.innerHeight || document.documentElement.clientHeight);
    var winWidth  = (window.innerWidth || document.documentElement.clientWidth);

    return !(
        rect.bottom < (-buffer || 0)
        || rect.top > winHeight + (buffer || 0)
        || rect.left > winWidth + (buffer || 0)
        || rect.right < (-buffer || 0)
    );
};
utils.hasClass = function(el, str) {
    return el ? el.className.indexOf(str) > -1 : null;
};
utils.getMatchingClass = function(element, toMatch) {
    var classNames = element.className.split(" ");
    var i;
    var ii;
    var matches = [];
    for (i = 0, ii = classNames.length; i < ii; ++i) {
        var className = classNames[i];
        if (className.indexOf(toMatch) > -1) {
            matches.push(className);
        }
    }
    if (matches.length) {
        return matches.length == 1 ? matches[0] : matches;
    }
    return false;
};

utils.throttle = function(func, delay) {
    return (function(){
        var throttleTimer;

        var throttleFunc = function() {
            if (!throttleTimer) {
                func();

                throttleTimer = setTimeout(function(){
                    clearTimeout(throttleTimer);
                    throttleTimer = null;
                }, delay);
            }
        };

        return throttleFunc;
    })();
};

utils.replaceEl = function(replacee, replacer) {
    if (replacee) {
        replacee.parentNode.insertBefore(replacer, replacee);
        utils.removeDOM(replacee);
    }
};

utils.debounce = function(func, delay, startFunc) {
    return (function(){
        var debounceTimer;

        var debounceFunc = function() {
            if (!debounceTimer && startFunc) {
                startFunc();
            }
            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(function(){
                debounceTimer = null;
                func();
            }, delay);
        };

        return debounceFunc;
    })();
};

module.exports = utils;
