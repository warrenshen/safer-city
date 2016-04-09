class ReportsGrid extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderReport(report) {
    var d = new Date(report.datetime);
    var day = d.toDateString().substring(3);
    var time = d.toTimeString().split(' ')[0].substring(0, 5);
    return (
      <Clickable
        className="report"
        key={report.id}
        route={RouteConstants.reports.show(report.id)}
        type="div">
        <div className={`severity severity-${report.severity}`}>
          <span className="fa fa-circle"></span>
        </div>
        <p className="time-label">{day} at {time}</p>
        <h1 className="title">{`${report.title}`}</h1>
        <p className="description">{report.description}</p>
        <p className="location-label"><span className="fa fa-map-marker"></span>{report.location}</p>
      </Clickable>
    );
  }

  renderReports() {
    return this.props.reports.map((report) => this.renderReport(report));
  }

  render() {
    return (
      <div className="reports-grid">
        {this.renderReports()}
      </div>
    );
  }
}
