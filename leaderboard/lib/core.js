//Create everything under 'eldb' to avoid conflicts with other libraries
if(typeof eldb=="undefined") {window.eldb={};}


////////// Editathon //////////
eldb.Editathon=function(log) {
	
	this._STOPPED=0;
	this._STARTED=1;
	this._REFRESH_PERIOD=60000*4; //ms
	
	this._log=log|false;
	this._proxyPath="proxy/proxy.php";
	this._language="en";
	this._users=[];
	this._modules=[];
	this._startTime=0;
	this._endTime=0;
	this._status=this._STOPPED;
	this._timer;

	var thisobj=this;
	
	this.setLanguage=function(language) {
		this._language=language;
	}
	
	/** Adds a new user to this Editathon **/
	this.addUser=function(username) {
		var index=this._findUser(username);
		if(index<0) { //user not found
			var user=new eldb._User(this, username);
			this._users.push(user);
			this.log("New user added. (total: "+this._users.length+" users)");
			return true;
		} else { //user already added
			this.log("User already exists in this Editathon.");
			return false;					
		}
	}
	
	/** Returns true on success and false in any other case **/
	this.removeUser=function(username) {
		var index=this._findUser(username);
		if(index>=0) { //user found
			this._users=this._users.slice(0,index).concat(this._users.slice(index+1));
			this.log("User removed. (total: "+this._users.length+" users)");
			return true;
		} else { //user not found
			this.log("The requested username was not found in this Editathon.");
			return false;			
		}
	}
	
	/** Returns the index of a user in the _users array or -1 if the user is not in the array. **/
	this._findUser=function(username) {
		for(var i=0;i<this._users.length;i++) {
			if(username==this._users[i].username) {return i;}
		}
		return -1;
	}
	
	this.getUsers=function() {
		return this._users;
	}

	this._attachModule=function(module) {
		//check that the module is not already attached to this editathon
		for(var i=0;i<this._modules.length;i++) {
			if(this._modules[i]==module) {
				this.log("You are trying to attach an already attached module!");			
			}
		}
		this._modules.push(module);
	}

	this._notifyModules=function() {
		for(var i=0;i<this._modules.length;i++) {
			this._modules[i].onDataUpdated(this._users);
		}
	}
	
	/** Start this Editathon **/
	this.start=function() {
		//update status
		if(this._status==this._STARTED) {return;}
		this._status=this._STARTED;
		//start the timer
		if(this._timer!=null) {this.stop();}		
		this._timer=setInterval(thisobj._run, 2000);
		//set the start time (if is not already set)
		if(this._startTime<=0) {this._startTime=new Date().getTime();}
		this.log("Editathon started. ("+new Date()+")");
	}

	/** Stop this Editathon **/
	this.stop=function() {
		//update status		
		if(this._status==this._STOPPED) {return;}
		this._status=this._STOPPED;
		//stop the timer
		if(this._timer!=null) {
			clearInterval(this._timer);
			this._timer=null;
		}
		this.log("Editathon stopped. ("+new Date()+")");
	}

	/** Handles fetching **/
	this._run=function() {
		var now=new Date().getTime();
		for(var i=0;i<thisobj._users.length;i++) {
			var currentUser=thisobj._users[i];
			var timeElapsed=now-currentUser.lastUpdate;
			if(timeElapsed>thisobj._REFRESH_PERIOD) {
				thisobj.log("Updating user "+currentUser.username+" (last update "+new Date(currentUser.lastUpdate)+")");
				currentUser.requestData();
			}
		}
	}
		
	/** This should be used to output messages to the console. **/
	this.log=function(message) {
		if(this._log) {console.log("[eldb] "+message);}
	}
	
	this.log("Editathon created.");	
}

////////// Module //////////
eldb.Module=function() {
	
	this._editathon=null;

	this._container=document.createElement("div");
	this._container.className="eldb-module";

	this.setEditathon=function(editathon) {
		if(this._editathon!=null) {this._editathon.log("You are trying to reattach an already attached module!");}
		this._editathon=editathon;
		//register this module
		this._editathon._attachModule(this);
	}

	this.onDataUpdated=function(users) {} //every module should override this function

	
}

////////// _User //////////
eldb._User=function(editathon, username) {

	this._editathon=editathon;
	this.username=username;
	this.lastUpdate=0;
	this.articles=[];
	var thisobj=this;

	this.requestData=function() {
		this.lastUpdate=new Date().getTime();
		var ajax=new XMLHttpRequest();
		ajax.open("GET",this._editathon._proxyPath+"?lang="+this._editathon._language+"&user="+this.username,true);
		ajax.onreadystatechange=function() {
			if(ajax.readyState==4 && ajax.status==200) {
				thisobj._handleData(ajax.responseText);
			}		
		}
		ajax.send();
	}
	
	this._handleData=function(data) {
		var parser=new DOMParser();
		var rss=parser.parseFromString(data,"application/xml");
		var items=rss.getElementsByTagName("item");
		var newArticles=[];
		for(var i=0;i<items.length;i++) {
			var currentItem=items[i];
			var article=new eldb._Article(currentItem);
			//check that the edit took place during the editathon
			if(article.pubDate>=this._editathon._startTime&&(this._editathon._endTime<=0||article.pubDate<=this._editathon._endTime)) {
				var articleExists=false;
				for(var j=0;j<newArticles.length;j++) {
					if(newArticles[j].title==article.title) {articleExists=true;}
				}
				if(!articleExists) {newArticles.push(article);}
			}
		}
		this._editathon.log(this.username+": "+newArticles.length+" contribution(s) in this editathon ("+items.length+" total contribution(s))");
		this.articles=newArticles;
		this._editathon._notifyModules();
	}

}

////////// _Article //////////
eldb._Article=function(itemElem) {
	
	//title
	this.title=itemElem.getElementsByTagName("title");
	if(this.title.length>0) {this.title=this.title[0].textContent;}

	//link
	this.link=itemElem.getElementsByTagName("link");
	if(this.link.length>0) {this.link=this.link[0].textContent;}

	//date
	this.pubDate=itemElem.getElementsByTagName("pubDate");
	if(this.pubDate.length>0) {this.pubDate=new Date(this.pubDate[0].textContent).getTime();}

}
