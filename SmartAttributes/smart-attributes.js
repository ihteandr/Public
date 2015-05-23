(function(){
    var SmartAttributes = {
        settings: {
            NoXSSForAll: false
        },
        supportedAttributes: ["smart-pattern"],
        expectedValues: {
            smartPattern: ["RegExp", "email", "phone", "text", "number", "noXSS"]
        },
        _attachedElements: [],
        addEventListener: function(elem, evType, fn) {
            if (elem.addEventListener) {
                elem.addEventListener(evType, fn, false);
                return fn;
            }

            iefn = function() { fn.call(elem) } ;
            elem.attachEvent('on' + evType, iefn);
            return iefn;
        },
        removeEventListener: function (elem, evType, fn) {
            if (elem.removeEventListener) {
                elem.removeEventListener(evType, fn, false);
                return;
            } else if(elem.detachEvent){
                elem.detachEvent('on' + evType, fn);
            }
        },
        _patterns: {
            noXSS: {regexp: /<[\w+\s+=<>(.js)(.css)\"\'\n-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+>/igm, include: false},
            email: {regexp: /^\w*(\w+\.?\w*|\w+\.?\w*@|\w+\.?\w*@\w+\d*\.?\w*\d*)?$/, include: true},
            phone: { regexp: /^\+?\s*(\d|\(\d*|\(\)|\(\s?\d+\s?\)\s*)*\s*?[0-9\-\s]*$/, include: true},
            text:  {regexp: /\w?/igm, include: true},
            number: {regexp: /^[0-9]*\.?[0-9]*$/, include: true},
            positiveInteger: {regexp: /^[0-9]*$/, include: true}
        },
        _patternKeyPress: function(event){
            var regexp = event.target.getAttribute("smart-pattern") || event.target.smartOptions.pattern;
            var pattern = this._patterns[regexp] || {regexp: eval(regexp), include: true};
            var value = (event.target.value || event.target.getAttribute("value") || "");
            value = value.substr(0, event.target.selectionStart)+ String.fromCharCode(event.keyCode) + value.substr(event.target.selectionStart);
            if(value && pattern.regexp.test(value) != pattern.include){
                event.preventDefault();
                return false;
            } else {
                event.target.cacheValue = event.target.value;
            }
        },
        _patternPaste: function(event){
            setTimeout(function(){
                var regexp = event.target.getAttribute("smart-pattern") || event.target.smartOptions.pattern;
                var pattern = this._patterns[regexp] || {regexp: eval(regexp), include: true};
                var value = event.target.value || event.target.getAttribute("value");
                if(value && pattern.regexp.test(value) != pattern.include){
                    event.target.value = event.target.cacheValue + "";
                } else {
                    event.target.cacheValue = event.target.value || "";
                }
            }.bind(this), 200);
        },
        _detachHandlers: function(){
            for(var i = 0; i < this._attachedElements.length; i++){
                this.removeEventListener(this._attachedElements[i], "keypress", this._patternKeyPress);
                this.removeEventListener(this._attachedElements[i], "paste", this._patternPaste);
            }
            this._attachedElements = [];
        },
        _attachHandlers: function(){
            console.log("attach handlers")
            var patternElements = Array.prototype.slice.call(document.querySelectorAll("[smart-pattern]"));
            if(this.settings.NoXSSForAll){
                var all = [];
                all = all.concat(Array.prototype.slice.call(document.querySelectorAll("input:not([type=checkbox]):not([type=checkbox])")));
                all = all.concat(Array.prototype.slice.call(document.querySelectorAll("textarea")));
                for(var i = 0; i < all.length; i ++){
                    all[i].smartOptions = {
                        pattern: "noXSS"
                    };
                }
                patternElements = patternElements.concat(all);
            }
            for(var i = 0; i < patternElements.length; i++){
                if(!patternElements[i].smartPattern){
                    patternElements[i].smartPattern = patternElements[i].getAttribute("smart-pattern");
                }
                patternElements[i].cacheValue = patternElements[i].value;
                this.addEventListener(patternElements[i], "keypress", this._patternKeyPress.bind(this));
                this.addEventListener(patternElements[i], "paste", this._patternPaste.bind(this));
            }
            this._attachedElements = this._attachedElements.concat(patternElements);
        },
        restart: function(){
            this._detachHandlers();
            this._attachHandlers();
        },
        run: function(){
            this._attachHandlers();
            this.addEventListener(document.documentElement, "DOMNodeInserted", function(){
                this.timeout && clearTimeout(this.timeout);
                this.timeout = setTimeout(function(){
                    this.restart();
                }.bind(this), 200)
            }.bind(this))
            window.onDomChange = function(){
                this.timeout && clearTimeout(this.timeout);
                this.timeout = setTimeout(function(){
                    this.restart();
                }.bind(this), 200)
            }.bind(this);
        },
        stop: function(){
            this._detachHandlers();
        }
    };
    if(typeof define == "function" && define.amd){
        define([], function(){return SmartAttributes;})
    } else {
        window.SmartAttributes = SmartAttributes;
    }
})();
