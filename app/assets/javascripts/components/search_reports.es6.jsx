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
          <ReportsGrid reports={this.props.reports} />
        </div>
      </div>
    );
  }
}
