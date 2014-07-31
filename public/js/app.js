(function() {
  var app = angular.module('agender', ['ui.bootstrap']);
  
  app.controller('ListController', function(){
    this.listItem = {
      itemContent: ""
    };
    this.listItems = listItems;

    this.addListItem = function(){
      listItems.push(this.listItem);
      this.listItem = {};
    };
  });

  var listItems = [
    {itemContent: 'first test list item'},
    {itemContent: 'second test list item'},
    {itemContent: 'third test list item'}
  ];

})();

