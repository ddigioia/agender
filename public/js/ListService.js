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
      var request = $http({
        method: "post",
        url: "/api/new_document",
        params: {
          action: "add"
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
      console.log("working");
      var request = $http({
        method: "delete",
        url: "/api/remove_document",
        params: {
          action: "delete"
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