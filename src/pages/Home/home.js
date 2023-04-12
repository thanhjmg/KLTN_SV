import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import iuh from './../../images/iuh.jpg';
import { FaCalendarAlt, FaCalendarCheck, FaRegChartBar, FaBuffer, FaList } from 'react-icons/fa';
import ItemMenuHome from '../../components/ItemMenuHome';
import { useState, useEffect } from 'react';
import config from '../../configRoutes';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import style from './home.scss';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getHocPhanTheoHocKy } from '../../service/hocPhanService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import {
    getPhieuDKByHocKyMaSinhVien,
    themPhieuDangKy,
    themChiTietPhieuDangKy,
    getChiTietPhieuDKByHocKyAndSinhVien,
} from '../../service/phieuDKHP';
ChartJS.register(ArcElement, Tooltip, Legend);
function Home() {
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listHK, setListHK] = useState([]);
    const [listLopHocPhanByHK, setListHocPhanByHK] = useState([]);
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

    const [selectedHK, setSelectedHK] = useState('HK005');
    console.log(selectedHK);
    useEffect(() => {
        const getLopHocPhanByHK = async () => {
            let getLopHocByHK = await getChiTietPhieuDKByHocKyAndSinhVien(
                userLogin.maSinhVien,
                selectedHK,
                accessToken,
                axiosJWT,
            );
            console.log(getLopHocByHK);
            const uniqueListHP = getLopHocByHK.filter((item, index, self) => {
                return (
                    item.nhomThucHanh.tenNhom === 'Nhóm 0' && // Thêm điều kiện chỉ lấy nhóm thực hành có tenNhom là 'Nhóm 0'
                    self.findIndex(
                        (i) =>
                            i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                            item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                    ) === index
                );
            });
            setListHocPhanByHK(uniqueListHP);
        };
        getLopHocPhanByHK();
    }, [selectedHK]);
    console.log(listLopHocPhanByHK);
    const dataTinChi = {
        labels: ['Số tín chỉ còn lại', 'Số tín chỉ đã học'],
        datasets: [
            {
                label: 'Số tín chỉ',
                data: [80, 146],
                backgroundColor: ['#01BAF2', '#71BF45'],
                // borderColor: ['green', 'blue'],
            },
        ],
    };

    const options = ['HK1 (2021-2022)', 'HK1 (2021-2022)', 'HK1 (2021-2022)'];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const navigate = useNavigate();

    function handleChange(event) {
        setSelectedOption(event.target.value);
    }
    const handleChangeHK = (event) => {
        setSelectedHK(event.target.value);
    };
    const handleKetQuaHocTap = async () => {
        navigate(config.routeConfig.ketQuaHocTap);
    };

    return (
        <>
            <div className={cx('flex w-full h-full justify-start bg-slate-300')}>
                <div className="w-1/12 "></div>
                <div className=" flex flex-col w-10/12 h-full">
                    <div className=" flex flex-row">
                        <div className="w-2/3 p-5">
                            <div className="w-full bg-white h-60   border rounded ">
                                <div>
                                    {' '}
                                    <h1 className="text-2xl text-sv-text-2 font-bold shadow-sm ml-2  h-10">
                                        Thông tin sinh viên
                                    </h1>
                                </div>
                                <div className=" flex flex-row w-full mt-2">
                                    <div className="w-2/3 flex ">
                                        <div className="w-1/3 flex flex-col items-center mt-2 ">
                                            <div className="w-28 h-28  rounded-full border border-sv-blue-4">
                                                <img
                                                    src={logo_iuh}
                                                    alt="qrcode"
                                                    className={cx('h-28 w-28 rounded-full')}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className="text-sv-blue-4 text-xs mt-2 cursor-pointer"
                                                    onClick={() => navigate(config.routeConfig.thongTinSinhVien)}
                                                >
                                                    Xem chi tiết
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-2/3 mt-2">
                                            <div className="flex flex-row text-xs">
                                                <p className="mr-2 text-sv-text-1 ">MSSV:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.maSinhVien}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4 ">
                                                <p className="mr-2  w-auto text-sv-text-1 ">Họ tên:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.tenSinhVien}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Giới tính:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.gioiTinh}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Ngày sinh:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.ngaySinh}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Nơi sinh:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.noiSinh}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/3 ">
                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Lớp học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.lopHoc.tenLop}</p>
                                        </div>
                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Khóa học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.khoaHoc.tenKhoaHoc}</p>
                                        </div>

                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Ngành:</p>
                                            <p className="text-sv-text-2 font-bold">
                                                {userLogin?.lopHoc.nganhHoc.tenNganh}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col w-1/3 mt-5 h-60">
                            <div className="h-1/2 pb-2">
                                <div className="h-full  p-2 flex bg-sv-blue-2 d border border-sv-blue-4 rounded ">
                                    <div
                                        className="flex flex-col w-full cursor-pointer "
                                        onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                    >
                                        <p className="ml-4 text-sv-blue-4 text-sm">Lịch học trong tuần</p>
                                        <p className="p-4 text-6xl text-sv-blue-4 ">0</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-10 h-10 p-2 flex justify-center items-center bg-sv-blue-2 d border border-sv-blue-4 rounded-full">
                                            <FaCalendarAlt color="#47A9FF" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-1/2  p-2 flex bg-sv-yellow-1 d border border-sv-yellow-2 rounded ">
                                <div
                                    className="flex flex-col w-full cursor-pointer"
                                    onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                >
                                    <p className="ml-4 text-sv-yellow-2 text-sm">Lịch thi trong tuần</p>
                                    <p className="p-4 text-6xl text-sv-yellow-2 ">0</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-10 h-10 p-2 flex justify-center items-center bg-sv-yellow-1 d border border-sv-yellow-2 rounded-full">
                                        <FaCalendarCheck color="#CD853F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex h-full ">
                        <div className="w-2/3 pl-5 pr-5 ">
                            <div className="">
                                <div className=" flex w-full justify-between">
                                    <ItemMenuHome
                                        Icon={<FaCalendarAlt color="#47A9FF" size={30} />}
                                        NameMenu="Lịch theo tuần"
                                        onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaRegChartBar color="#47A9FF" size={30} />}
                                        NameMenu="Kết quả học tập "
                                        onClick={handleKetQuaHocTap}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaBuffer color="#47A9FF" size={30} />}
                                        NameMenu="Đăng ký học phần "
                                        onClick={() => navigate(config.routeConfig.dangKyHP)}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaList color="#47A9FF" size={30} />}
                                        NameMenu="Lịch theo tiến độ "
                                        onClick={() => navigate(config.routeConfig.lichTheoTienDo)}
                                    ></ItemMenuHome>
                                </div>
                            </div>
                            <div className="flex h-80 mt-3">
                                <div className="w-8/12 pr-3">
                                    <div className="h-full  p-2 flex bg-white d border  rounded ">
                                        <div className="w-full ml-3 mr-3">
                                            <div className="flex justify-between items-center  h-10  border-b-2">
                                                <div>
                                                    {' '}
                                                    <h1 className="text-xl flex text-sv-text-2 font-bold  ">
                                                        Kết quả học tập
                                                    </h1>
                                                </div>
                                                <div className="flex items-center border  border-sv-blue-4 rounded">
                                                    <select
                                                        className="text-sv-text-2 border  border-sv-blue-4 "
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                    >
                                                        {/* {options.map((option, index) => (
                                                            <option key={index} value={option}>
                                                                {option}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-4/12">
                                    <div className="h-full  p-2 flex bg-white d border  rounded ">
                                        <div className="w-full  mr-3">
                                            <div className="flex justify-between items-center  h-10  border-b-2">
                                                <div>
                                                    {' '}
                                                    <h1 className="text-xl flex text-sv-text-2 font-bold  ">
                                                        Tiến độ học tập
                                                    </h1>
                                                </div>
                                            </div>
                                            <div>
                                                <Doughnut data={dataTinChi} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="flex h-full bg-white d border border-white rounded">
                                <div className="w-full ml-3 mr-3">
                                    <div className="flex justify-between items-center  h-10  border-b-2">
                                        <div>
                                            {' '}
                                            <h1 className="text-xl flex text-sv-text-2 font-bold  ">Lớp học phần</h1>
                                        </div>
                                        <div className="flex items-center border  border-sv-blue-4 rounded">
                                            <select
                                                className="text-sv-text-2 border  border-sv-blue-4 "
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
                                    </div>
                                    <div className="w-full flex flex-row justify-between text-sm mt-3 text-sv-text-1">
                                        <div>Môn học/Học phần</div>
                                        <div>Tín chỉ</div>
                                    </div>
                                    {listLopHocPhanByHK?.map((item, index) => (
                                        <div className="w-full flex flex-row border-t-2 text-sm mt-3 text-sv-text-1">
                                            <div className="w-10/12">
                                                <div className="text-sv-blue-4 font-bold">
                                                    {item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan}
                                                </div>
                                                <div>{item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}</div>
                                            </div>
                                            <div className="w-2/12 flex justify-center items-center">
                                                <p>
                                                    {item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT +
                                                        item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/12"></div>
            </div>
        </>
    );
}

export default Home;
