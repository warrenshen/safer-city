class Header extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="header">
        <Clickable
          content="Search"
          className="header-jewel"
          route={RouteConstants.pages.search} />
      </div>
    );
  }
}
