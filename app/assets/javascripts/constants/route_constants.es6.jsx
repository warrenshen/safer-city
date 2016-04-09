class RouteConstants {

  get pages() {
    return {
      home: '/',
      search: '/search',
      notify: '/notify',
    };
  }
}

window.RouteConstants = new RouteConstants();
