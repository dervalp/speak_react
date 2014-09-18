var ReactPropTypes = React.PropTypes;

var Text = React.createClass( {
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
      <input
        id='testComponent'
        onChange={this._onChange}
        value={this.state.Test}
      />
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