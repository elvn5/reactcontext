const CHANGE_BUCKET = "CHANGE_BUCKET";

export const getItems = (dispatch) => {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');

  dispatch({ type: CHANGE_BUCKET, data: items });
  return { success: true, data: items };
};

export const addItem = (dispatch, item) => {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');

  items.push(item);
  localStorage.setItem('bucket', JSON.stringify(items));
  dispatch({ type: CHANGE_BUCKET, data: items });

  return { success: true, data: items };
};

export const incrementItem = (dispatch, id) => {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');

  items.find((i) => i._id === id).amount += 1;

  localStorage.setItem('bucket', JSON.stringify(items));
  dispatch({ type: CHANGE_BUCKET, data: items });

  return { success: true, data: items };
};

export const removeItem = (dispatch, id) => {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');

  const newItems = items.filter(item => item._id !== id);

  localStorage.setItem('bucket', JSON.stringify(newItems));
  dispatch({ type: CHANGE_BUCKET, data: newItems });

  return { success: true, data: items };
};

export const decrementItem = (dispatch, id) => {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');

  items.find((i, idx) => {
    if (i._id === id) {
      if (items[idx].amount == 1) {
        delete items[idx];
      } else {
        items[idx].amount -= 1;
      }
    }
  });

  localStorage.setItem('bucket', JSON.stringify(items.filter(Boolean)));
  dispatch({ type: CHANGE_BUCKET, data: items.filter(Boolean) });

  return { success: true, data: items.filter(Boolean) };
};
