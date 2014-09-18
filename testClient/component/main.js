( function ( global ) {
  require( [ "sitecore" ], function ( sitecore ) {
    sitecore.init( function () {
      if ( window.mochaPhantomJS ) {
        window.mochaPhantomJS.run();
      } else {
        mocha.run();
      }
    } );
  } );
} )( this );