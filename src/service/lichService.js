export const getLichTheoThoiGian = async (maSV, ngayBD, ngayKT, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/sv', {
            params: {
                maSV: maSV,
                ngayBD: ngayBD,
                ngayKT: ngayKT,
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
