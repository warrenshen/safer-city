class RouteConstants {

  get pages() {
    return {
      home: '/',
      report: '/report',
      search: '/search',
      subscribe: '/subscribe',
      subscribeSuccess: '/subscribe/success',
    };
  }
}

window.RouteConstants = new RouteConstants();
