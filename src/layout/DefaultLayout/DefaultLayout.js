import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import { BiSearch } from 'react-icons/bi';
import { FaHome, FaCaretDown } from 'react-icons/fa';
import { useState, useRef } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
const cx = classNames.bind();
function DefaultLayout({ children }) {
    const [search, setSearch] = useState('hidden');
    const searchRef = useRef();
    const navigate = useNavigate();
    const ClickSearch = () => {
        const valueSearch = searchRef.current.value.trim();
        if (valueSearch.length === 0) {
            setSearch('');
        } else {
            setSearch('hidden');
        }
    };

    const CheckSearch = () => {
        console.log(searchRef.current);
    };
    return (
        <div className={cx('h-screen flex flex-col w-full')}>
            <div className={cx(' h-14 w-full flex flex-row  shadow-md ')}>
                <div className="w-1/12"></div>
                <div className={cx('flex w-6/12  justify-self-start items-center')}>
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            navigate(config.routeConfig.home);
                        }}
                    >
                        <img src={logo_iuh} alt="avartar" className={cx('w-36 h-12 rounded')} />
                    </div>

                    <div
                        className={cx(
                            ' flex flex-row ml-10 justify-between pr-4 p-2 pl-4 h-8 caret-sv-blue-4 text-sm w-96 rounded-sv-login-input  border border-sv-blue-4  placeholder:text-sv-placeholder placeholder:italic',
                        )}
                    >
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className={cx(' w-full outline-none')}
                        />
                        <BiSearch color="#C7C7C7" size={16} onClick={ClickSearch} />
                    </div>
                    <div className={cx('absolute z-10 text-red-500 text-sm ml-40  w-full mt-10', search)}>
                        Tên đăng nhập hoặc mật khẩu không đúng
                    </div>
                </div>
                <div className={cx('flex flex-row w-4/12  justify-between items-center ')}>
                    <div
                        className="flex flex-row justify-center items-center text-sv-text-2 cursor-pointer"
                        onClick={() => {
                            navigate(config.routeConfig.home);
                        }}
                    >
                        <FaHome className="text-center" size={20} />
                        <p className="text-xs ml-2">Trang chủ</p>
                    </div>
                    <div className="flex flex-row justify-center items-center ">
                        <div className="flex flex-row border rounded-full border-sv-blue-4">
                            <img src={logo_iuh} alt="qrcode" className={cx('h-10 w-10 rounded-full')} />
                        </div>
                        <div className=" flex flex-row ml-3 justify-center items-center">
                            <p className="text-sv-blue-4 mr-2">Nguyễn Tuấn Thanh</p>
                            <FaCaretDown size={15} />
                        </div>
                    </div>
                </div>
                <div className="w-1/12"></div>
                {/* <div className="w-1/12 bg-black"></div>
                <div className={cx('flex w-5/12 bg-slate-600 justify-self-start items-center')}>
                
                    <div><img src={logo_iuh} alt="avartar" className={cx('w-36 h-12 rounded')} /></div>
                    
                <div className={cx(' flex flex-row ml-10 justify-between pr-4 p-2 pl-4 h-8 caret-sv-blue-4 text-sm w-96 rounded-sv-login-input  border border-sv-blue-4  placeholder:text-sv-placeholder placeholder:italic')}>
                        <input
                                                ref={searchRef}
                                                type="text"                                      
                                                placeholder="Tìm kiếm..."
                                                className={cx(
                                            ' w-full outline-none',    
                                        )}
                                            />
                       <BiSearch color="#C7C7C7" size={16} onClick={ClickSearch}/>
                       
                </div>
                <div className={cx('absolute z-10 text-red-500 text-sm ml-40  w-full mt-10', search)}>
                        Tên đăng nhập hoặc mật khẩu không đúng
                    </div> 
                
               
            </div>
             <div className={cx('flex flex-row w-5/12 bg-slate-400 justify-start items-center ml-96')}>
                  
                        <div className="flex flex-row justify-center items-center text-sv-placeholder">
                        <FaHome className="text-center" size={20}/>
                            <p className="text-xs ml-2">Trang chủ</p>
                        </div>
                        <div className="flex flex-row border rounded-full border-sv-blue-4">
                        <img
                                                    src={logo_iuh}
                                                    alt="qrcode"
                                                    className={cx('h-10 w-10 rounded-full')}
                                                />
                        </div>
             </div>
             <div className="w-1/12 bg-black"></div> */}
            </div>

            <div className={cx(' h-full flex ')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
