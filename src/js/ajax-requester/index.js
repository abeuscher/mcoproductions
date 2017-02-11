var ut = require('../utils/index.js');
var EventEmitter = require('../event-dispatcher/index.js');

var ee = new EventEmitter()

var ajaxRequester = {};
var contentHeaders = {
    formData: "application/x-www-form-urlencoded",
    fileUpload: "multipart/form-data", //NOT FILES BEING POSTED DIRECTLY VIA AJAX, only FILE INPUT ELEMENTS IN MARKUP
    JSON: "application/json",
    file: null //we do NOT set a contenttype because otherwise the data won't post correctly
};

ajaxRequester.post = function(url, formData, contentType) {
    if (!contentType) {
        contentType = "formData";
    }
	if (Array.isArray(url)) {
		return new AggregateRequest(url, "POST", contentType, formData);
	}else {
		return new DataRequest(url, "POST", contentType, formData);
	}
};

ajaxRequester.postFile = function(url, key, fileOrBlob) {
    var formData = new FormData();

    if (typeof key == "string") {
        formData.append(key, fileOrBlob);
    } else {
        //no key specified, so we assume second arg to be an object with keys and values (blobs or files)
        fileOrBlob = key;

        for (var name in fileOrBlob) {
            formData.append(name, fileOrBlob[name]); //we could set a filename here but we're not going to for now
        }
    }

    return this.post(url, formData, "file");
};


ajaxRequester.get = function(url, formData, contentType) {
	if (Array.isArray(url)) {
		return new AggregateRequest(url, "GET", contentType, formData);
	}else {
		return new DataRequest(url, "GET", contentType, formData);
	}
};

ajaxRequester.getJSON = function(url) {
	return this.get(url, null, "JSON");
};

function AggregateRequest(urls, method, contentType, formData) {
	this.numRequests = urls.length;
	this.requestsLoaded = 0;
	this.requests = [];
	ee.extend(this);
	var self = this;

	ut.forEach(urls, function(url){
		var request = new DataRequest(url, method, contentType, formData);
		request.on("load", function(){
			self.requestsLoaded++;
			self.trigger("requestload", {index: self.requestsLoaded, request:request});
			if (self.requestsLoaded == self.numRequests) {
				self.trigger("load", ut.pluck(self.requests, "data"), true);
			}
		});
		self.requests.push(request);
	});
}

function DataRequest(url, method, contentType, formData) {
	method = method ? method : "GET";
	this.xhr = new XMLHttpRequest();
	this.contentType = contentType;
	this.addListeners();
	this.xhr.open(method, url);
    if (method != "GET" && contentHeaders[contentType]) {
        this.xhr.setRequestHeader("Content-type", contentHeaders[contentType]);
    }
	this.xhr.send(formData);
    ee.extend(this);
}

DataRequest.prototype.addListeners = function() {
	var self = this;
	var states = ["load", "error", "abort", "progress"];
	ut.forEach(states, function(state){
		self.xhr.addEventListener(state, function(e){
			self.data = self.processData(self.xhr.responseText);
			self.trigger(state, self.data);
		});
	});
};

DataRequest.prototype.processData = function(data) {
	if (this.xhr.readyState == 4) {
		if (this.xhr.status == 200) {
			switch (this.contentType) {
				case "JSON":
					try {
						data = JSON.parse(data);
					} catch (e) {
						console.error("Unable to parse data as valid JSON: ", e)
					}
					break;
				default:
					break;
			}
		} else {
			console.warn("Failed request to: " + this.xhr.responseURL);
		}
	}
	return data;
};

module.exports = ajaxRequester;
