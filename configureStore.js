import { createStore, combineReducers } from 'redux';
import UserInforReducer from './src/Redux/Reducer/UserInforReducer';
const rootReducer = combineReducers({
    UserInforReducer,
});
const configureStore = () => {
    return createStore(rootReducer);
    }
export default configureStore;

