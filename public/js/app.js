(function() {
  var app = angular.module('agender', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);
  

//LIST CONTROLLER=========================================
  app.controller('ListController', function($scope, listService){

    //$SCOPE VARIABLES
    $scope.formInput = {
      itemContent: ""
    };

    $scope.listItems = [];

    loadRemoteData();

    //PUBLIC METHODS
    $scope.addListItem = function(){
      console.log($scope.formInput.itemContent);
      listService.addListItem($scope.formInput.itemContent)
        .then(
          loadRemoteData,
          function(errorMessage){
            console.log(errorMessage);
          }
        );
        $scope.formInput.itemContent = "";
    };

    $scope.removeListItem = function(listItem){
      listService.removeListItem(listItem["_id"]["$oid"])
        .then(loadRemoteData);
    };

    $scope.beginEdit = function(index){
      $('.list-item-class')[index].contentEditable = "true";
      $('.list-item-class')[index].focus();
    };

    $scope.submitEdit = function(keyEvent, index, listItem) {
      if (keyEvent.which === 13) {
        $('.list-item-class')[index].contentEditable = "false";
        $('.list-item-class')[index].blur();
        listService.editListItem(listItem, $('.list-item-class')[index].innerHTML)
          .then(loadRemoteData);
      }
    };

    //PRIORITIZING LISTITEMS
    //not persisting yet
    var move = function (origin, destination) {
      var temp = $scope.listItems[destination];
      $scope.listItems[destination] = $scope.listItems[origin];
      $scope.listItems[origin] = temp;
    };
 
    $scope.moveUp = function(index){

        move(index, index - 1);
    };
 
    $scope.moveDown = function(index){
        move(index, index + 1);
    };


    //PRIVATE METHODS
    function applyRemoteData(newListItems){
      $scope.listItems = newListItems;
    }

    function loadRemoteData(){
      listService.getListItems()
        .then(
          function(listItems){
            applyRemoteData(listItems);
          }
        );
    }
  });





  //LIST SERVICE==============================================

  //Acts as a repository for the remote list collection
  app.service(
    "listService",
    function($http, $q){
      return({
        addListItem:    addListItem,
        getListItems:   getListItems,
        removeListItem: removeListItem,
        editListItem:   editListItem
      });

      //PUBLIC METHODS

      //Adds a listItem to the remote list collection
      function addListItem(itemContent){
        var request = $http({
          method: "post",
          url: "/api/new_document",
          params: {
            itemContent: itemContent
          },
          data: {
            itemContent: itemContent
          }
        });
        return(request.then(handleSuccess, handleError));
        //you can use the .then method here because the request value is a "promise", you can also use the then method to register callbacks
      }

      //Gets all the listItems from the remote list collection
      function getListItems() {
        var request = $http({
          method: "get",
          url: "/api/documents",
          params: {
            action: "get"
          }
        });

        return(request.then(handleSuccess, handleError));
      }

      //Edits the listitem
      function editListItem(listItem, newContent) {
        console.log(listItem);
        console.log(newContent);
        var request = $http({
          method: "put",
          url: "/api/update_document",
          params: {
            id: listItem["_id"]["$oid"],
            itemContent: newContent
          },
          data: {
            itemContent: newContent
          }
        });
        return(request.then(handleSuccess, handleError));
      }

      //Remove the listItem from the remote list collection
      function removeListItem(id) {
        var request = $http({
          method: "delete",
          url: "/api/delete_document",
          params: {
            id: id
          },
          data: {
            id: id
          }
        });
        return(request.then(handleSuccess, handleError));
      }

      //PRIVATE METHODS 

      function handleError(response) {
        return ($q.reject(response.data.message));
      }

      function handleSuccess(response){
        return(response.data);
      }

    }
  );

$('.list-item-class').keypress(function(e) {
  console.log("eyyyooo");
  if (e.keyCode == 13){
    e.preventDefault();
    alert("we be balllinnnnn");
  }
});


})();

