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
              <img src="http://dev.safecity.in/wp-content/uploads/2015/02/safecity_logo_new.jpg"/>
            </div>
          </a>
          <div className="nav-search-container"><SearchBar/></div>
          <ul className="nav-links">
            <li className="link"><a href="/">Map</a></li>
            <li className="link"><a href="/notify">Notifications</a></li>
            <li className="link"><a href="/" className="btn btn--solid">New Report</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
