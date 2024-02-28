import { SHOP_CART } from "../utils/constant";

const initState = {
  listCartItem: [],
  dataVoucher: {},
  dataTypeShip: {},
};

const shopCartReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOP_CART.ADD_ITEM_CART_SUCCESS: {
      return {
        ...state,
      };
    }
    case SHOP_CART.ADD_ITEM_CART_FAILD: {
      return {
        ...state,
      };
    }
    case SHOP_CART.GET_ITEM_CART_SUCCESS: {
      return {
        ...state,
        listCartItem: action.data,
      };
    }
    case SHOP_CART.GET_ITEM_CART_FAILD: {
      return {
        ...state,
        listCartItem: [],
      };
    }
    case SHOP_CART.CHOOSE_VOUCHER_START: {
      return {
        ...state,
        dataVoucher: action.data,
      };
    }
    case SHOP_CART.CHOOSE_TYPESHIP_START: {
      return {
        ...state,
        dataTypeShip: action.data,
      };
    }
    default:
      return state;
  }
};

export default shopCartReducer;
