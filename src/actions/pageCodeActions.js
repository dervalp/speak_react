var pageCodeDispatcher = require( '../dispatcher/pageCodeDispatcher' );
var pageCodeConstant = require( '../constants/pageCodeConstant' );

var pageCodeActions = {
  changeProperty: function( component, property, value ) {
    pageCodeDispatcher.handleViewAction( {
      actionType: pageCodeConstant.PROPERTY_CHANGE,
      value: {
        id: component.props.id,
        property: property,
        value: value
      }
    } );
  }
};

module.exports = pageCodeActions;
