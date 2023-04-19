import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { FaHome, FaCaretDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../redux/Slice/signInSlice';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import config from '../../configRoutes';
import { getUserByUserName } from '../../service/userService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
const cx = classNames.bind();
function DefaultLayout({ children }) {
    const [search, setSearch] = useState('hidden');
    const dispatch = useDispatch();
    const searchRef = useRef();
    const navigate = useNavigate();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    //console.log(userLoginData);
    var accessToken = userLoginData?.accessToken;
    if (userLoginData) {
        var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    }

    //console.log(axiosJWT);

    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const userLogin = await getUserByUserName(userLoginData?.username, accessToken, axiosJWT);
            setUser(userLogin);
        };

        getUser();
    }, []);

    //console.log(user);
    dispatch(userLogin(user));

    if (userLoginData === null) {
        return <Navigate replace to="/login" />;
    } else {
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
                            <BiSearch color="#C7C7C7" size={16} />
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
                                <img
                                    src={(!!user && user?.linkAnh) || logo_iuh}
                                    alt="avatar"
                                    className={cx('h-10 w-10 rounded-full')}
                                />
                            </div>
                            <div className=" flex flex-row ml-3 justify-center items-center">
                                <p className="text-sv-blue-4 mr-2">{user?.tenSinhVien}</p>
                                <FaCaretDown size={15} />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/12"></div>
                </div>

                <div className={cx(' h-full flex ')}>{children}</div>
            </div>
        );
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
