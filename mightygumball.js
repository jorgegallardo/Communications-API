var lastReportTime = 0;

window.onload = function() {
	setInterval(handleRefresh, 5000);
	// var url = "http://gumball.wickedlysmart.com";
	// var request = new XMLHttpRequest(); //constructor initializes XMLHttpRequest
	// request.open("GET", url); //initializes the request, using GET method, and the url provided

	// request.onload = function() { //handles the response from the server
	// 	if(request.status == 200) //status property of XMLHttpRequest object, 200 = OK!
	// 		updateSales(request.responseText); //place JSON response in responseText property of XMLHttpRequest
	// };

	// request.send(null); //method that sends request to server (we pass null because we're not sending data to the service)
}

// function updateSales(responseText) {
function updateSales(sales) {
	var salesDiv = document.getElementById("sales");
	// var sales = JSON.parse(responseText); //take response and use JSON.parse to convert it to JavaScript object, assigning it to var sales

	for(var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div"); //create a new div
		div.setAttribute("class", "saleItem"); //each new div has a class of saleItem
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		salesDiv.appendChild(div); //add each salesItem div to our original div with an id of sales
	}
	if(sales.length > 0)
		lastReportTime = sales[sales.length-1].time;
}

function handleRefresh() {
	var url = "http://gumball.wickedlysmart.com/?callback=updateSales" + 
	"&lastreporttime=" + lastReportTime + 
	"&random=" + (new Date()).getTime(); //we're tricking the browser into thinking we're requesting a totally brand new page so that we don't keep getting a cached version

	var newScriptElement = document.createElement("script"); //creates a script element
	newScriptElement.setAttribute("src", url); //with src = url above
	newScriptElement.setAttribute("id", "jsonp"); //and an id of jsonp

	var oldScriptElement = document.getElementById("jsonp"); //find jsonp element; if it doesn't exist, we'll get back null
	var head = document.getElementsByTagName("head")[0]; //returns an array of head elements, using [0] we get the first head element in the array

	if(oldScriptElement == null) {
		head.appendChild(newScriptElement); //if there isn't a script (null) element, append the new script element to the head
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement); //if there is a script element, replace it with the new one
	}
}