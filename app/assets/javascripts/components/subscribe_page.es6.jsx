class SubscribePage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      email: '',
      lat: null,
      lng: null,
      phone_number: '',
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    Mapper.attachListener(
      (lat, lng) => this.syncAutocomplete(lat, lng),
      'form',
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      email: this.state.email,
      lat: this.state.lat,
      lng: this.state.lng,
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

  syncAutocomplete(lat, lng) {
    this.setState({ lat: lat, lng: lng });
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
            <div className="map-container">
              <input
                className="controls"
                id="pac-input"
                placeholder="Search" />
              <div id="map" style={{height: "512"}}></div>
            </div>
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Email"
              type="email"
              value={this.state.email} />
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Phone Number"
              type="tel"
              value={this.state.phone_number} />
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
