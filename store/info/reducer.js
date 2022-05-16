import constants from "./constants";


function info(state, { type, ...res }) {

  switch (type) {
    case constants.GET_BANNERS:
      return Object.assign(state, {
        banners: Object.assign(state.banners, res),
      });
    case constants.GET_FAQ:
      return Object.assign(state, {
        faq: Object.assign(state.faq, res),
      });
    case constants.GET_ABOUT:
      return Object.assign(state, {
        about: Object.assign(state.about, res),
      });
    case constants.GET_CONTACTS:
      return Object.assign(state, {
        contacts: Object.assign(state.contacts, res),
      });
    case constants.GET_PHARMACY:
      return Object.assign(state, {
        pharmacy: Object.assign(state.pharmacy, res),
      });
    case constants.GET_NEWS:
      return Object.assign(state, {
        news: Object.assign(state.news, res),
      });

    default:
      return state;
  }
}

export default info;
