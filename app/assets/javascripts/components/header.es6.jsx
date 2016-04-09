class Header extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <a href="/">
            <div className="nav-logo-container">
              <img src="/assets/logo.jpg"/>
            </div>
          </a>
          <div className="nav-search-container"><SearchBar/></div>
          <ul className="nav-links">
            <li className="link"><a href="/search">Map</a></li>
            <li className="link"><a href="/notify">Notifications</a></li>
            <li className="link"><a href="/" className="btn btn--solid">New Report</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
