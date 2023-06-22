export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
import { combineReducers, createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'


const initial_state = {
    count: 0
};

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

const Counter = (state = initial_state, action) => {
    // console.log("action ", action)
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };

        default: {
            return state
        }
    }
};

export const rootReducer = combineReducers({
    Counter,
})


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let reduxStore = createStore(persistedReducer)
    let persister = persistStore(reduxStore)
    return { reduxStore, persister }
}

