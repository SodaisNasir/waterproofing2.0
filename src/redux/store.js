import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartItemsReducer from './CartItem';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(cartItemsReducer, composedEnhancer);
export default store;
