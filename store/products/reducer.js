import constants from "./constants";


function products(state, { type, ...res }) {

  switch (type) {
    case constants.GET_PRODUCTS:
      return Object.assign(state, {
        all: res,
      });
    case constants.GET_SALES_PRODUCTS:
      return Object.assign(state, {
        sales: res,
      });
    case constants.GET_TOP_PRODUCTS:
      return Object.assign(state, {
        top: res,
      });
    case constants.GET_CATALOG_PRODUCTS:
      return Object.assign(state, {
        catalog: {
          data: res.data || state.catalog.data || [],
          ...res,
        },
      });
    case constants.GET_SEARCH_SUGGESTIONS:
      return Object.assign(state, {
        searchSuggestions: {
          data: res.data || state.searchSuggestions.data,
          ...res,
        },
      });
    default:
      return state;
  }
}

export default products;
