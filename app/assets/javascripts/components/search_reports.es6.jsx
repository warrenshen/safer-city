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
    return this.props.reports.map((report, index) => this.renderReport(report, index));
  }

  render() {
    let title;
    if (this.props.reports.length > 0) {
      title = <h2 className="category-title">Recent Reports</h2>
    } else {
      title = false;
    }
    return (
      <div>
        {title}
        <div className="search-reports-container">
          {this.renderReports()}
        </div>
      </div>
    );
  }
}
