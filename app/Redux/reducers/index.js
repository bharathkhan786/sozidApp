import { combineReducers } from 'redux';
import routes from './routes';
import loginctx from './loginctxreducer';
import NetConnectionVal from './netconnectionreducer';

const rootReducer = combineReducers({
  routes,
  loginctx,
  NetConnectionVal
});

export default rootReducer;