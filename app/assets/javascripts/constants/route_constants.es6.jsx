class RouteConstants {

  get pages() {
    return {
      home: '/',
      search: '/search',
      submit: '/submit',
      submitSuccess: '/submit/success',
      subscribe: '/subscribe',
      subscribeSuccess: '/subscribe/success',
      navigation: '/navigation',
    };
  }

  get reports() {
    return {
      show: (id) => `/reports/${id}`,
    };
  }
}

window.RouteConstants = new RouteConstants();
