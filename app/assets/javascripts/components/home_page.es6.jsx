class HomePage extends React.Component {

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  generateReports() {
    return [
      {
        first_name: 'Kira',
        id: 1,
        last_name: 'Klapper',
        description: 'A silly little doge.',
      },
    ];
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="home-page">
        <Header />
        <div className="home-grid">
          <SearchBar />
          <ReportsGrid
            reports={this.generateReports()} />
        </div>
      </div>
    );
  }
}
