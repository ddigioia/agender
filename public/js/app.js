(function() {
  var app = angular.module('agender', ['ui.bootstrap']);
  
  app.controller('ListController', function(){
    this.listItems = listItems;
  });

  var listItems = [
    {content: 'first test list item'},
    {content: 'second test list item'},
    {content: 'third test list item'}
  ];

})();

