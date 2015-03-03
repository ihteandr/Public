(function(){
    var CloudRouter = function(options){
        options || (options = {});
        var routes = options.routes || {};

        function addEvent(elem, evType, fn) {
            if (elem.addEventListener) {
                elem.addEventListener(evType, fn, false);
                return fn;
            }

            iefn = function() { fn.call(elem) } ;
            elem.attachEvent('on' + evType, iefn);
            return iefn;
        }

        function removeEvent(elem, evType, fn) {
            if (elem.addEventListener) {
                elem.removeEventListener(evType, fn, false);
                return;
            }
            elem.detachEvent('on' + evType, fn);
        }


        function addEventListeners(){
            var links = document.querySelectorAll("a[cloud-href]");
            for(var i = 0, link; link = links[i]; i ++){
                removeEvent(link, "click", sessionLinkClickHandler);
                addEvent(link, "click", sessionLinkClickHandler);
            }
        }

        function sessionLinkClickHandler(e){
            var href = e.target.getAttribute("cloud-href");
            navigate(href);
        }

        function navigate(path){
            var keys = path.split("/"),
                params = [];
            //function, if route been not found
            var callback = function(){
                throw new Error("CloudRouter: route no defined for " + path + " path");
            };
            //function, if function for route not defined
            var notDefinedFunction = function(route){
                return function(){
                    throw new Error("CloudRouter: callback no defined for " + route + " route");
                };
            };
            for(var route in routes){
                var r_keys = route.split("/");
                var checker = true;
                for(var i = 0,len = keys.length; i < len; i++){
                    if(r_keys[i] && r_keys[i].indexOf(":") != -1){
                        params.push(keys[i]);
                        continue;
                    } else if(r_keys[i] == keys[i]){
                        continue;
                    }
                    params = [];
                    checker = false;
                    break;
                }
                if(checker){
                    callback = options[routes[route]] || notDefinedFunction(route);
                    break;
                }
            }

            callback.apply(options, params);
        };

        this.run = function(){
            addEventListeners();
        };

        return this;
    };
    if(typeof define == "function" && define.amd){
        define("cloud-router", [], function(){return CloudRouter;})
    } else {
        window.CloudRouter = CloudRouter;
    }
})();