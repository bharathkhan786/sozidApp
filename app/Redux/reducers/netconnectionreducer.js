import * as Type from '../actions';
const NetConnectionVal = '';

const netconnectionreducer = (state = NetConnectionVal, action) => {
    switch (action.type) {
        case Type.LOAD_NETCONNECTION_SUCCESS:
            return action.NetConnectionVal;
        default:
            return state;
    }
};

export default netconnectionreducer;
