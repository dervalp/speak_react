(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var ReactPropTypes = React.PropTypes;

var Text = React.createClass( {displayName: 'Text',
  propTypes: {
    value: ReactPropTypes.string
  },

  componentDidMount: function() {
    Sitecore.Speak.module( 'scReact' ).store.addChangeListener( this._sync );
  },

  componentWillUnmount: function() {
    Sitecore.Speak.module( 'scReact' ).store.removeChangeListener( this._sync );
  },

  getInitialState: function() {
    return Sitecore.Speak.module( 'scReact' ).store.getComponentProperties( this.props );
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      React.DOM.input({
        id: "testComponent", 
        onChange: this._onChange, 
        value: this.state.Test}
      )
    );
  },
  /**
   * @param {object} event
   */
  _onChange: function(event) {
    this.setState( {
      Test: event.target.value
    } );
    Sitecore.Speak.module( 'scReact' ).actions.changeProperty( this, 'Test', event.target.value );
  },

  _sync: function ( change ) {
    this.setState( change );
  }
});

Sitecore.Speak.component( Text, 'text' );
},{}]},{},[1]);
