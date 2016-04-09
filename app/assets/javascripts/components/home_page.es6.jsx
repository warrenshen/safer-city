class HomePage extends React.Component {

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  generateReports() {

  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="home-page">
        <div className="home-grid">
          <SearchBar />
          <ReportsGrid
            reports={this.generateReports()} />
        </div>
      </div>
    );
  }
}
