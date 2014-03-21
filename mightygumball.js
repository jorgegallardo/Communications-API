window.onload = function() {
	var url = "http://localhost:8000/sales.json";
	var request = new XMLHttpRequest(); //constructor initializes XMLHttpRequest
	request.open("GET", url); //initializes a request
	request.onload = function() {
		if(request.status == 200) //status property of XMLHttpRequest object, 200 = OK!
			updateSales(request.responseText);
	};
	request.send(null); //method that sends request to server (we pass null because we're not sending data to the service)
}

function updateSales(responseText) {
	var salesDiv = document.getElementById("sales");
	salesDiv.innerHTML = responseText;
}