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
        <div className="container form-container success-container">
          <div className="fa fa-check-circle"></div>
          <p>{this.props.content}</p>
          <a href={RouteConstants.pages.home} className="btn">Back to Home</a>
        </div>
      </div>
    );
  }
}
