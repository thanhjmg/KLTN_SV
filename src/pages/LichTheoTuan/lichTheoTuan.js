//import classNames from 'classnames';
import { FaHome } from 'react-icons/fa';
import React from 'react';
import MenuItem from '../../components/ItemMenu';

//const cx = classNames;

function LichTheoTuan() {
    return (
        <div className="flex flex-row w-full bg-slate-100">
            <div className="w-1/12"></div>
            <div className="w-10/12 flex flex-row">
                <div className="w-1/5 h-64 bg-blue-200">
                    <div className="">
                        <div className="flex flex-row items-center p-2">
                            <div className="">
                                <FaHome color="gray" />
                            </div>
                            <div className="ml-2 text-gray-500">MenuItem</div>
                        </div>
                    </div>
                    <MenuItem></MenuItem>
                </div>
                <div className="w-4/5 h-96 bg-red-500 ml-4"></div>
            </div>
            <div className="w-1/12"></div>
        </div>
    );
}

export default LichTheoTuan;
