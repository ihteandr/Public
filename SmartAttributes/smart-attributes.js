(function(){
	var SmartAttributes = {
		supportedAttributes: ["smart-pattern"],
		expectedValues: {
			smartPattern: ["RegExp", "email", "phone", "text", "number", "noXSS"]
		},
		_attachedElements: [],
		addEventListened: function(elem, evType, fn) {
			if (elem.addEventListener) {
				elem.addEventListener(evType, fn, false);
				return fn;
			}

			iefn = function() { fn.call(elem) } ;
			elem.attachEvent('on' + evType, iefn);
			return iefn;
		},
		removeEventListened: function (elem, evType, fn) {
			if (elem.addEventListener) {
				elem.removeEventListener(evType, fn, false);
				return;
			}
			elem.detachEvent('on' + evType, fn);
		},
		_patterns: {
			noXSS: {regexp: /<[\w+\s+\/=(.js)(.css)\"\'\\\n]+>/igm, include: false},
			email: {regexp: /^\w*(\w+\.?\w*|\w+\.?\w*@|\w+\.?\w*@\w+\d*\.?\w*\d*)?$/, include: true},
			phone: { regexp: /^\+?\s*(\d|\(\d*|\(\)|\(\s?\d+\s?\)\s*)*\s*?[0-9\-\s]*$/, include: true},
			text:  {regexp: /\w?/igm, include: true},
			number: {regexp: /^[0-9]*$/, include: true}
		},
		_detachHandlers: function(){
			for(var i = 0; i < this._attachedElements.length; i++){
				this.removeEventListened(this._attachedElements[i], "keyup", this._patternKeyUp);			
			}
			this._attachedElements = [];
		},
		_patternKeyUp: function(event){
			var regexp = event.target.getAttribute("smart-pattern");
			var pattern = this._patterns[regexp] || {regexp: eval(regexp), include: true};
			var value = event.target.value || event.target.getAttribute("value");
			if(value && pattern.regexp.test(value) != pattern.include){
				event.target.value = event.target.getAttribute("cache-value");
			} else {
				event.target.setAttribute("cache-value", event.target.value);
			}
			return true;
		},
		_attachHandlers: function(){
			var patternElements = document.querySelectorAll("[smart-pattern]");
			for(var i = 0; i < patternElements.length; i++){
				patternElements[i].setAttribute("cache-value", patternElements[i].value);
				this.addEventListened(patternElements[i], "keyup", this._patternKeyUp.bind(this));			
			}
			this._attachedElements = this._attachedElements.concat(patternElements);
		},
		restart: function(){
			this._detachHandlers();
			this._attachHandlers();
		},
		run: function(){
			this._attachHandlers();
			this.addEventListener(document.documentElement, "DomNodeInsert", this.restart.bind(this))
		},
		stop: function(){
			this._detachHandlers();
		}
	};

	if(typeof define == "function" && define.amd){
		define("smart-attributes", [], function(){return SmartAttributes;})
	} else {
		window.SmartAttributes = SmartAttributes;
	}	
})();
