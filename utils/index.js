export * from './api';
export { default as useValidate } from './validation';

export const objectToQuery = params =>
  Object.keys(params).map(key => key + '=' + params[key]).join('&');

export const combineReducers = slices => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

export function debounce(func, time = 300) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(func.bind(this, ...args), time);
  }
}

export function calculatePrice(items, discountPercentage, userType = 'noncommercial') {
  const price = items.reduce((a, b) => a + b.price[userType] * b.amount, 0);
  const discount = Math.floor(price * discountPercentage);

  return { discount, total: price - discount, totalNoDiscount: price };
}

export const months = [
  "Январь", "Февраль", "Март",
  "Апрель", "Май", "Июнь", "Июль",
  "Август", "Сентябрь", "Октябрь",
  "Ноябрь", "Декабрь"
];

export const SOCIALS = {
  vk: "http://vk.com/share.php?",
  ok: "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=",
  fb: "http://www.facebook.com/sharer.php?u=",
  wp: "https://api.whatsapp.com/send?text=",
};

export const STATUSES = {
  accepted: 'Принят',
  delivered: 'Доставлен',
  declined: 'Отменен',
};
