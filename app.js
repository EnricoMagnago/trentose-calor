/* your code should go here */


var Calor = {
    Model : {
		init : function(data){
			this.data = data;
        },
		getSize : function(){
			return this.data.length;
		},
		getDay : function(index){
			return this.data[index].day;
		},
		getPeriod : function(index){
			return this.data[index].period;
		},
		getTemp : function(index){
			return this.data[index].temperature;
		},
		getCondition : function(index){
			return this.data[index].condition;
		}
    }, 
    
    Controller : {
        init : function(){
			this.iconFolder = "img/icons/";
			this.iconExtension = ".png";
			Calor.Model.init(data);
			Calor.View.init();
			this.showItems();
		},
		getMinTemp : function(day){
			var minTemp = null;
			var size = Calor.Model.getSize();
			for(var i=0; i<size; i++){
				if(day.toLowerCase() === Calor.Model.getDay(i).toLowerCase()){
					var temperature = Calor.Model.getTemp(i);
					if(minTemp === null) minTemp = temperature
					else if(minTemp > temperature) minTemp = temperature;
				}
			}			
			return minTemp;			
		},
		getMaxTemp : function(day){
			var maxTemp = null;
			var size = Calor.Model.getSize();
			for(var i=0; i<size; i++){
				if(day.toLowerCase() === Calor.Model.getDay(i).toLowerCase()){
					var temperature = Calor.Model.getTemp(i);
					if(maxTemp === null) maxTemp = temperature
					else if(maxTemp < temperature) maxTemp = temperature;
				}
			}			
			return maxTemp;	
		},
		getCondition : function(day){
			var condition = null;
			var size = Calor.Model.getSize();
			for(var i=0; i<size && condition === null; i++)
				if(day.toLowerCase() === Calor.Model.getDay(i).toLowerCase())
					condition = Calor.Model.getCondition(i);
				
			return condition;
		},
		generateItem : function(day){
			var item = {
				iconPath : "",
				dayName : "",
				minTemp : 0,
				maxTemp : 0
			};
			var condition = this.getCondition(day);
			item.iconPath = this.iconFolder + condition + this.iconExtension;
			item.dayName = day;
			item.minTemp = this.getMinTemp(day);
			item.maxTemp = this.getMaxTemp(day);
			return item;			
		},
		showItems : function(){
			var days = ["Wednesday", "Thursday", "Friday", "Saturday"];
			for(var i=0; i < days.length; i++){
				var item = this.generateItem(days[i]);
				Calor.View.renderItem(item);
			}
		}		
    },
    
    View : {
        init : function(){
			this.list = $("#summary");
			this.list.empty();
			this.itemPattern = 
				"<li>" + 
					"<div class=\"icon\">" +
						"<img src=\"?iconPath?\">" +      
          			"</div>" +
          			"<div class=\"stats\">" +  
            			"<h2>?dayName?</h2>" +
            			"<strong>min</strong> ?minTemp?ºC" +
            			"<strong>max</strong> ?maxTemp?ºC" +   
          			"</div>" + 
        		"</li> ";
		},
		toHtml : function(item){
			var html = this.itemPattern.replace("?iconPath?", item.iconPath);
			html = html.replace("?dayName?", item.dayName);
			html = html.replace("?minTemp?", item.minTemp);
			html = html.replace("?maxTemp?", item.maxTemp);
			return html;
		},
		renderItem : function(item){
			var htmlItem = this.toHtml(item);
			console.log("item:\n\t" + item.dayName + "\n\t" + item.iconPath + "\n\t" + item.maxTemp + "\n\t" + item.minTemp);
			console.log("html: " + htmlItem + "\n\n");
			this.list.append(htmlItem);
		}
    }
};

$(document).ready(function(){
  	Calor.Controller.init();
});






