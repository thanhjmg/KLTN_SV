import classNames from "classnames";
import logo_iuh from "./../../images/logo_iuh.png"

const cx = classNames.bind();
function DefaultLayout({children}) {
    return ( 
        <div className={cx('h-screen flex flex-col w-full')}>
            <div  className={cx('bg-white h-14 w-full  flex  ')}>
                    <div className={cx('flex w-1/2 justify-self-start items-center')}>
                    <div><img src={logo_iuh} alt="avartar" className={cx('w-36 h-12 rounded')} /></div>
                    <input
                                            type="text" 
                                            className={cx(
                                                'block ml-10 justify-center p-2 pl-4 h-8 caret-lcn-blue-4 text-sm w-96 rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder placeholder:italic ',
                                            )}
                                            placeholder="Tìm kiếm"
                                            
                                        />
                    </div>
            </div>
            <div className={cx(' h-full flex ')}>{children}</div>
        </div>
     );
}

export default DefaultLayout;