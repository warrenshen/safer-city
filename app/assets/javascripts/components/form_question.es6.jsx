class FormQuestion extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      action: React.PropTypes.func.isRequired,
      error:  React.PropTypes.string,
      label:  React.PropTypes.string.isRequired,
      style:  React.PropTypes.oneOf(['input', 'textarea']).isRequired,
      type:   React.PropTypes.string.isRequired,
      value:  React.PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      error: '',
      style: 'input',
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

  renderPrompt() {
    if (this.props.style === 'input') {
      return (
        <input
          className="form-input"
          ref="input"
          type={`${this.props.type}`} />
      );
    } else if (this.props.style === 'textarea') {
      return (
        <textarea
          className="form-input"
          ref="input"
          type={`${this.props.type}`} />
      );
    }
  }

  render() {
    return (
      <div className="form-question">
        <label>{this.props.label}</label>
        {this.renderPrompt()}
        {this.renderError()}
      </div>
    );
  }
}
