class Clickable extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      action: React.PropTypes.func,
      children: React.PropTypes.node,
      content: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ]),
      className: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string,
      route: React.PropTypes.string,
      type: React.PropTypes.oneOf([
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'i',
        'none',
        'p',
      ]).isRequired,
    };
  }

  static get defaultProps() {
    return {
      action: null,
      children: null,
      content: '',
      icon: '',
      route: '',
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.container);
    node.onclick = (event) => this.handleClick(event);
  }

  // --------------------------------------------------
  // Handlers
  // --------------------------------------------------
  handleClick(event) {
    event.stopPropagation();
    var props = this.props;
    if (props.route === '' && props.action !== null) {
      event.preventDefault();
      props.action(event);
    }
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
  }

  renderContent() {
    var content = this.props.content;
    var icon = this.props.icon;
    if (content || icon) {
      switch (this.props.type) {
        case 'h1':
          return <h1>{content}</h1>;
        case 'h2':
          return <h2>{content}</h2>;
        case 'h3':
          return <h3>{content}</h3>;
        case 'h4':
          return <h4>{content}</h4>;
        case 'h5':
          return <h5>{content}</h5>;
        case 'h6':
          return <h6>{content}</h6>;
        case 'i':
          return <i className={icon} />;
        case 'p':
          return <p>{content}</p>;
      }
    }
  }

  render() {
    var props = this.props;
    if (props.type === 'i') {
      return (
        <a
          className={props.className}
          href={props.route}
          ref="container">
          {this.renderChildren()}
          {this.renderContent()}
        </a>
      );
    } else if (props.type === 'div') {
      return (
        <a
          className={props.className}
          href={props.route}
          ref="container">
          {this.renderChildren()}
        </a>
      );
    } else if (props.type === 'none') {
      return (
        <a
          className={props.className}
          href={props.route}
          ref="container">
          {props.content}
        </a>
      );
    } else {
      return (
        <a
          className={props.className}
          href={props.route}
          ref="container">
          {this.renderContent()}
        </a>
      );
    }
  }
}
