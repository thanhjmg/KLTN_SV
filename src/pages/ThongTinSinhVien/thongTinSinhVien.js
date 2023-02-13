// eslint-disable-next-line no-unused-expressions
import React from 'react';
import MenuItem from '../../components/ItemMenu';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
function ThongTinSinhVien() {
    // const cx = classNames.bind(style);
    return (
        <>
            <div className="flex flex-row w-full h-max bg-gray-200 pt-3">
                <div className="w-1/12 h-full"></div>
                <div className="w-10/12 h-full flex flex-row">
                    <div className="w-1/6 h-min bg-white">
                        <div className={'menu'}>
                            <div className={'flex flex-row items-center p-2'}>
                                <div className="text-xl">
                                    <FaHome color="gray" />
                                </div>
                                <div className="ml-2 text-gray-500">Trang chủ</div>
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
                    <div className="w-5/6 h-screen bg-white  border rounded ml-2">
                        <div className="flex">
                            <div className="w-3/12 ml-5">
                                <div className="flex w-full pt-5 pb-5 justify-center items-center">
                                    <div className="w-28 h-28  rounded-full border border-sv-blue-4">
                                        <img src={logo_iuh} alt="qrcode" className={'h-28 w-28 rounded-full'} />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm">
                                    <p className="mr-2 text-sv-text-1 ">MSSV:</p>
                                    <p className="text-sv-text-2 font-bold"> 19496481</p>
                                </div>

                                <div className="flex flex-row text-sm mt-4 ">
                                    <p className="mr-2  w-auto text-sv-text-1 ">Họ tên:</p>
                                    <p className="text-sv-text-2 font-bold">Nguyễn Tuấn Thanh</p>
                                </div>
                                <div className="flex flex-row text-sm mt-4">
                                    <p className="mr-2 text-sv-text-1 ">Giới tính:</p>
                                    <p className="text-sv-text-2 font-bold">Nam</p>
                                </div>
                            </div>
                            <div className="w-9/12">
                                <h1 className="text-2xl text-sv-text-2 font-bold  border-b-2   h-10">
                                    Thông tin học vấn
                                </h1>
                                <div className="w-full flex">
                                    <div className="w-1/2 mt-3">
                                        <div className="w-full ml-0 m-5 flex">
                                            <div className="w-1/2">
                                                <div className="flex text-sm">
                                                    <p className="mr-2 text-sv-text-1 ">Trạng thái:</p>
                                                    <p className="text-sv-text-2 font-bold">Đang học</p>
                                                </div>
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex text-sm">
                                                    <p className="mr-2 text-sv-text-1 ">Mã hồ sơ:</p>
                                                    <p className="text-sv-text-2 font-bold">19466481</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Lớp học:</p>
                                            <p className="text-sv-text-2 font-bold">DHKTPM15A</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Bậc đào tạo:</p>
                                            <p className="text-sv-text-2 font-bold">Đại học</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Khoa:</p>
                                            <p className="text-sv-text-2 font-bold">Khoa công nghệ thông tin</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Chuyên ngành:</p>
                                            <p className="text-sv-text-2 font-bold">Kỹ thuật phần mềm - 700000</p>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mt-3 ">
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Ngày vào trường:</p>
                                            <p className="text-sv-text-2 font-bold">19/08/2019</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Loại hình đào tạo:</p>
                                            <p className="text-sv-text-2 font-bold">Chính quy</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Ngành:</p>
                                            <p className="text-sv-text-2 font-bold">Kỹ thuật phần mềm</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Khóa học:</p>
                                            <p className="text-sv-text-2 font-bold">2019 - 2020</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 ml-5 w-full">
                            <h1 className="text-2xl text-sv-text-2 font-bold  border-b-2   h-10">Thông tin học vấn</h1>
                            <div className="w-full flex">
                                <div className="w-4/12">
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Ngày sinh:</p>
                                        <p className="text-sv-text-2 font-bold">08/12/2001</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Số CCCD:</p>
                                        <p className="text-sv-text-2 font-bold">123456789</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Đối tượng:</p>
                                        <p className="text-sv-text-2 font-bold"></p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5">
                                        <p className="mr-2 text-sv-text-1 ">Ngày vào đoàn:</p>
                                        <p className="text-sv-text-2 font-bold"></p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Điện thoại:</p>
                                        <p className="text-sv-text-2 font-bold">0374779028</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Địa chỉ liên hệ:</p>
                                        <p className="text-sv-text-2 font-bold"></p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Nơi sinh:</p>
                                        <p className="text-sv-text-2 font-bold">tỉnh Vĩnh Long</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Hộ khẩu thường trú:</p>
                                        <p className="text-sv-text-2 font-bold">tỉnh Vĩnh Long</p>
                                    </div>
                                </div>
                                <div className="w-4/12">
                                    <div className="w-full flex">
                                        <div className="w-1/2">
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Dân tộc:</p>
                                                <p className="text-sv-text-2 font-bold">Kinh</p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Ngày cấp:</p>
                                                <p className="text-sv-text-2 font-bold">01/11/2019</p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Diện chính sách:</p>
                                                <p className="text-sv-text-2 font-bold"></p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Ngày vào Đảng:</p>
                                                <p className="text-sv-text-2 font-bold"></p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Email:</p>
                                                <p className="text-sv-text-2 font-bold"></p>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Tôn giáo:</p>
                                                <p className="text-sv-text-2 font-bold">Không</p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Nơi cấp:</p>
                                                <p className="text-sv-text-2 font-bold">Tiền Giang</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    );
}

export default ThongTinSinhVien;
