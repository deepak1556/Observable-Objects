(function(globals){
    var Pubsub = require("./pubsub.js"),
    contains = Array.prototype.indexOf ? function(arr , el){
	return !!~arr.indexOf(el);
    } : function(arr,el){
	for(var i=0; i<arr.length; i++){
	    if(arr[i] === el){
		return true;
	    }
	}
	    return false;
    };

    function parse(args) {
	var config = args[0];
	if (typeof config === 'function') {
            config = {compute: args[0]};
            if (args.length > 1) {
		if (typeof args[1] === 'function') {
                    config.write = args[1];
                    if (args.length > 2) {
			config.watch = args[2];
                    }
		} else {
                    config.watch = args[1];
		}
            }
	}
	return config;
    }

    function extend(){
	var args = Array.prototype.slice.call(arguements);
	var obj = args.shift();

	for (var i = 0, c = args.length; i < c; i++) {
	    var prop = args[i];
	    for (var name in prop) {
		if (typeof prop[name] === 'object' && typeof obj[name] !== 'undefined') {
		    aug(obj[name], prop[name]);
		} else if (typeof obj[name] !== 'undefined') {
		    obj[name] = prop[name];
		}
	    }
	}

	return obj;
    }

    function obj(args){
	var self = this;
	function observe(value){
	    if(arguments.length){
		if(typeof observe.write === "function"){
		    observe.write.call(self,value);
		}else{
		    throw new Error('cannot write');
		}
	    }
	    else{
		if(typeof observe.read === "function"){
		    observe.read.call(self);
		}else{
		    throw new Error('cannot read');
		}
	    }
	}

	var config = {
	    read : args.read,
	    write : args.write,
	    currvalue : args.value,
	    prevvalue : undefined,
	    _subscriptions : [],
	};

	extend(observe,config,obj.fns);

	return observe;
    }

    obj.fns = {
	__is_obs__: true,
	notify: function() {
            this.dirty = (this._currentValue === this._initialValue);
            this.publish(this._currentValue, this._previousValue);
	},
	getValue: function() {
            return this._currvalue;
	},
	watch: function() {
            var args = slice.call(arguments, 0), sub, i;
            for (i = 0; i < args.length; i++) {
		sub = args[i];
		if (contains(this._subscriptions, sub)) {
                    continue;
		}
		if (sub && typeof sub.subscribe === 'function') {
		    if(!contains(this._subscriptions,sub)){
			this._subscriptions.push(sub);
		    }
		}
            }
            return this;
	},
	unwatch: function() {
            var subs = slice.call(arguments, 0),
            allSubs = this._subscriptions,
            i, sub;

            for (i = 0; i < subs.length; i++) {
		sub = subs[i];
		if (sub && typeof sub.unsubscribe === 'function') {
                    sub.unsubscribe(this.onSet);
		}
            }

            return this;
	}
    };

    obj.prop = function(value){
	return obj({
	    read : function(){
		return this.currvalue;
	    },
	    write : function(val){
		this.prevvalue = this.currvalue;
		this.currvalue = val;
		this.notify();
	    },
	    value : value
	});
    }

/*
--------------------------------------------------------------------

COMPUTED PROPERTY TO BE DONE

--------------------------------------------------------------------
*/

    function exportFunctions () {
	if (typeof define === 'function' && define.amd) {
            define(function () {
		return functions;
            });
	} else if (typeof module === 'object' && module !== null) {
            module.exports = functions;
	} else {
            globals.objsub = functions;
	}
    }
}(this);