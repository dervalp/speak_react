var SpeakTestFramework = {
  setup: function () {
    TestHelper.setup();
    window.spy = sinon.spy();
    window.__speak_config = {
      deferred: true,
      template: Handlebars,
      debug: true
    };
    mocha.ui( 'bdd' );
    mocha.reporter( 'html' );
    var should = chai.should();
  }
};
