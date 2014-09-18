describe( "Given a Page with on simple react component", function() {

    it( "app should be defined", function() {
      Sitecore.Speak.app.should.exist;
    } );

    it( "component should exist", function() {
      Sitecore.Speak.app.Text1.should.exist;
    } );

    it( "when I change the property, it should change the input exist", function() {
      var testValue = "testValue";

      Sitecore.Speak.app.Text1.Test = testValue;

      var comp = document.getElementById("testComponent");

      comp.value.should.equal(testValue);
    } );
} );