define("BaseRouter", ["Class"], function(Class){
    var BaseRouter = Class.extend({
        /*
        * routes can be like example
        * {
        *   "/home": {
        *       [optional] but must be with controller
        *           template: "homeTemplate",
        *       [optional] but must be with controller
        *           templateUrl: "homeTemplate",
        *       [optional]
        *           title: "title",
        *       [optional] but must be with template
        *           controller: "homeController",
        *       [optional] been called when hash be equal "/home", first argument get $scope, by default $rootScope
        *           listener: "homeListener",
        *       [optional] been called when "/home" route be changed,  first argument get $scope, by default $rootScope
        *           afterChangeListener: "afterChangeHomeListener"
        *   },...
        * }
        *
        * */
        routes: {},
        angModule: null,
        $scope: null,
        errorPage: null,
        error: null,
        /*
        * validator function called when hash change.
         * first argument is callback.
        * when callback get true continue work, when callback get false
        * change hash on errorPage if errorPage initialized,
        * call error function if error function initialized
        * */
        validator: function(cb){
            cb(true);
        },

        //first argument is angular module, second argument is scope.
        //both arguments is optional,
        // when set angular module templates and controllers been injected in angular route system,
        // when set scope, in listeners first argument been that scope
        init: function(angModule, scope){
            this.angModule = angModule;
            this.scope = scope;
        },

        //first parameter hash, second parameter is optional for call afterChangeListener
        _applyListener: function($scope, hash, isAfterChangeListener){
            var keys = hash.split("/"),
                params = [],
                type = "listener",
                listener;
            if(isAfterChangeListener){
                type = "afterChangeListener";
            }
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
                    listener = this[routes[route][type]];
                    break;
                }
            }
            params.unshift($scope);
            if(listener){
                listener.apply(options, params);
            }
        },

        run: function(){
            var _self = this,
                hash = window.location.hash,
                hashValue = hash.substr(hash.indexOf("#") + 1);
            if(this.angModule){
                this.angModule.config(["$routeProvider", function($routeProvider){
                    for(var route in this.routes){
                        var options = this.routes[route];
                        if((options.templateUrl || options.template) && options.controller){
                            $routeProvider.when(route, {
                                template: options.template,
                                templateUrl: options.templateUrl,
                                controller: options.controller,
                                title: options.title
                            });
                        }
                    }
                }]);
            }
            var fn = function($scope) {
                $scope = this.$scope || $scope;
                $scope.$on('$routeChangeSuccess', function (next, last) {
                    var callback = function(answer){
                        if(answer){
                            _self._applyListener($scope, next);
                            _self._applyListener($scope, last, true);
                        } else {
                            if(_self.errorPage){
                                window.location.hash = _self.errorPage;
                            }
                            if(_self.error){
                                if(typeof _self.error == "function"){
                                    _self.error();
                                } else {
                                    throw new Error("BaseRouter: error property must be function");
                                }
                            }
                        }
                    };
                    if(typeof _self.validator == "function"){
                        _self.validator(callback);
                    } else {
                        throw new Error("BaseRouter: validator property must be function");
                    }
                });
            };
            if(this.$scope){
                fn(this.$scope);
            } else {
                this.angModule.run(["$rootScope", fn]);
            }

            this._applyListener(hashValue);
        }
    });

    return BaseRouter;
});