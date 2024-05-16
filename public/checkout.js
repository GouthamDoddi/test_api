// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe("pk_test_51Jk5pLSAAJH0VpwtlM8xaXcuwgsi2vcevYBXhEY2EI6NOCqrI5YYi4yEhRmI1mvLa5fWCSifp243tXpcfG1K77pD00oirhXv0I");
var checkoutButton = document.getElementById("btn");
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.K2BcH6vjRhLN00Z2TULZfzqs46KfosSrvLgnqyIzFt8");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("userId", "bhavya.d03@gmail.com");
urlencoded.append("planId", "61729be1c56edc2699b4b2ed");
urlencoded.append("isSelfPay", true);
urlencoded.append("priceId", 'price_1JqbHxSAAJH0VpwtidQizbzm');




var requestOptions = {
method: 'POST',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};


checkoutButton.addEventListener("click", function () {
    console.log('clicked')
    fetch("http://34.68.55.94:8080/payment", requestOptions)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (session) {
        const result = stripe.redirectToCheckout({ sessionId: session.id });
        console.log(result)
        return result
    })
    .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
        alert(result.error.message);
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
});