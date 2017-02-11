var each = require("lodash/foreach");
var filter = require("lodash/filter");
var isArrayLike = require("lodash/isarraylike");
var isPlainObject = require("lodash/isplainobject");
var cloneDeep = require("lodash/clonedeep");
var assign = require("lodash/assign");

function listToTree(arrayOfObjs, treeNodes, opts) {

    function findKey(input, matchKey) {
        if (typeof input == "string") {
            return input;
        } else if (matchKey && typeof input == "object" && typeof input[matchKey] == "string") {
            return input[matchKey];
        } else {
            return null;
        }
    }

    if (typeof treeNodes == "string") {
        if (arrayOfObjs.length == 1) {
            if (arrayOfObjs[0][treeNodes]) {
                return arrayOfObjs[0][treeNodes];
            }
        } else {
            var result = [];
            each(arrayOfObjs, function(obj){
                if (obj[treeNodes]) {
                    result.push(obj[treeNodes]);
                }
            });
            return result;
        }
    } else if (isArrayLike(treeNodes)) {
        var result = [];
        each(treeNodes, function(node){
            result.push(listToTree(arrayOfObjs, node, opts));
        });
        return result;
    } else if (typeof treeNodes == "object") {
        var tree = {};
        for (var nodeName in treeNodes) {
            each(arrayOfObjs, function(currentObj, i){
                var currentKey = findKey(currentObj[nodeName], opts.propName);
                if (currentKey) {
                    var objsMatchingProp = filter(arrayOfObjs, function(obj){
                        var keyToMatch = findKey(obj[nodeName], opts.propName);
                        return keyToMatch == currentKey;
                    });
                    if (objsMatchingProp.length) {
                        var currentTree = tree;
                        if (opts.branchPropName) {
                            if (!currentTree[opts.branchPropName]) {
                                currentTree[opts.branchPropName] = {};
                            }
                            currentTree = currentTree[opts.branchPropName];
                        }
                        if (!currentTree[nodeName]) {
                            currentTree[nodeName] = {};
                        }
                        var newBranch = listToTree(objsMatchingProp, treeNodes[nodeName], opts);
                        if (isPlainObject(currentObj[nodeName]) && isPlainObject(newBranch)) {
                            currentTree[nodeName][currentKey] = assign(cloneDeep(currentObj[nodeName]), newBranch);
                        } else {
                            currentTree[nodeName][currentKey] = newBranch;
                        }
                    }
                }
            });
        }
        return tree;
    } else if (treeNodes) {
        if (arrayOfObjs.length == 1) {
            arrayOfObjs = arrayOfObjs[0];
        }
        return arrayOfObjs;
    }
}

module.exports = listToTree;
