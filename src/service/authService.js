import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';

import { logOutSuccess } from '~/redux/Slice/authSlice';
import * as httpRequest from '~/utils/httpRequest';

const ROLE_NAME = {
    QUAN_LY: 'ROLE_QUANLY',
    PHONG_DT: 'PHONGDT',
    GIANG_VIEN: 'ROLE_GIANGVIEN',
    SINH_VIEN: 'ROLE_SINHVIEN',
};

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const dataUser = await httpRequest.post('auth/login', user, { withCredentials: true });

        if (!!dataUser) {
            if (
                dataUser.role !== ROLE_NAME.QUAN_LY &&
                dataUser.role !== ROLE_NAME.PHONG_DT &&
                dataUser.role !== ROLE_NAME.GIANG_VIEN &&
                dataUser.role !== ROLE_NAME.SINH_VIEN
            ) {
                alert('Bạn không có quyền truy cập');
                return false;
            }

            dispatch(loginSuccess(dataUser)); // lưu lại user trong redux

            return true;
        } else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const getRefreshToken = async () => {
    try {
        const res = await httpRequest.post(
            'auth/refresh',
            {},
            {
                withCredentials: true,
            },
        );
        return res;
    } catch (error) {
        return null;
    }
};
export const logout = async (dispatch, navigate, accessToken, axiosJWT) => {
    try {
        await axiosJWT.post(
            'auth/logout',
            { logout: '' },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );

        // dispatch(userLogin(null)); // xoa signIn
        dispatch(logOutSuccess()); // xoa Account
        // navigate(config.routeConfig.signIn);
    } catch (error) {
        return null;
    }
};

export const register = async (user, navigate, dispatch) => {
    try {
        const res = await httpRequest.post('auth/register/', user);
        // dispatch(userSignUp(null)); // xoa signUp

        if (!!res) {
            return { userName: user.email, password: user.password };
        }
        // navigate(config.routeConfig.friends)
        // return res;
    } catch (error) {
        return null;
    }
};

export const updatePassword = async (addBody, dispatch, navigate) => {};
export const checkOldPassword = async (addBody) => {};
