class ApiConstants {

  get reports() {
    return {
      create: '/reports',
      recent: '/reports/recent',
      search: (lat, lng, limit) => {
        return `/reports?lat=${lat}&lng=${lng}&limit=${limit}`;
      },
    };
  }

  get categories() {
    return {
      search: (lat, lng) => {
        return `/categories?lat=${lat}&lng=${lng}`;
      },
    };
  }

  get subscriptions() {
    return {
      create: '/subscriptions',
    };
  }
}

window.ApiConstants = new ApiConstants();
