class ReportPage extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      report: React.PropTypes.object.isRequired,
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    var mapURL = `https://www.google.com/maps/embed/v1/place?q=${this.props.report.latitude},${this.props.report.longitude}&zoom=13&key=AIzaSyALPMkFwJP8jUyMlIlsd-f1cv41Hb6Xepg`
    console.log(this.props.report)
    return (
      <div className="report-page">
        <Header />
        <div className="container report-container">
          <div className="col-md-5">
            <ul className="quick-facts-container">
              <div className={`severity-container severe-${this.props.report.severity}`}></div>
              <li className="fact">
                <div className="fact-title"><span className="fa fa-compass"></span>Location</div>
                <div className="fact-data">{this.props.report.location}</div>
              </li>
              <li className="fact">
                <div className="fact-title"><span className="fa fa-compass"></span>Location</div>
                <div className="fact-data">{this.props.report.location}</div>
              </li>
            </ul>
            <iframe className="report-map" src={mapURL}></iframe>
          </div>
          <div className="col-md-7">
            <h1 className="report-title">{this.props.report.title}</h1>
            <p className="report-description">{this.props.report.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
