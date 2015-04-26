ModuleTotal.prototype=new eldb.Module();
ModuleTotal.prototype.constructor=ModuleTotal;
function ModuleTotal() {

	//elements for contributions
	this._contributionsContainer=document.createElement("div");
	this._contributionsContainer.className="total-contributions";
	this._contributionsLabel=document.createElement("div");
	this._contributionsLabel.className="label";
	this._contributionsLabel.innerHTML="total contributions";
	this._contributionsValue=document.createElement("div");
	this._contributionsValue.className="value";
	this._contributionsValue.innerHTML="0";
	this._contributionsContainer.appendChild(this._contributionsLabel);
	this._contributionsContainer.appendChild(this._contributionsValue);

	//separator
	this._separator1=document.createElement("div");
	this._separator1.className="separator";

	//elements for contributors
	this._contributorsContainer=document.createElement("div");
	this._contributorsContainer.className="total-contributors";
	this._contributorsLabel=document.createElement("div");
	this._contributorsLabel.className="label";
	this._contributorsLabel.innerHTML="total contributors";
	this._contributorsValue=document.createElement("div");
	this._contributorsValue.className="value";
	this._contributorsValue.innerHTML="0";
	this._contributorsContainer.appendChild(this._contributorsLabel);
	this._contributorsContainer.appendChild(this._contributorsValue);

	//editathon duration
	this._durationContainer=document.createElement("div");
	this._durationContainer.className="editathon-duration";
	this._durationValue=document.createElement("div");
	this._durationValue.className="value";
	this._durationValue.innerHTML="00:00 hours!";
	this._durationContainer.appendChild(this._durationValue);

	this._container.appendChild(this._contributionsContainer);
	this._container.appendChild(this._separator1);
	this._container.appendChild(this._contributorsContainer);
	this._container.appendChild(this._durationContainer);

	var thisobj=this;

	this._updateEditathonDuration=function() {
		var lastMoment=this._editathon._endTime>0?this._editathon._endTime:new Date().getTime();
		var startTime=this._editathon._startTime>0?this._editathon._startTime:lastMoment;
		var duration=lastMoment-startTime;
		var hours=(duration/1000/60/60)|0;
		if(hours<10) {hours="0"+hours;}
		var minutes=((duration-(hours*60*60*1000))/1000/60)|0;
		if(minutes<10) {minutes="0"+minutes;}
		this._durationValue.innerHTML=hours+":"+minutes+" hours!";
	}

	this._durationTimer=setInterval(function() {thisobj._updateEditathonDuration();},5000);

	this.onDataUpdated=function(users) {
		var total=0;
		var articleLinks="";
		for(var i=0;i<users.length;i++) {
			var currentUser=users[i];
			total+=currentUser.articles.length;
			for(var j=0;j<currentUser.articles.length;j++) {
				articleLinks+="<a href='"+currentUser.articles[j].link+"' target='_blank'>"+currentUser.articles[j].title+"</a> ";
			}
		}
		this._contributionsValue.innerHTML=total;
		this._contributorsValue.innerHTML=users.length;
		//this._updateEditathonDuration();
	}

}
