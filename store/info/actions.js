import constants from './constants';
import { get, objectToQuery } from '../../utils';


export const getBanners = async (dispatch, params = {}) => {
  dispatch({ type: constants.GET_BANNERS, loading: true });

  try {
    const data = await get(`/api/banner?${objectToQuery(params)}`);

    dispatch({ type: constants.GET_BANNERS, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_BANNERS, error, loading: false });
    return { success: false, error };
  }
};

export const getFaq = async dispatch => {
  dispatch({ type: constants.GET_FAQ, loading: true });

  try {
    const data = await get('/api/faq');

    dispatch({ type: constants.GET_FAQ, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_FAQ, error, loading: false });
    return { success: false, error };
  }
};

export const getAbout = async dispatch => {
  dispatch({ type: constants.GET_ABOUT, loading: true });

  try {
    const data = await get('/api/about');

    dispatch({ type: constants.GET_ABOUT, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_ABOUT, error, loading: false });
    return { success: false, error };
  }
};

export const getContacts = async dispatch => {
  dispatch({ type: constants.GET_CONTACTS, loading: true });

  try {
    const data = await get('/api/contact');

    dispatch({ type: constants.GET_CONTACTS, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_CONTACTS, error, loading: false });
    return { success: false, error };
  }
};

export const getPharmacy = async (dispatch, params = {}) => {
  dispatch({ type: constants.GET_PHARMACY, loading: true });

  try {
    const data = await get(`/api/pharmacy?${objectToQuery(params)}`);

    dispatch({ type: constants.GET_PHARMACY, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_PHARMACY, error, loading: false });
    return { success: false, error };
  }
};

export const getPharmacyById = async (dispatch, id) => {
  try {
    const data = await get(`/api/pharmacy/${id}`);

    return { success: true, data };
  } catch (error) {

    return { success: false, error };
  }
};

export const getNews = async (dispatch, params = {}) => {
  dispatch({ type: constants.GET_NEWS, loading: true });

  try {
    const data = await get(`/api/news?${objectToQuery(params)}`);

    dispatch({ type: constants.GET_NEWS, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_NEWS, error, loading: false });
    return { success: false, error };
  }
};

export const getNewsById = async (dispatch, id) => {
  try {
    const data = await get(`/api/news/${id}`);

    return { success: true, data };
  } catch (error) {

    return { success: false, error };
  }
};
