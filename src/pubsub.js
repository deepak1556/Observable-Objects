(function (globals) {
    'use strict';

    var eventBrokers = {},

    functions = {
        subscribe: ,
        unscribe: ,
	publish: 
    };

    //exportFunctions();

    function defineProp (args) {
    
    }
     
    function getSet (id) {
        var subscriptions = {
            '*': []
        };

        function subscribe (args) {
        }

        function addSubscription (eventName, callback) {
         
        }

        function unsubscribe (args) {

        }

        function removeSubscription (eventName, callback) {
          
	}

        function publish (event) {
           
	}
    }

    function exportFunctions () {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module === 'object' && module !== null) {
            module.exports = functions;
        } else {
            globals.pubsub = functions;
        }
    }
}(this));