//LIST CONTROLLER=========================================
var agenderControllers = angular.module('agenderControllers', ['agenderServices']);

agenderControllers.controller('listController', function($scope, listService){

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