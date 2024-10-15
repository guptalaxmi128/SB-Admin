import * as actionTypes from '../../../constants/actionTypes';

const initialState = {
    admins: [],
    adminlogin: null, 
    isAuthenticated: false,
    state: 'idle', 
    error: null
};

// Retrieve the admin profile from localStorage
const storedProfile = localStorage.getItem('profile');
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;

const authReducer = (state = { ...initialState, adminlogin: initialProfile }, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_ADMIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                adminlogin: action.payload,
                isAuthenticated: true,
            };
            case actionTypes.LOGOUT_ADMIN:
                localStorage.removeItem('profile');
                return {
                    ...state,
                    adminlogin: null,
                    isAuthenticated: false,
                };
        default:
            return state;
    }
};

export default authReducer;
