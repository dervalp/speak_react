var pageCodeConstant = require( '../src/constants/pageCodeConstant' );

describe( 'Given a pageCodeConstant', function() {
    it( 'should be defined', function() {
        pageCodeConstant.PROPERTY_CHANGE.should.be.defined;
    } );
} );