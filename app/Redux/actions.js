export const NAVIGATE_TO = 'NAVIGATE_TO';
export const GO_BACK = 'GO_BACK';
export const SET_NAVIGATOR = 'SET_NAVIGATOR';
export const SET_ACTIVE_ROUTE = 'SET_ACTIVE_ROUTE';

export const LOAD_LOGINCTX_SUCCESS = 'LOAD_LOGINCTX_SUCCESS';
export const LOAD_NETCONNECTION_SUCCESS = 'LOAD_NETCONNECTION_SUCCESS';

export const navigateTo = routeName => ({
  type: NAVIGATE_TO,
  routeName,
});

export const goBack = () => ({
  type: GO_BACK,
});

export const setNavigator = navigator => ({
  type: SET_NAVIGATOR,
  navigator,
});

export const setActiveRoute = activeRouteName => ({
  type: SET_ACTIVE_ROUTE,
  activeRouteName,
});

export const LoadLoginctxSuccess = loginctx => ({
  type: LOAD_LOGINCTX_SUCCESS,
  loginctx,
});

export const LoadNetConnectionSuccess = NetConnectionVal => ({
  type: LOAD_NETCONNECTION_SUCCESS,
  NetConnectionVal,
});

