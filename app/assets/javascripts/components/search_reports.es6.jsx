class SearchReports extends React.Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static get propTypes() {
    return {
      reports: React.PropTypes.array.isRequired,
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  renderReport(report, index) {
    if (index < 25) {
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
  }

  renderReports() {
    return this.props.reports.map((report) => this.renderReport(report));
  }

  render() {
    return (
      <div className="search-reports-container">
        {this.renderReports()}
      </div>
    );
  }
}
