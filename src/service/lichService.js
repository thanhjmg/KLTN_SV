export const getLichTheoLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/lhp', {
            params: {
                maLHP: maLHP,
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
export const themLich = async (lich, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/lich', lich, {
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
