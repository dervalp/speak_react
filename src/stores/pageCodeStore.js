var pageCodeDispatcher = require( '../dispatcher/pageCodeDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var pageCodeConstant = require( '../constants/pageCodeConstant' );
var merge = require( 'react/lib/merge' );

var CHANGE_EVENT = 'change';

var compStore = {};

var pageCodeStore = merge( EventEmitter.prototype, {

  getComponentProperties: function ( component ) {
    if( !component || !component.id ) {
      throw 'component is invalid';
    }

    if( !compStore[component.id] ) {
      throw 'no component called ' + component.id + ' was defined in the pageCodeStore';
    }

    if( !compStore[component.id].__properties ) {
      throw 'no propertiers for component ' + component.id;
    }

    return compStore[component.id].__properties;
  },
  addComponentToStore: function ( property ) {

    if( !property || !property.id || !property.__properties ) {
      throw 'not valid property';
    }

    compStore[property.id] = property;

    compStore[property.id].on( 'change', function( attribute ) {
      this.emitChange( attribute, compStore[property.id] );
    }, this);
  },
  emitChange: function( attribute, component ) {
    if( attribute.indexOf( ':' ) === -1 ) {
      return;
    }

    var key = attribute.split( ':' )[ 1 ],
        change = {};

    change[ key ] = component[ key ];

    if( key in component.__properties ) {
      this.emit( CHANGE_EVENT, change );
    }
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function( callback ) {
    this.on( CHANGE_EVENT, callback );
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function( callback ) {
    this.removeListener( CHANGE_EVENT, callback );
  },

  flush: function () {
    compStore = {};
  }
});

// Register to handle all updates
pageCodeDispatcher.register( function( payload ) {
  var action = payload.action;

  switch( action.actionType ) {
    case pageCodeConstant.PROPERTY_CHANGE:
      compStore[ action.value.id ][ action.value.property ] = action.value.value;
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  //pageCodeStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = pageCodeStore;
