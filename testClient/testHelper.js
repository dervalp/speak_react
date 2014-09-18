var TestHelper = {
  buildBindFunction: function () {
    Function.prototype.bind = Function.prototype.bind || function ( thisp ) {
      var fn = this;
      return function () {
        return fn.apply( thisp, arguments );
      };
    };
  },
  setup: function () {
    this.buildBindFunction();
  },
  triggerClickForEl: function ( el ) {
    var ev = document.createEvent( "MouseEvent" );
    ev.initMouseEvent(
      "click",
      true /* bubble */ , true /* cancelable */ ,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/ , null
    );
    el.dispatchEvent( ev );
  },
  triggerMouseOverForEl: function ( el ) {
    var ev = document.createEvent( "MouseEvent" );
    ev.initMouseEvent(
      "mouseover",
      true /* bubble */ , true /* cancelable */ ,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/ , null
    );
    el.dispatchEvent( ev );
  }
};