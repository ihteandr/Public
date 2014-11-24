var router = new window.CloudRouter({
	element: document.getElementsByClassName("view")[0],
	routes: {
		"/home": "home",
		"/page": "page",
		"/page/subpage": "pageSubPage",
		"/page/subpage/:id": "pageSubPage",
		"/page/:id": "page",
		"/page/:id/:subId": "page"
	},
	home: function(){
		this.element.innerHTML = "<h1>HOME</h1>";
	},
	page: function(id, subID){
		var content = "";
		content += "<h1>PAGE";
		if(id){
			content += " " + id;
		}
		if(subID){
			content += " " + subID;
		}
		content += "</h1>";
		this.element.innerHTML = content;
	}
});
router.run();