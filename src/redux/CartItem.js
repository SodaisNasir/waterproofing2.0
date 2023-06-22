// common states

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const IS_SIGN_IN = 'IS_SIGN_IN';
export const VERIFY_EMAIL = 'VERIFY_EMAIL';
export const IS_LOADING = 'IS_LOADING';

// user management

export const USER_DETAILS = 'USER_DETAILS';
export const USER_ID = 'USER_ID';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_ALL_LEAD = 'GET_ALL_LEAD';
export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';

// add lead

export const LEAD_GENERATE = 'LEAD_GENERATE';
export const UPDATE_LEAD = 'UPDATE_LEAD';
export const GET_IMAGES = 'GET_IMAGES';
export const GET_VIDEOS = 'GET_VIDEOS';
export const DELETE_IMAGES = 'DELETE_IMAGES';
export const DELETE_VIDEOS = 'DELETE_VIDEOS';
export const FILTER_VIDEOS = 'FILTER_VIDEOS';
export const FILTER_IMAGES = 'FILTER_IMAGES';

export const NOTIFICATION_TOKEN = 'NOTIFICATION_TOKEN';
export const OTP_SEND = 'OTP_SEND';
export const SLIDER_DATA = 'SLIDER_DATA';
export const RANDOM_NUMBER = 'RANDOM_NUMBER';

const initial_state = {
  user: {},
  allUsers: [],
  all_data: {},
  is_sign_in: false,
  verify_email: {},
  is_loading: false,
  otp: '',
  // user data

  user_details: {},
  user_id: null,

  update_password: {},

  lead_generate: {},
  lead_update: {},
  change_password: {},
  update_profile: {},
  get_lead: [],
  get_dashboard_data: {},
  images: [],
  videos: [],
  notification_token: '',
  slider_data: [],
  number_updates:null
};

const cartItemsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      return state.filter(cartItem => cartItem.id !== action.payload.id);

    case IS_SIGN_IN:
      return {is_sign_in: action.payload};

    case IS_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      };

    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case OTP_SEND:
      return {
        ...state,
        otp: action.payload,
      };

    case USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };

    case VERIFY_EMAIL:
      return {
        ...state,
        verify_email: action.payload,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        update_password: action.payload,
      };

    case LEAD_GENERATE:
      return {
        ...state,
        lead_generate: action.payload,
      };

    case UPDATE_LEAD:
      return {
        ...state,
        lead_update: action.payload,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        change_password: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        update_profile: action.payload,
      };
    case GET_ALL_LEAD:
      return {
        ...state,
        get_lead: action.payload,
      };
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        get_dashboard_data: action.payload,
      };
    case GET_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case DELETE_IMAGES:
      return {
        ...state,
        images: [],
      };
    case GET_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
      };
    case DELETE_VIDEOS:
      return {
        ...state,
        videos: [],
      };
    case FILTER_VIDEOS:
      return {
        ...state,
        videos: state.videos.filter(
          (item, index) => item.fileName != action.payload,
        ),
      };
    case FILTER_IMAGES:
      return {
        ...state,
        images: state.images.filter(
          (item, index) => item.fileName != action.payload,
        ),
      };
    case NOTIFICATION_TOKEN:
      return {
        ...state,
        notification_token: action.payload,
      };
    case SLIDER_DATA:
      return {
        ...state,
        slider_data: action.payload,
      };
    case RANDOM_NUMBER:
      return {
        ...state,
        number_updates: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default cartItemsReducer;
