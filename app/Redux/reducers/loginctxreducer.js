import * as Type from '../actions';
const loginctx = {}

const loginctxreducer = (state = loginctx, action) => {
    switch (action.type) {
        case Type.LOAD_LOGINCTX_SUCCESS:
            // state.navigator.dispatch(NavigationActions.back());
            return action.loginctx;
        default:
            return state;
    }
};

export default loginctxreducer;