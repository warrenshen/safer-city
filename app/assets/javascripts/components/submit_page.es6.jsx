class SubmitPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      category: '',
      date: '',
      description: '',
      lat: null,
      lng: null,
      location: '',
      time: '',
      title: '',
    };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      locationsCount: React.PropTypes.number.isRequired,
      reportsCount: React.PropTypes.number.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    Mapper.attachListener(
      (location, lat, lng) => this.syncAutocomplete(location, lat, lng),
      'form',
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      // category: this.state.category,
      date: this.state.date,
      description: this.state.description,
      latitude: this.state.lat,
      location: this.state.location,
      longitude: this.state.lng,
      time: this.state.time,
      title: this.state.title,
    };
    console.log(attributes);
    var params = { report: attributes };
    var resolve = (response) => window.location = RouteConstants.pages.submitSuccess;
    Requester.post(
      ApiConstants.reports.create,
      params,
      resolve,
    );
  }

  syncAutocomplete(location, lat, lng) {
    this.setState({ location: location, lat: lat, lng: lng });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="report-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Submit a report</h1>
          <p className="description">Help spread awareness and keep your neighborhood safe.</p>
          <div className="submit-stats-container">
            <div className="stat">
              <h1>{this.props.locationsCount}</h1>
              <h3>Total distinct locations</h3>
            </div>
            <div className="stat">
              <h1>{this.props.reportsCount}</h1>
              <h3>Total notifications</h3>
            </div>
          </div>
          <form className="report-form">
            <label className="form-label">Location</label>
            <div className="map-container">
              <input
                className="controls"
                id="pac-input"
                placeholder="Search" />
              <div id="map" style={{height: "512"}}></div>
            </div>
            <FormQuestion
              action={(event) => this.setState({ title: event.target.value })}
              label="Title"
              value={this.state.title}
              type="title" />
            <FormQuestion
              action={(event) => this.setState({ description: event.target.value })}
              label="Description"
              value={this.state.description}
              style="textarea"
              type="textarea" />
            <div className="row">
              <div className="col-md-6">
                <FormQuestion
                  action={(event) => this.setState({ date: event.target.value })}
                  label="Date"
                  value={this.state.date}
                  type="date" />
              </div>
              <div className="col-md-6">
                <FormQuestion
                  action={(event) => this.setState({ time: event.target.value })}
                  label="Time"
                  value={this.state.time}
                  type="time" />
              </div>
            </div>
            <FormQuestion
              action={(event) => this.setState({ category: event.target.value })}
              label="Category"
              value={this.state.category}
              type="select" />
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
