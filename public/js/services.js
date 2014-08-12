//LIST SERVICE==============================================
var agenderServices = angular.module('agenderServices', []);
//Acts as a repository for the remote list collection
agenderServices.factory('listService', function($http, $q){
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

});