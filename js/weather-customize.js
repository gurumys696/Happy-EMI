// function to display the Weather Widget
function whetherWidgetDisplay(cityId,cityName){
	window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
	window.myWidgetParam.push({
			id: 11,
			cityid: cityId,
			appid: 'f4687ee2ce75cd65828a9d711b7f3e2a',
			units: 'metric',
			containerid: 'openweathermap-widget-11'
	});  
	(function() {
			var script = document.createElement('script');script.async = true;
		  script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
		  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  
	})();
}

// Find the current user getLocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else { 
        $('#CurLoc').text("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    $('#CurLoc').html("Latitude: " + position.coords.latitude + "&nbsp;&nbsp;&nbsp;&nbsp;" +
    "Longitude: " + position.coords.longitude);
    var currentLang = position.coords.longitude;
    var currentLat = position.coords.latitude;
    initMap(currentLat,currentLang);
    whetherDisplay(currentLat,currentLang)
}

// function TO displaying updated location Weather
function whetherDisplay(latt,long){
	console.log(latt +"***"+long) ;
	$.ajax({
	 	type: "GET",  
		url : "http://api.openweathermap.org/data/2.5/weather?lat="+latt+"&lon="+long+"&APPID=f4687ee2ce75cd65828a9d711b7f3e2a",
		async: false,
		success : function(response) {
	        whetherWidgetDisplay(response.id)
	        var curTemp = parseFloat(response.main.temp - 273.15).toFixed(1);		        
	        $('.widget-left-menu__header').text(response.name+","+response.sys.country);
	        $('.weather-left-card__number').html(curTemp +"<span class='weather-left-card__degree'>°C</span>");
	        $('.weather-left-card__means').text(response.weather[0].description);
	        $('.weather-left-card__wind').text("Wind:" + response.wind.speed + "m/s Moderate breeze");
	    }
	});
}

// google map API
function initMap(curLat,curLong) {
// Create a map object and specify the DOM element for display.         
    var myLatLng = {lat: curLat, lng: curLong};
    var map = new google.maps.Map(document.getElementById('CurrrentLocationMap'), {
      zoom: 12,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map ,
      draggable:true         
    });
    google.maps.event.addListener(marker, 'dragend', function (event) {
	    var latDrag  =  this.getPosition().lat();
	    var longDrag = this.getPosition().lng();
	    whetherDisplay(latDrag,longDrag)
	    $('#CurLoc').html("Latitude:"+latDrag+"&nbsp;&nbsp;&nbsp;&nbsp;Longitude:"+ longDrag);
	});
}

// geolocation function calling 
getLocation();