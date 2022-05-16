import constants from "./constants";


function user(state, { type, ...res }) {

  switch (type) {
    case constants.SEND_OTP:
      return Object.assign(state, {
        otp: res,
      });
    case constants.LOGIN:
      return Object.assign(state, {
        isLoggedIn: !res.error,
        info: res,
      });
    case constants.LOGOUT:
      return {
        isLoggedIn: false,
        orders: {},
        otp: {},
        info: {
          loading: res.loading,
        },
      };
    case constants.REGISTRATION:
      return Object.assign(state, {
        isLoggedIn: true,
        info: res,
      });
    case constants.CHANGE_USER:
      return Object.assign(state, {
        info: res.data ? res : state.info,
      });
    case constants.GET_USER_ORDERS:
      return Object.assign(state, {
        orders: Object.assign(state.orders, res),
      });
    case constants.CREATE_ORDER:
      return Object.assign(state, {
        orders: {
          ...res,
          data: state.data.orders?.concat(res.data) || res.data,
        },
      });
    case constants.CHANGE_FAVORITE:
      return Object.assign(state, {
        info: {
          data: Object.assign(state.info.data, {
            favorite_medicines: res.data || state.info.data?.favorite_medicines,
          }),
          ...state.info,
        },
      });

    default:
      return state;
  }
}

export default user;
