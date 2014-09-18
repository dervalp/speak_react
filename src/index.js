( function() {
  var isBrowser = ( typeof window !== 'undefined' ),
    sitecore = isBrowser && window.Sitecore ? window.Sitecore.Speak : requirejs( 'boot' );
  var React = window.React;
  var pageCodeStore = require('./stores/pageCodeStore');

  Sitecore.Speak.module( 'scReact', {
    actions: require( './actions/pageCodeActions' ),
    store: pageCodeStore
  } );

  Sitecore.Speak.presenter( {
    name: 'scReactPresenter',
    make: function( reactComponent, el, app, initial ) {

      var property = Sitecore.Speak.bindable( initial );

      pageCodeStore.addComponentToStore( property );

      React.renderComponent( reactComponent( property ), el );

      return property;
    }
  } );
} )();

