angular.module('myModule', ['ui.bootstrap']); 
var currentPos = 0;
angular.module('myModule').controller('myController', ["$scope", "$modal", function ($scope, $modal) {

$scope.products = [{
	productId: "1",
	name: "Nike Shoe",
	title: "Nike Blue color stylish",
	description: "Above nike shoes is brand new purchased on a couple of month ago.Bid fast,the bid is open till 6 PM tommorow.",
	lastBid: "last bid: $24",
	rating: "2",
	contactNumber:"9818273369",
	productImage:"../Training_EcommApp/images/items/item_shoes_nike.png"
}, {
	productId: "2",
	name: "Cricket bat",
	title: "Cricket bat",
	description: "Above cricket bat is brand new purchased on a couple of month ago.Bid fast, the bids is open till 6 PM tommorow.",
	lastBid: "last bid: $200",
	rating: "3",
	contactNumber:"9999787654",
	productImage:"../Training_EcommApp/images/items/item_sport_cricket_bat.png"
}, {

	name: "Bag from american tourister",
	title: "Bag from american tourister",
	description: "Above travel bag is brand new purchased on a couple of month ago. Bid fast,the bid is open till 6 PM tommorow.",
	lastBid: "last bid: $230",
	productId: "3",
	rating:"4",
	contactNumber:"9897980965",
	productImage:"../Training_EcommApp/images/items/item_bags_american_tourister.png"
}];

    $scope.checkItem = "";

    // Clicking on Bid button will navigate user to Bid n Buy screen
    $scope.loadEditForm = function () {
        $scope.checkItem = "yes";
        $modal.open({
            templateUrl: '../Training_EcommApp/pages/bidpopup.html',
            controller: 'modalController',
            scope: $scope
        })
        .result.then(function() {
        	alert('Thanks for the bidding. You are now leading in the race.');
        }, function() {
            alert('Product cancelling...');
        });
    };
    
    // Reload the page whenever a new product is selected
    $scope.loadProduct = function (pos) {
        // To load the selected product to make a bid
    	currentPos = pos;
    	
    // set the product details on load the page
    $scope.title = $scope.products[pos]["title"];
    $scope.description = $scope.products[pos]["description"];
    $scope.contactNumber = $scope.products[pos]["contactNumber"];
    $scope.rating = $scope.products[pos]["rating"];
    $scope.lastBid = $scope.products[pos]["lastBid"];
    $scope.productImage = $scope.products[pos]["productImage"];
    };
    
    // Load first product at the startup
    $scope.loadProduct(0);
}]);

angular.module('myModule').controller('modalController', ['$scope', function($scope) {
	   $scope.successBid = function(){
		   $scope.products[currentPos].lastBid ="$"+$scope.newBid;
		   $scope.loadProduct(currentPos);
	   };
}]);


// To highlight the selected product when it is clicked
$(function(){
    console.log('ready');
    
    $('.list-group a').click(function(e) {
        e.preventDefault();
        
        $that = $(this);
        
        $('.list-group').find('a').removeClass('list-group-item active');
        $('.list-group').find('a').addClass('list-group-item');
        $that.addClass('list-group-item active');
    });
});