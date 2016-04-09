class Header extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <a href={RouteConstants.pages.home}>
            <div className="nav-logo-container">
              <img src="/assets/logo.jpg"/>
            </div>
          </a>
          <ul className="nav-links">
            <li className="link">
              <Clickable
                content="Search"
                route={RouteConstants.pages.search}
                type="none" />
            </li>
            <li className="link">
              <Clickable
                content="Subscribe"
                route={RouteConstants.pages.subscribe}
                type="none" />
            </li>
            <li className="link">
              <Clickable
                className="btn btn--solid"
                content="New Report"
                route={RouteConstants.pages.report}
                type="none" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
