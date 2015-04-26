ModuleDetails.prototype=new eldb.Module();
ModuleDetails.prototype.constructor=ModuleDetails;
function ModuleDetails() {

	//articles
	this._articlesContainer=document.createElement("div");
	this._articlesContainer.className="articles";
	this._articlesTitle=document.createElement("div");
	this._articlesTitle.className="title";
	this._articlesTitle.innerHTML="Articles";
	this._articlesContent=document.createElement("div");
	this._articlesContent.className="content";
	this._articlesContainer.appendChild(this._articlesTitle);
	this._articlesContainer.appendChild(this._articlesContent);
	
	//users
	this._usersContainer=document.createElement("div");
	this._usersContainer.className="users";
	this._usersTitle=document.createElement("div");
	this._usersTitle.className="title";
	this._usersTitle.innerHTML="Contributors";
	this._usersContent=document.createElement("div");
	this._usersContent.className="content";
	this._usersContainer.appendChild(this._usersTitle);
	this._usersContainer.appendChild(this._usersContent);

	this._container.appendChild(this._articlesContainer);
	this._container.appendChild(this._usersContainer);
	
	this._updateUsersView=function() {
		var users=editathon.getUsers();
		//all			
		users=users.sort(sortByArticles);	
		var allUsers="";
		for(var i=0;i<users.length;i++) {
			allUsers+="<a>"+(i+1)+". "+users[i].username+"</a> ";		
		}
		this._usersContent.innerHTML=allUsers;
	}
	
	this._sortByArticles=function(a, b) {
		var aTotal=a.articles.length;
		var bTotal=b.articles.length;
		if(aTotal>bTotal) {return -1;}
		else if(aTotal<bTotal) {return 1;}
		else {return 0;}
	}
	
	this.onDataUpdated=function(users) {
		var articleLinks="";
		for(var i=0;i<users.length;i++) {
			var currentUser=users[i];
			for(var j=0;j<currentUser.articles.length;j++) {
				articleLinks+="<a href='"+currentUser.articles[j].link+"' target='_blank'>"+currentUser.articles[j].title+"</a> ";
			}
		}
		this._articlesContent.innerHTML=articleLinks;
		this._updateUsersView();
	}
}