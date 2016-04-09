class ReportsGrid extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderReport(report) {
    return (
      <div className="report" key={report.id}>
        <h6>{`${report.first_name} ${report.last_name}`}</h6>
        <p>{report.description}</p>
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
