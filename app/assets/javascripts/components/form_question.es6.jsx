class FormQuestion extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      action: React.PropTypes.func.isRequired,
      error: React.PropTypes.string,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      error: '',
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.input);
    node.oninput = (event) => this.props.action(event);
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderError() {
    var error = this.props.error;
    if (error) {
      return (
        <h6 className="form-error">
          {error}
        </h6>
      );
    }
  }

  render() {
    return (
      <div className="form-question">
        <h6>{this.props.label}</h6>
        <input
          className="form-input"
          ref="input" />
        {this.renderError()}
      </div>
    );
  }
}
