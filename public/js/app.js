(function() {
  var app = angular.module('agender', ['ui.bootstrap', 'ngRoute']);
  
//LIST CONTROLLER=========================================
  app.controller('ListController', function($scope, listService){
    $scope.formInput = {
      itemContent: ""
    };

    $scope.listItems = [];

    loadRemoteData();

    //PUBLIC METHODS
    $scope.addListItem = function(){
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
      console.log(listItem["_id"]["$oid"]);
      listService.removeListItem(listItem["_id"]["$oid"])
        .then(loadRemoteData);
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
        removeListItem: removeListItem
      });

      //PUBLIC METHODS

      //Adds a listItem to the remote list collection
      function addListItem(itemContent){
        console.log(itemContent);
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

      //Remove the listItem from the remote list collection
      function removeListItem(id) {
        console.log(id);
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


})();

