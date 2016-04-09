class ReportsGrid extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderReport(report) {
    return (
      <div className="report" key={report.id}>
        <div className={`severity severity-${report.severity}`}>
          <span className="fa fa-circle"></span>
        </div>
        <h1 className="title">{`${report.title}`}</h1>
        <p className="description">{report.description}</p>
      </div>
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
