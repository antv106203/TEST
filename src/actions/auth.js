import { loginAccount } from "../service/AccountAPI";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFail = (error) => {
    return {
        type: LOGOUT_FAIL,
        payload: error
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await loginAccount(email, password); // Gọi API

            // Lưu thông tin vào localStorage
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            dispatch(loginSuccess());

            return response; // Trả về dữ liệu để component có thể nhận được
        } catch (error) {

            dispatch(loginFail(error.response?.data || { message: "Login failed" }));
            return error.response?.data || { status_code: 400, message: "Login failed" };
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess());
    }
}