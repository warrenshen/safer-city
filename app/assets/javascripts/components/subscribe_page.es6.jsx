class SubscribePage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      email: '',
      phone_number: '',
    };
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      email: this.state.email,
      phone_number: this.state.phone_number,
    };
    var params = { subscription: attributes };
    var resolve = (response) => window.location = RouteConstants.pages.subscribeSuccess;
    Requester.post(
      ApiConstants.subscriptions.create,
      params,
      resolve,
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="notify-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Subscribe</h1>
          <p className="description">Receive a notification whenever there is a report near your location.</p>
          <form className="notify-form">
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Email"
              value={this.state.email}
              type="email" />
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Phone Number"
              value={this.state.phone_number}
              type="tel" />
            <Clickable
              action={() => this.submitForm()}
              className="btn--solid submit-btn"
              content="Submit"
              type="none" />
          </form>
        </div>
      </div>
    );
  }
}
