var should = require( 'should' );
var pageCodeActions = require( '../src/actions/pageCodeActions' );
var pageCodeDispatcher = require( '../src/dispatcher/pageCodeDispatcher' );
var pageCodeStore = require( '../src/stores/pageCodeStore' );

var fakeProperties = {
    id: 'test',
    __properties: { test : 'test' },
    on: function () {}
};

var fakeComponent = {
    props: {
        id: 'test'
    }
};

describe( 'Given a pageCodeActions', function() {
    afterEach( function() {
        pageCodeStore.flush();
    } );
    it( 'should be defined', function() {
        pageCodeActions.should.be.defined;
    } );
    it('changeProperty should be defined', function() {
        pageCodeActions.changeProperty.should.be.defined;
    } );
    describe( 'when I register a callback in the dispatcher', function() {
        it( 'and execute an action, callback should be called', function(){
            var testValue = 'testValue';

            pageCodeStore.addComponentToStore( fakeProperties );

            pageCodeActions.changeProperty( fakeComponent, 'test', testValue );

            fakeProperties.test.should.equal( testValue );
        } );
    } );
} );