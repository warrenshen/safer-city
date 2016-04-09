class ReportPage extends React.Component {

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { report: {} };
  }

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      id: React.PropTypes.number.isRequired,
    };
  }

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------
  componentDidMount() {
    var resolve = (response) => this.setState({ report: response.report });
    Requester.get(
      ApiConstants.reports.show(this.props.id),
      resolve,
    );
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    if (this.state.report.latitude) {
      var mapURL = `https://www.google.com/maps/embed/v1/place?q=${this.state.report.latitude},${this.state.report.longitude}&zoom=13&key=AIzaSyALPMkFwJP8jUyMlIlsd-f1cv41Hb6Xepg`;
      var d = new Date(this.state.report.datetime);

      var day = d.toDateString();
      var time = d.toTimeString().split(' ')[0];
    }

    return (
      <div className="report-page">
        <Header />
        <div className="container report-container">
          <iframe className="report-map" src={mapURL}></iframe>
          <div className="col-md-5">
            <ul className="quick-facts-container">
              <div className={`severity-container severity-${this.state.report.severity}`}></div>
              <li className="fact">
                <div className={`fact-title title-${this.state.report.severity}`}><span className="fa fa-calendar"></span>Day</div>
                <div className="fact-data">{day}</div>
              </li>
              <li className="fact">
                <div className={`fact-title title-${this.state.report.severity}`}><span className="fa fa-clock-o"></span>Time</div>
                <div className="fact-data">{time}</div>
              </li>
              <li className="fact">
                <div className={`fact-title title-${this.state.report.severity}`}><span className="fa fa-compass"></span>Location</div>
                <div className="fact-data">{this.state.report.location}</div>
              </li>
            </ul>
          </div>
          <div className="col-md-7">
            <h1 className="report-title">{this.state.report.title}</h1>
            <p className="report-description">{this.state.report.description}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
