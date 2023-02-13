import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import React, { useState } from 'react';
import MenuItem from '../../components/ItemMenu';
import ItemLichHoc from '../../components/ItemLichHoc';
import classNames from 'classnames';
import style from './lichTheoTuan.scss';
import Button from '@mui/material/Button';

const cx = classNames.bind(style);

function LichTheoTuan() {
    const [selectedValue, setSelectedValue] = useState('all');

    const handleRadioButtonChange = (event) => {
        setSelectedValue(event.target.value);
    };

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //Tháng trong javascript bắt đầu từ 0
    var yyyy = today.getFullYear();

    today = yyyy + '-' + dd + '-' + mm;

    const [date, setDate] = useState(today);

    console.log(date);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div className="flex flex-row w-full h-max bg-gray-200 pt-3">
            <div className="w-1/12 h-full"></div>
            <div className="w-10/12 h-full flex flex-row">
                <div className="w-1/6 h-min bg-white">
                    <div className={cx('menu')}>
                        <div className={cx('flex flex-row items-center p-2')}>
                            <div className="text-xl">
                                <FaHome color="gray" />
                            </div>
                            <div className="ml-2 text-gray-500 hover:cursor-pointer">Trang chủ</div>
                        </div>
                    </div>
                    <MenuItem
                        menuItems={[
                            {
                                name: 'Thông tin chung',
                                subItems: [
                                    { name: 'Thông tin sinh viên', to: '' },
                                    { name: 'Thông tin học tập', to: 'login' },
                                ],
                            },
                        ]}
                        icon={<SlScreenDesktop />}
                    ></MenuItem>
                    <MenuItem
                        menuItems={[
                            {
                                name: 'Học tập',
                                subItems: [
                                    { name: 'Kết quả học tập', to: '' },
                                    { name: 'Lịch theo tuần', to: 'login' },
                                ],
                            },
                        ]}
                        icon={<FaGraduationCap />}
                    ></MenuItem>
                    <MenuItem
                        menuItems={[
                            {
                                name: 'Đăng ký học phần',
                                subItems: [
                                    { name: 'Chương trình khung', to: '' },
                                    { name: 'Đăng ký học phần', to: 'login' },
                                ],
                            },
                        ]}
                        icon={<BsFillCalendar2CheckFill />}
                    ></MenuItem>
                </div>
                <div className="w-5/6 h-min bg-white ml-4">
                    <div className="text-xl font-bold text-sv-blue-5 pt-3 pl-2">Lịch học, lịch thi theo tuần</div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="">
                            <div className="flex flex-row text-sm">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="all"
                                        checked={selectedValue === 'all'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Tất cả</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="lichHoc"
                                        checked={selectedValue === 'lichHoc'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Lịch học</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="lichThi"
                                        checked={selectedValue === 'lichThi'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Lịch thi</span>
                                </label>
                                <div className="relative border border-gray-400 ml-2">
                                    <input
                                        type="date"
                                        className="form-input block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none 
                                        focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        value={date}
                                        onChange={handleDateChange}
                                    />
                                </div>
                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small">
                                        Hiện tại
                                    </Button>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small">
                                        <AiOutlineLeft />
                                        Trở lại
                                    </Button>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small">
                                        Tiếp
                                        <AiOutlineRight></AiOutlineRight>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 m-2"></div>
                    <div className="m-2">
                        <div className="">
                            <table className={cx('table')}>
                                <thead className="text-sv-blue-5">
                                    <tr className={cx('thead bg-blue-100')}>
                                        <th className={cx('thead-ca')}>Ca học</th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 2 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 3 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 4 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 5 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 6 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Thứ 7 <br /> 11/11/2022
                                        </th>
                                        <th className={cx('thead-ngay')}>
                                            Chủ nhật <br /> 12/11/2022
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className={cx('row-ca ')}>Sáng</td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                        </td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                        </td>
                                        <td></td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                                type="lichthi"
                                            />
                                        </td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                                type="online"
                                            />
                                        </td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                        </td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                                type="huy"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={cx('row-ca ')}>Chiều</td>
                                        <td></td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                            <ItemLichHoc
                                                mon="Công nghệ mới"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className={cx('row-ca ')}>Tối</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <ItemLichHoc
                                                mon="Lập trình hướng đối tượng"
                                                lop="DHKTPM15A - 420300154902"
                                                tiet="Tiết: 1 - 3"
                                                phong="Phòng: X11.01"
                                                gv="GV: Huỳnh Hữu Nghĩa"
                                            />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="ghichu flex flex-row p-2 item-center">
                        <div className="ml-2 h-4 flex items-center">
                            <b>Ghi chú</b>
                        </div>
                        <div className="h-4 w-10 bg-blue-200 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch học</p>
                        </div>
                        <div className="h-4 w-10 bg-orange-300 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch thi</p>
                        </div>
                        <div className="h-4 w-10 bg-blue-400 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch trực tuyến</p>
                        </div>
                        <div className="h-4 w-10 bg-red-400 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Tạm ngưng</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/12 h-full"></div>
        </div>
    );
}

export default LichTheoTuan;
