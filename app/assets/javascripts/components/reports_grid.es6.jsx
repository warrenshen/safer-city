class ReportsGrid extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderReport(report) {
    var d = new Date(report.datetime);
    var day = d.toDateString();
    var time = d.toTimeString().split(' ')[0];
    return (
      <Clickable
        className="report"
        key={report.id}
        route={RouteConstants.reports.show(report.id)}
        type="div">
        <div className={`severity severity-${report.severity}`}>
          <span className="fa fa-circle"></span>
        </div>
        <p>{day}</p>
        <p>{time}</p>
        <h1 className="title">{`${report.title}`}</h1>
        <p className="description">{report.description}</p>
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
