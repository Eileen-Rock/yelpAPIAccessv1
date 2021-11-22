var token_ 
var userName = "clientID"; 
var passWord = "secretKey"; 
var yelpTokenURL = "https://www.yelp.com/oauth/token";  
var request = new XMLHttpRequest(); 

function getToken(url, clientID, clientSecret) {
    var key;           
    request.open("POST", url, true); 
    request.setRequestHeader("Content-type", "application/json");
    request.send("grant_type=client_credentials&client_id="+clientID+"&"+"client_secret="+clientSecret); 
    request.onreadystatechange = function () {
        if (request.readyState == request.DONE) {
            var response = request.responseText;
            var obj = JSON.parse(response); 
            key = obj.access_token; 
            token_ = key; 
        }
    }
}
getToken(yelpTokenURL, userName, passWord);

function CallWebAPI(String restaurantName) {
    var request_ = new XMLHttpRequest();        
    var encodedParams = encodeURIComponent(params);
    request_.open("GET", "https://api.yelp.com/v3/businesses/" + restaurantName + "/reviews", true);
    request_.setRequestHeader("Authorization", "Bearer "+ token_);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response); 
	    var reviewItems = obj.reviews;
	    for(let i = 0; i < reviewItems.length;i++){
		console.log(reviewItems[i].rating);
		console.log(reviewItems[i].user);
		console.log(reviewItems[i].text);
		console.log(reviewItems[i].time_created);
		}
             

        }
    }
}

const input = prompt("Input name of restaurant for Yelp search.");

CallWebAPI(input);