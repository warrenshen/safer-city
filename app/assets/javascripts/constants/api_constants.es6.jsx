class ApiConstants {

  get reports() {
    return {
      create: '/reports',
      recent: '/reports/recent',
      search: (lat, lng, limit) => {
        return `/reports?lat=${lat}&lng=${lng}&limit=150`;
      },
      show: (id) => `/reports/${id}`,
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

  get timeStats() {
    return {
      search: (lat, lng) => {
        return `/reports/time_stats?lat=${lat}&lng=${lng}`;
      },
    };
  }
}

window.ApiConstants = new ApiConstants();
