var data = new Array();
var aqiData = function(){
	var city = document.getElementById('aqi-city-input').value.trim();
	var num = document.getElementById('aqi-value-input').value.trim();
	num = num-0;
	console.log(isNaN(city));
	console.log(typeof(num));
	if(isNaN(city)){
		if(Math.floor(num)===num){
			var info = city + ':' + num;
			data.push(info);
			console.log(data);
			return data;
		}
	}
}
function init(){
	document.getElementById('add-btn').onclick = aqiData;
}
init();