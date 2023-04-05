export const getLopHocPhanTheoMaHP = async (maHP, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/hocphan', {
            params: {
                maHP: maHP,
                maHK: maHK,
            },

            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLopHocPhanMaHP = async (maHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/mahocphan', {
            params: {
                maHP: maHP,
            },

            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const addLopHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/lophocphan', hp, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
