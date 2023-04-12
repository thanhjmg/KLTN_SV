import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import classNames from 'classnames';
import style from './DangKyHocPhan.scss';
import Button from '@mui/material/Button';
import Menu from '../../components/Menu/menu';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { findHocPhanByMaSinhVienAndMaNganh } from '~/service/hocPhanService';
import { getLopHocPhanMaHP } from '../../service/lopHocPhanService';
import { getLichTheoLHP, themLich, getChiTietLichByMaSinhVienAndLopHP } from '~/service/lichService';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import Box from '@mui/material/Box';
import { FaRegWindowClose } from 'react-icons/fa';
import {
    getTatCaChiTietPhieu,
    getChiTietPhieuDKByMaSinhVien,
    deleteChiTietPDKByMaPhieuDKAndMaNhomTH,
} from '../../service/phieuDKHP';
import {
    getPhieuDKByHocKyMaSinhVien,
    themPhieuDangKy,
    themChiTietPhieuDangKy,
    getChiTietPhieuDKByHocKyAndSinhVien,
} from '../../service/phieuDKHP';
const cx = classNames.bind(style);

function DangKyHocPhan() {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    let userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [selectedOptionHK, setSelectedOptionHK] = useState('');
    const [listHocPhan, setListHocPhan] = useState([]);
    const [listLHP, setListLHP] = useState([]);
    const [listHK, setListHK] = useState([]);
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const [selectedHK, setSelectedHK] = useState('HK005');
    const [listDK, setListDK] = useState([]);
    const [listLHPDK, setListLHPDK] = useState([]);
    const [listLich, setListLich] = useState([]);
    const [listDaDK, setListDaDK] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let isMounted = true;

        const getALLHocPhan = async () => {
            try {
                let getHocPhan = await findHocPhanByMaSinhVienAndMaNganh(
                    userLogin?.maSinhVien,
                    userLogin?.lopHoc.nganhHoc.maNganh,
                    accessToken,
                    axiosJWT,
                );

                if (!isMounted) {
                    return; // component unmounted, aborting
                }

                let getTatCaCTPhieuDKBySinhvien = await getChiTietPhieuDKByMaSinhVien(
                    userLogin?.maSinhVien,
                    accessToken,
                    axiosJWT,
                );
                const listALLChiTietPhieu = getTatCaCTPhieuDKBySinhvien.filter(
                    (item) => item.nhomThucHanh?.tenNhom === 'Nhóm 0',
                );

                let filteredArr = [...getHocPhan];

                for (let i = 0; i < listALLChiTietPhieu.length; i++) {
                    filteredArr = filteredArr.filter(
                        (item) =>
                            item.hocPhan.maHocPhan !== listALLChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                    );
                }

                if (!isMounted) {
                    return; // component unmounted, aborting
                }

                setListHocPhan(filteredArr);
                var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                const filteredList = [];
                let dk = null;
                if (listChiTietPhieu.length === 1) {
                    setListDaDK(listChiTietPhieu);
                } else if (listChiTietPhieu.length > 1) {
                    for (let i = 0; i < listChiTietPhieu.length; i++) {
                        let dk = listChiTietPhieu[i]; // Gán giá trị ban đầu của dk là phần tử i
                        let isDuplicate = false; // Đánh dấu xem có bị trùng hay không

                        // Duyệt qua các phần tử còn lại trong danh sách
                        for (let j = i + 1; j < listChiTietPhieu.length; j++) {
                            // Kiểm tra điều kiện lọc
                            if (
                                listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                    listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                listChiTietPhieu[j].nhomThucHanh.tenNhom !== 'Nhóm 0'
                            ) {
                                dk = listChiTietPhieu[j]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                isDuplicate = true; // Đánh dấu là bị trùng
                            } else if (
                                listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                    listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                listChiTietPhieu[i].nhomThucHanh.tenNhom !== 'Nhóm 0'
                            ) {
                                dk = listChiTietPhieu[i]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                isDuplicate = true; // Đánh dấu là bị trùng
                            }
                        }

                        if (!isDuplicate) {
                            dk = listChiTietPhieu[i]; // Nếu không bị trùng, gán lại giá trị của dk
                        }

                        filteredList.push(dk); // Sau khi duyệt qua tất cả các phần tử j, đẩy giá trị dk vào danh sách lọc
                    }
                    // console.log(filteredList);
                    const uniqueListDK = filteredList.filter((item, index, self) => {
                        // Lọc các mục có giá trị thuộc tính 'maPhieuDangKy' duy nhất
                        return (
                            self.findIndex(
                                (i) =>
                                    i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                    item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                            ) === index
                        );
                    });

                    setListDaDK(uniqueListDK);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getALLHocPhan();

        return () => {
            isMounted = false; // set isMounted to false when component unmounts
        };
    }, [listDK]);

    useEffect(() => {
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!userLogin.khoaHoc) {
                    const startYear = userLogin.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = userLogin.khoaHoc?.tenKhoaHoc.substring(5);
                    var list = await getHocKyTheoKhoaHoc(
                        `${startYear}-08-01`,
                        `${endYear}-06-01`,
                        accessToken,
                        axiosJWT,
                    );
                    setListHK(list);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getHocKyByKhoaHoc();
    }, [userLogin]);

    useEffect(() => {
        const getChiTietPhieuDKTheoHocKy = async () => {
            try {
                var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin?.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                setListDaDK(listChiTietPhieu);

                setListDK(listChiTietPhieu);
            } catch (error) {
                console.log(error);
            }
        };
        getChiTietPhieuDKTheoHocKy();
    }, [selectedHK]);

    // console.log(listDK);
    const handleSelectHocPhan = async (item) => {
        console.log(item);
        setListLHP([]);
        setListLich([]);

        let result = await getLopHocPhanMaHP(item, accessToken, axiosJWT);
        setSelectedHP(item);
        setListLHP(result);
    };
    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const [selectedLoai, setSelectedLoai] = useState('LDK001');
    const [selectedMon, setSelectedMon] = useState('');
    const [selectedLop, setSelectedLop] = useState('');
    const [selectedLHP, setSelectedLHP] = useState('');
    const [selectedLichHoc, setSelectedLichHoc] = useState('');
    const [showMenu, setShowMenu] = useState(true);
    const [selectedHP, setSelectedHP] = useState('');
    const [listLichHoc, setListLichHoc] = useState([]);
    const [listChiTietLichDK, setListChiTietLichDK] = useState([]);

    const [selectedLich, setSelectedLich] = useState([]);

    const handleSelectLoaiDK = (event) => {
        setSelectedLoai(event.target.value);
    };

    const handleXemClick = (item, index) => {
        // Xử lý sự kiện khi nút "Xem" được bấm
        setOpen(true);
        const getLichDaDK = async () => {
            let listLichDaDK = await getChiTietLichByMaSinhVienAndLopHP(
                userLogin.maSinhVien,
                item.nhomThucHanh.lopHocPhan.maLopHocPhan,
                accessToken,
                axiosJWT,
            );

            if (listLichDaDK.length > 0) {
                let map = new Map();

                listLichDaDK.forEach((item) => {
                    if (!map.has(item.nhomThucHanh?.maNhom)) {
                        map.set(item.nhomThucHanh?.maNhom, item);
                    }
                });

                let filteredList = Array.from(map.values());
                setListChiTietLichDK(filteredList);
                // setListChiTietLichDK(listLichDaDK);
            }
        };
        getLichDaDK();
    };
    const handleDeleteClick = async (item, index) => {
        var HuyLHPDK;
        let getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(userLogin.maSinhVien, selectedHK, accessToken, axiosJWT);
        console.log(getPhieuDangKy);
        console.log(item);
        let listLichDaDK = await getChiTietLichByMaSinhVienAndLopHP(
            userLogin.maSinhVien,
            item.nhomThucHanh.lopHocPhan.maLopHocPhan,
            accessToken,
            axiosJWT,
        );

        if (listLichDaDK.length > 0) {
            let map = new Map();

            listLichDaDK.forEach((item) => {
                if (!map.has(item.nhomThucHanh?.maNhom)) {
                    map.set(item.nhomThucHanh?.maNhom, item);
                }
            });

            let filteredList = Array.from(map.values());
            console.log(filteredList);
            if (filteredList.length > 1) {
                for (let i = 0; i < filteredList.length; i++) {
                    console.log(filteredList[i].nhomThucHanh.maNhom);
                    HuyLHPDK = await deleteChiTietPDKByMaPhieuDKAndMaNhomTH(
                        item.phieuDangKyHocPhan.maPhieuDangKy,
                        filteredList[i].nhomThucHanh.maNhom,
                        accessToken,
                        axiosJWT,
                    );
                }
            } else {
                HuyLHPDK = await deleteChiTietPDKByMaPhieuDKAndMaNhomTH(
                    item.phieuDangKyHocPhan.maPhieuDangKy,
                    filteredList[0].nhomThucHanh.maNhom,
                    accessToken,
                    axiosJWT,
                );
            }
            console.log(HuyLHPDK.length);
            if (HuyLHPDK.length === 0) {
                alert('Hủy thành công');
                var listChiTietPhieuLT = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );

                setListDK(listChiTietPhieuLT);
                var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );

                setListDaDK(listChiTietPhieu);
            }
        }
    };
    function Menu1() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
    }

    const handleSelectLich = (item) => {
        setSelectedLich(item);
    };
    const handleChangeHK = (event) => {
        setSelectedHK(event.target.value);
    };

    const clickDangKyHP = async () => {
        let getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(userLogin.maSinhVien, selectedHK, accessToken, axiosJWT);
        console.log(getPhieuDangKy.length);
        if (getPhieuDangKy.length === 0) {
            let phieuDangKy = {
                trangThai: '1',
                sinhVien: userLogin.maSinhVien,
                hocKy: selectedHK,
            };
            const addPhieuDangKy = await themPhieuDangKy(phieuDangKy, accessToken, axiosJWT);
            console.log(addPhieuDangKy);
        }

        getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(userLogin.maSinhVien, selectedHK, accessToken, axiosJWT);
        if (listLich.length > 1 && selectedLich.length === 0) {
            alert('Vui lòng chọn nhóm thực hành');
        } else if (listLich.length === 1) {
            let chiTietPhieuDangKyLT = {
                phieuDangKyHocPhan: getPhieuDangKy[0]?.maPhieuDangKy,
                ngayDangKy: new Date().toISOString().substr(0, 10),
                loaiDangKyHP: selectedLoai,
                nhomThucHanh: listLich[0].nhomThucHanh.maNhom,
            };
            console.log(chiTietPhieuDangKyLT);
            var addChiTietPhieuDangKyLT = await themChiTietPhieuDangKy(chiTietPhieuDangKyLT, accessToken, axiosJWT);
            if (!!addChiTietPhieuDangKyLT) {
                var listChiTietPhieuLT2 = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                console.log(listChiTietPhieuLT2);
                setListDK(listChiTietPhieuLT2);

                setListLHP([]);
                setListLich([]);
                alert('Đăng ký học phần thành công!!');
            }
        } else {
            for (let i = 0; i < listLich.length; i++) {
                if (listLich[i].nhomThucHanh.tenNhom === 'Nhóm 0') {
                    let chiTietPhieuDangKyLT = {
                        phieuDangKyHocPhan: getPhieuDangKy[0].maPhieuDangKy,
                        ngayDangKy: new Date().toISOString().substr(0, 10),
                        loaiDangKyHP: selectedLoai,
                        nhomThucHanh: listLich[i].nhomThucHanh.maNhom,
                    };
                    var addChiTietPhieuDangKyLT1 = await themChiTietPhieuDangKy(
                        chiTietPhieuDangKyLT,
                        accessToken,
                        axiosJWT,
                    );
                }
            }
            let chiTietPhieuDangKyTH = {
                phieuDangKyHocPhan: getPhieuDangKy[0].maPhieuDangKy,
                ngayDangKy: new Date().toISOString().substr(0, 10),
                loaiDangKyHP: selectedLoai,
                nhomThucHanh: selectedLich.nhomThucHanh?.maNhom,
            };
            var addChiTietPhieuDangKyTH = await themChiTietPhieuDangKy(chiTietPhieuDangKyTH, accessToken, axiosJWT);
            if (!!addChiTietPhieuDangKyTH && !!addChiTietPhieuDangKyLT1) {
                var listChiTietPhieu1 = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin?.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                console.log(listChiTietPhieu1);

                setListDK(listChiTietPhieu1);
                setListLHP([]);
                setListLich([]);
                alert('Đăng ký học phần thành công!!');
            }
        }
    };

    const handleSelectLHP = async (item) => {
        let result = await getLichTheoLHP(item, accessToken, axiosJWT);

        setSelectedLHP(item);
        setListLichHoc(result);

        if (result.length > 0) {
            let map = new Map();

            result.forEach((item) => {
                if (!map.has(item.nhomThucHanh?.maNhom)) {
                    map.set(item.nhomThucHanh?.maNhom, item);
                }
            });

            let filteredList = Array.from(map.values());
            setListLich(filteredList);
        }
    };

    const renderDanhSachDieuKien = (item) => {
        let arrFilterHocTruoc = item.danhSachMonHocHocTruoc.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (a)</span>
                </>
            );
        });
        let arrFilterTienQuyet = item.danhSachMonHocTienQuyet.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (b)</span>
                </>
            );
        });
        let arrFilterSongHanh = item.danhSachMonHocSongHanh.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (c)</span>
                </>
            );
        });
        let newArrDieuKien = [...arrFilterHocTruoc, ...arrFilterTienQuyet, ...arrFilterSongHanh];

        let nodeDieuKien = [];
        for (let i = 0; i < newArrDieuKien.length - 1; i++) {
            let data = newArrDieuKien[i];
            let CompDieuKien = <>{data}, </>;
            nodeDieuKien = [...nodeDieuKien, CompDieuKien];
        }
        nodeDieuKien = [...nodeDieuKien, newArrDieuKien[newArrDieuKien.length - 1]];

        return nodeDieuKien;
    };

    return (
        <div className="h-max w-full bg-gray-100 flex flex-row relative">
            <span className="w-1/12 mt-10">
                <FaAlignJustify size={25} onClick={Menu1} />
                <div className={showMenu ? '' : 'hidden'}>
                    <span className="w-52 absolute  border border-sv-blue-4 bg-white">
                        <Menu />
                    </span>
                </div>
            </span>
            <div className="w-10/12 bg-white mt-2">
                <div className="text-xl text-sv-blue-5 m-4">
                    <b>Đăng ký học phần</b>
                </div>
                <div className="border-t border-gray-200 m-2"></div>
                <div className="flex flex-row items-center justify-center">
                    <div className="flex w-72 border  border-sv-blue-4 rounded-lg p-1">
                        <select
                            className="text-sv-text-2 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedHK}
                            onChange={handleChangeHK}
                        >
                            {listHK?.map((option) => (
                                <option key={option.maHocKy} value={option.maHocKy}>
                                    {option.tenHocKy}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK001"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK001'}
                        />
                        <span className="ml-1">Học mới</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK002"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK002'}
                        />
                        <span className="ml-1">Học lại</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK003"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK003'}
                        />
                        <span className="ml-1">Học cải thiện</span>
                    </label>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Môn học, học phần chờ đăng ký</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên môn học/học phần</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Bắt buộc</th>
                                    <th className={cx('')}>học phần: học trước (a), tiên quyết (b), song hành (c)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listHocPhan?.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedHP === `${item.hocPhan.maHocPhan}` ? 'bg-orange-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.hocPhan.maHocPhan + index + 'a'}
                                        onClick={() => handleSelectHocPhan(item.hocPhan.maHocPhan)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-mon"
                                                value={item.hocPhan.maHocPhan}
                                                checked={selectedHP === `${item.hocPhan.maHocPhan}`}
                                                onChange={() => handleSelectHocPhan(item.hocPhan.maHocPhan)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.hocPhan.maHocPhan}</td>
                                        <td>{item.hocPhan.tenHocPhan}</td>
                                        <td>{item.hocPhan.monHoc.soTCLT + item.hocPhan.monHoc.soTCTH}</td>

                                        <td align="center">
                                            {item.trangThai === 'Bắt buộc' ? (
                                                <BsFillCheckCircleFill color="green" size={18} />
                                            ) : (
                                                <AiFillCloseCircle color="red" size={21} />
                                            )}
                                        </td>
                                        <td className="">
                                            <div className="flex flex-row items-center justify-center">
                                                {renderDanhSachDieuKien(item.hocPhan.monHoc)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center text-base w-full relative">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 ml-40">Lớp học phần chờ đăng ký</b>
                    <label className="absolute right-0 flex flex-row items-center">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 text-indigo-600 transition duration-150 ease-in-out p-2"
                            name="checkbox-trung"
                        />
                        <span>
                            <b className="text-base text-sv-blue-5 mr-6 ml-2">Hiển thị lớp học phần không trùng lịch</b>
                        </span>
                    </label>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên lớp học phần</th>
                                    <th className={cx('')}>Lớp dự kiến</th>
                                    <th className={cx('')}>Sỉ số tối đa</th>
                                    <th className={cx('')}>Đã đăng ký</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLHP.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedLHP === `${item.maLopHocPhan}` ? 'bg-orange-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maLopHocPhan}
                                        onClick={() => handleSelectLHP(item.maLopHocPhan)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-lop"
                                                value={item.maLopHocPhan}
                                                checked={
                                                    selectedLHP === `${item.maLopHocPhan}` ||
                                                    (item.nhomThucHanh?.tenNhom === 'Nhóm 1' && selectedLHP === '') ||
                                                    item.nhomThucHanh?.tenNhom === 'Nhóm 0'
                                                }
                                                onChange={() => handleSelectLHP(item.maLopHocPhan)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.maLopHocPhan}</td>
                                        <td>{item.hocPhan.tenHocPhan}</td>
                                        <td>{item.tenLopHocPhan}</td>
                                        <td align="center">{item.siSo}</td>
                                        <td className="">{item.siSoDK}</td>
                                        <td>{item.trangThai}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Chi tiết lớp học phần</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Lịch học</th>
                                    <th className={cx('')}>Nhóm TH</th>
                                    <th className={cx('')}>Phòng</th>
                                    <th className={cx('')}>Dãy nhà</th>
                                    <th className={cx('')}>Giảng viên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLich?.map((item, index) => (
                                    <tr
                                        className={`${selectedLich === item ? 'bg-orange-200' : ''} ${
                                            item.nhomThucHanh.tenNhom === 'Nhóm 0' ? 'bg-red-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maLich}
                                        onClick={() => handleSelectLich(item)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-lich"
                                                value={item.maLich}
                                                checked={selectedLich === item}
                                                onChange={() => handleSelectLich(item)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{days[new Date(item.ngayHoc).getDay()] + '-' + item.caHoc.tenCaHoc}</td>
                                        <td>{item.nhomThucHanh.tenNhom}</td>
                                        <td>{item.phong.tenPhong}</td>
                                        <td align="center">{item.phong.dayNha.tenDayNha}</td>
                                        <td className="">{item.nhanVien.tenNhanVien}</td>
                                        <td>
                                            {convertDateFormat(item.lopHocPhan.ngayBatDau) +
                                                '-' +
                                                convertDateFormat(item.lopHocPhan.ngayKetThuc)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex items-center justify-center p-2">
                        <Button variant="contained" size="small" onClick={clickDangKyHP}>
                            Đăng ký môn học
                        </Button>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Lớp học phần đã đăng ký trong học kỳ này</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã LHP</th>
                                    <th className={cx('')}>Tên môn học</th>
                                    <th className={cx('')}>Lớp học dự kiến</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Nhóm TH</th>

                                    <th>Trạng thái ĐK</th>
                                    <th>Ngày ĐK</th>
                                    <th>Trạng thái LHP</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listDaDK?.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.maLopHocPhan}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.tenMonHoc}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.tenLopHocPhan}</td>
                                        <td>
                                            {item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT +
                                                item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH}
                                        </td>
                                        <td>
                                            <td>
                                                {item.nhomThucHanh.tenNhom === 'Nhóm 0'
                                                    ? ''
                                                    : item.nhomThucHanh.tenNhom}
                                            </td>
                                        </td>
                                        <td>{item.loaiDangKyHP.tenLoaiDKHP}</td>
                                        <td>{convertDateFormat(item.ngayDangKy)}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.trangThai}</td>
                                        <td className="p-2">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleXemClick(item, index)}
                                            >
                                                Xem
                                            </Button>
                                        </td>
                                        <td className="p-2">
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteClick(item, index)}
                                            >
                                                Hủy
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-1/12"></div>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', height: '50%' } }}
                fullWidth={'100%'}
                maxWidth
                open={open}
                onClose={handleClose}
            >
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin dãy nhà</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    ></Box>
                    <div className="w-full flex flex-row justify-between">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Lịch học</th>
                                    <th className={cx('')}>Nhóm</th>
                                    <th className={cx('')}>Phòng</th>
                                    <th className={cx('')}>Dãy nhà</th>
                                    <th>Giảng viên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listChiTietLichDK?.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{days[new Date(item.ngayHoc).getDay()] + '-' + item.caHoc.tenCaHoc}</td>
                                        <td>
                                            {item.nhomThucHanh.tenNhom === 'Nhóm 0' ? '' : item.nhomThucHanh.tenNhom}
                                        </td>
                                        <td>{item.phong.tenPhong}</td>
                                        <td>{item.phong.dayNha.tenDayNha}</td>
                                        <td>{item.nhanVien.tenNhanVien}</td>
                                        <td>
                                            {convertDateFormat(item.lopHocPhan.ngayBatDau) +
                                                '-' +
                                                convertDateFormat(item.lopHocPhan.ngayKetThuc)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DangKyHocPhan;
