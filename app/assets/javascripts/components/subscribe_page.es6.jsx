class SubscribePage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      email: '',
      latitude: null,
      longitude: null,
      phone_number: '',
    };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      locationsCount: React.PropTypes.number.isRequired,
      notificationsCount: React.PropTypes.number.isRequired,
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
      latitude: this.state.lat,
      longitude: this.state.lng,
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
          <div className="subscribe-stats-container">
            <div className="stat">
              <h1>{this.props.locationsCount}</h1>
              <h3>Total distinct locations</h3>
            </div>
            <div className="stat">
              <h1>{this.props.notificationsCount}</h1>
              <h3>Total notifications</h3>
            </div>
          </div>
          <form className="notify-form">
            <label className="form-label">Location</label>
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
        <Footer />
      </div>
    );
  }
}
