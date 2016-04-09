class SuccessPage extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      content: React.PropTypes.string.isRequired,
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="success-page">
        <Header />
        <div className="container">
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
