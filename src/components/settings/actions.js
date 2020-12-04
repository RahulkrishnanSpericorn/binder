import * as actionTypes from "./constants";
import * as Service from "./services";

const getConsultancyDropdown = () => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_CONSULTANCY_DROPDOWN_REQUEST });
            const res = await Service.getConsultancyDropdown();
            console.log("Consultancydropres", res);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_CONSULTANCY_DROPDOWN_SUCCESS, response: res });
                } else {
                    dispatch({ type: actionTypes.GET_CONSULTANCY_DROPDOWN_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_CONSULTANCY_DROPDOWN_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_CONSULTANCY_DROPDOWN_FAILURE, error: e.response && e.response.data });
        }
    };
};

const getClientDropdown = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_CLIENTS_DROPDOWN_REQUEST });
            console.log("params", params);
            const res = await Service.getClientDropdown(params);
            console.log("Clientdropres", res);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_CLIENTS_DROPDOWN_SUCCESS, response: res });
                } else {
                    dispatch({ type: actionTypes.GET_CLIENTS_DROPDOWN_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_CLIENTS_DROPDOWN_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_CLIENTS_DROPDOWN_FAILURE, error: e.response && e.response.data });
        }
    };
};

const getRegionDropdown = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_REGION_DROPDOWN_REQUEST });
            console.log("params", params);
            const res = await Service.getRegionDropdown(params);
            console.log("Regiondropres", res);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_REGION_DROPDOWN_SUCCESS, response: res });
                } else {
                    dispatch({ type: actionTypes.GET_REGION_DROPDOWN_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_REGION_DROPDOWN_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_REGION_DROPDOWN_FAILURE, error: e.response && e.response.data });
        }
    };
};

const getSitesDropdown = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_SITES_DROPDOWN_REQUEST });
            console.log("params", params);
            const res = await Service.getSitesDropdown(params);
            console.log("Sitesdropres", res);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_SITES_DROPDOWN_SUCCESS, response: res });
                } else {
                    dispatch({ type: actionTypes.GET_SITES_DROPDOWN_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_SITES_DROPDOWN_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_SITES_DROPDOWN_FAILURE, error: e.response && e.response.data });
        }
    };
};

const getBinderDropdown = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_BINDER_DROPDOWN_REQUEST });
            const res = await Service.getBinderDropdown(params);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_BINDER_DROPDOWN_SUCCESS, response: res });
                } else {
                    dispatch({ type: actionTypes.GET_BINDER_DROPDOWN_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_BINDER_DROPDOWN_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_BINDER_DROPDOWN_FAILURE, error: e.response && e.response.data });
        }
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getConsultancyDropdown,
    getClientDropdown,
    getRegionDropdown,
    getSitesDropdown,
    getBinderDropdown
};
