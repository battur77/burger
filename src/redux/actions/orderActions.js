import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    // захиалгыг татаж эхлэлээ гэдгийг мэдэгдэнэ
    // энийг хүлээж аваад spinner ажиллаж эхлэнэ
    dispatch(loadOrdersStart());

    const token = getState().signupReducer.token;

    axios
      .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((reponse) => {
        const loadedOrders = Object.entries(reponse.data).reverse();
        dispatch(loadOrdersSuccess(loadedOrders));
      })
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};

export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

// захиалгыг хадгалах хэсэг

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    //spinner гарч ирнэ
    dispatch(saveOrderStart());

    const token = getState().signupReducer.token;

    // Firebase-т хадгалана

    axios
      .post(`orders.json?auth=${token}`, newOrder)
      .then((reponse) => {
        dispatch(saveOrderSuccess());
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};
export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    errorMessage: error,
  };
};
