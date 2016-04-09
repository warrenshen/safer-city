class ReportPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      category: '',
      lat: '',
      lng: '',
      name: '',
      phone_number: '',
      email: '',
    };
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  submitForm() {
    var attributes = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      category: this.state.category,
      lat: this.state.lat,
      lng: this.state.lng,
    };
    if (this.state.name != '') {
      attributes[name] = this.state.name
    }
    if (this.state.phone_number != '') {
      attributes[phone_number] = this.state.phone_number
    }
    if (this.state.email != '') {
      attributes[email] = this.state.email
    }
    var params = { subscription: attributes };
    Requester.post(
      ApiConstants.submissions.create,
      params,
      resolve,
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="report-page">
        <Header />
        <div className="container form-container">
          <h1 className="page-title">Submit a Report</h1>
          <p className="description">Help spread awareness and keep your neighborhood safe.</p>
          <form className="report-form">
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
            <label>Location</label>
            <div className="map-container">
              <input id="pac-input"
                     className="controls"
                     type="text"
                     placeholder="Search Box" />
              <div id="map" style={{height: "100"}}></div>
            </div>
            <h2 className="form-section-title">Optional</h2>
            <FormQuestion
              action={(event) => this.setState({ title: event.target.value })}
              label="Full Name"
              value={this.state.title}
              type="text" />
            <FormQuestion
              action={(event) => this.setState({ phone_number: event.target.value })}
              label="Phone number"
              value={this.state.phone_number}
              type="tel" />
            <FormQuestion
              action={(event) => this.setState({ email: event.target.value })}
              label="Email"
              value={this.state.email}
              type="email" />
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
