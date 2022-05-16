import constants from './constants';
import {deleteRequest, get, modalsRequest, post, updateToken} from '../../utils';


export const getOtp = async (dispatch, data) => {
  dispatch({ type: constants.SEND_OTP, loading: true });

  try {
    const res = await post('/api/otp/sendSmsOtp', data);

    dispatch({ type: constants.SEND_OTP, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.SEND_OTP, error, loading: false });
    return { success: false, error };
  }
};

export const login = async (dispatch, data) => {
  dispatch({ type: constants.LOGIN, loading: true });

  try {
    const res = await post('/api/auth/login', data);

    window.localStorage.setItem('token', res.token);
    dispatch({ type: constants.LOGIN, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.LOGIN, error, loading: false });
    return { success: false, error };
  }
};

export const loginByToken = async dispatch => {
  dispatch({ type: constants.LOGIN, loading: true });

  try {
    const res = await updateToken();

    dispatch({ type: constants.LOGIN, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.LOGIN, error, loading: false });
    return { success: false, error }
  }
};

export const logout = async dispatch => {
  dispatch({ type: constants.LOGOUT, loading: true });

  const token = window.localStorage.getItem('token');

  try {
    await post('/api/auth/logout', { token });

    window.localStorage.removeItem('token');
    dispatch({ type: constants.LOGOUT, loading: false });
    return { success: true, data: {} };
  } catch (error) {

    dispatch({ type: constants.LOGOUT, error, loading: false });
    return { success: false, error };
  }
};

export const registration = async (dispatch, data) => {
  dispatch({ type: constants.REGISTRATION, loading: true });

  try {
    const res = await post('/api/user', data);

    window.localStorage.setItem('token', res.token);
    dispatch({ type: constants.REGISTRATION, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.REGISTRATION, error, loading: false });
    return { success: false, error };
  }
};

export const getUserById = async (dispatch, id) => {
  try {
    const res = await get(`/api/user/${id}`);

    return { success: true, data: res };
  } catch (error) {

    return { success: false, error };
  }
};


export const changeUserData = async (dispatch, { id, ...data }) => {
  dispatch({ type: constants.CHANGE_USER, loading: true });

  try {
    const res = await post(`/api/user/${id}`, data, { method: 'PATCH' });

    dispatch({ type: constants.CHANGE_USER, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.CHANGE_USER, error, loading: false });
    return { success: false, error };
  }
};

export const changeUserPhoto = async (dispatch, { id, formData }) => {
  dispatch({ type: constants.CHANGE_USER, loading: true });

  try {
    const res = await modalsRequest(`/api/user/${id}`, formData, true, 'PATCH');

    dispatch({ type: constants.CHANGE_USER, data: res.body, loading: false });
    return res;

  } catch (error) {
    dispatch({ type: constants.CHANGE_USER, loading: false, error });
    return { success: false, error };
  }
};

export const deleteUserPhoto = async (dispatch, id, filename) => {
  dispatch({ type: constants.CHANGE_USER, loading: true });
  try {
    const res = await deleteRequest(`/api/user/${id}/profile/photo/${filename}`)

    dispatch({ type: constants.CHANGE_USER, loading: false, data: res.data });
    return res;
  } catch (error) {
    dispatch({ success: false, error });

    return { success: false, error };
  }
};

export const getUserOrders = async (dispatch, id) => {
  dispatch({ type: constants.GET_USER_ORDERS, loading: true });

  try {
    const data = await get(`/api/order?buyer=${id}`);

    dispatch({ type: constants.GET_USER_ORDERS, data, loading: false });
    return { success: true, data };
  } catch (error) {

    dispatch({ type: constants.GET_USER_ORDERS, error, loading: false });
    return { success: false, error };
  }
};

export const createOrder = async (dispatch, data) => {
  dispatch({ type: constants.CREATE_ORDER, loading: true });

  try {
    const res = await post(`/api/order`, data);

    dispatch({ type: constants.CREATE_ORDER, data: res, loading: false });
    return { success: true, data: res };
  } catch (error) {

    dispatch({ type: constants.CREATE_ORDER, error, loading: false });
    return { success: false, error };
  }
};

export const sendNumber = async (data) => {
  try {
    const res = await post('/api/otp/sendSmsOtp', {
      ...data,
      sms_otp_type: 'UPDATE_PHONE',
    });

    return { success: true, sms_otp_id: res.sms_otp_id }
  } catch (error) {
    return { success: false, error }
  }
};

export const confirmNumber = async (data) => {
  try {
    const res = await post('/api/otp/confirmSmsOtp', data);

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
};

export const changeFavorite = async (dispatch, userId, productId, favorite) => {
  dispatch({ type: constants.CHANGE_FAVORITE });
  try {
    let newFavorite = [];

    if (favorite.includes(productId)) {
      newFavorite = favorite.filter(fav => fav !== productId);
    } else {
      newFavorite = [...favorite, productId];
    }

    const res = await post(`/api/user/${userId}`,
      { favorite_medicines: newFavorite },
      { method: 'PATCH' });

    dispatch({ type: constants.CHANGE_FAVORITE, data: res.favorite_medicines });
    return { success: true, data: res.data };

  } catch (error) {

    dispatch({ type: constants.CHANGE_FAVORITE, error, loading: false });
    return { success: false, error };
  }
};
