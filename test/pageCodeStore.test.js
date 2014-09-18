var should = require( 'should' );
var pageCodeStore = require( '../src/stores/pageCodeStore' );
var noop = function () {};
var sinon = require( 'sinon' );

describe( 'Given a pageCodeStore', function() {
    afterEach( function(){
        pageCodeStore.flush();
    } );
    it( 'should be defined', function() {
        pageCodeStore.should.be.defined;
    } );
    it( 'should have getComponentProperties', function() {
        pageCodeStore.getComponentProperties.should.be.defined;
    } );
    it( 'should have addComponentToStore', function() {
        pageCodeStore.addComponentToStore.should.be.defined;
    } );
    it( 'should have emitChange', function() {
        pageCodeStore.emitChange.should.be.defined;
    } );
    it( 'should have addChangeListener', function() {
        pageCodeStore.addChangeListener.should.be.defined;
    } );
    it('should have removeChangeListener', function() {
        pageCodeStore.removeChangeListener.should.be.defined;
    } );
    describe( 'when I want to getComponentProperties', function() {
        it( 'should throw error when no component has been added', function() {
            ( function() {
                pageCodeStore.getComponentProperties();
            } ).should.throw();
        } );
        it( 'should throw error when no component has been added', function() {
            ( function(){
                pageCodeStore.getComponentProperties( { id: 'test' } );
            } ).should.throw();
        } );
    } );
    describe( 'when I want to addComponentToStore', function() {
        it( 'should be able to retrieve it after', function() {
            var properties = { test : true },
                callback = sinon.spy();

            pageCodeStore.addComponentToStore( {
                id: 'test',
                __properties: properties,
                on: callback
            } );

            var initialProperties = pageCodeStore.getComponentProperties( { id: 'test' } );

            initialProperties.should.equal( properties );
            callback.called.should.be.true;
        } );
    } );
} );