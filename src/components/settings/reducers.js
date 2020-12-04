import * as actionTypes from "./constants";

const initialState = {
    consultancyDropdownData: {},
    clientDropdownData: {},
    regionDropdownData: {},
    siteDropdownData: {},
    binderDropdownData: {}
};

const conmmonRedRes = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CONSULTANCY_DROPDOWN_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_CONSULTANCY_DROPDOWN_SUCCESS:
            return {
                ...state,
                consultancyDropdownData: { success: true, ...action.response }
            };
        case actionTypes.GET_CONSULTANCY_DROPDOWN_FAILURE:
            return {
                ...state,
                consultancyDropdownData: { success: false, ...action.error }
            };

        case actionTypes.GET_CLIENTS_DROPDOWN_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_CLIENTS_DROPDOWN_SUCCESS:
            return {
                ...state,
                clientDropdownData: { success: true, ...action.response }
            };
        case actionTypes.GET_CLIENTS_DROPDOWN_FAILURE:
            return {
                ...state,
                clientDropdownData: { success: false, ...action.error }
            };

        case actionTypes.GET_REGION_DROPDOWN_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_REGION_DROPDOWN_SUCCESS:
            return {
                ...state,
                regionDropdownData: { success: true, ...action.response }
            };
        case actionTypes.GET_REGION_DROPDOWN_FAILURE:
            return {
                ...state,
                regionDropdownData: { success: false, ...action.error }
            };

        case actionTypes.GET_SITES_DROPDOWN_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_SITES_DROPDOWN_SUCCESS:
            return {
                ...state,
                siteDropdownData: { success: true, ...action.response }
            };
        case actionTypes.GET_SITES_DROPDOWN_FAILURE:
            return {
                ...state,
                siteDropdownData: { success: false, ...action.error }
            };

        case actionTypes.GET_BINDER_DROPDOWN_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_BINDER_DROPDOWN_SUCCESS:
            return {
                ...state,
                binderDropdownData: { success: true, ...action.response }
            };
        case actionTypes.GET_BINDER_DROPDOWN_FAILURE:
            return {
                ...state,
                binderDropdownData: { success: false, ...action.error }
            };

        default:
            return {
                ...state
            };
    }
};

export default conmmonRedRes;
