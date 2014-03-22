window.onload = function() {
	var url = "http://localhost:8000/sales.json";
	var request = new XMLHttpRequest(); //constructor initializes XMLHttpRequest
	request.open("GET", url); //initializes the request, using GET method, and the url provided

	request.onload = function() { //handles the response from the server
		if(request.status == 200) //status property of XMLHttpRequest object, 200 = OK!
			updateSales(request.responseText); //place JSON response in responseText property of XMLHttpRequest
	};

	request.send(null); //method that sends request to server (we pass null because we're not sending data to the service)
}

function updateSales(responseText) {
	var salesDiv = document.getElementById("sales");
	var sales = JSON.parse(responseText); //take response and use JSON.parse to convert it to JavaScript object, assigning it to var sales

	for(var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div"); //create a new div
		div.setAttribute("class", "saleItem"); //each new div has a class of saleItem
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		salesDiv.appendChild(div); //add each salesItem div to our original div with an id of sales
	}
}