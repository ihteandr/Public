define([
  'text!templates/template.html'
],function(detailsTemplate){
  return {
    details: {
      title: 'Details',
      route: '/details',
      controller: 'details',
      template: detailsTemplate
    },
    detailsWithID: {
      title: 'Details',
      route: '/details/:id',
      controller: 'details',
      template: detailsTemplate
    }
  };
});
