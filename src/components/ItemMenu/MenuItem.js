import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import style from './itemMenu.scss';

const cx = classNames.bind(style);

function MenuItem() {
    const [display, setDisplay] = useState({
        item1: false,
        item2: false,
    });

    const handleClick = (item) => {
        setDisplay({
            ...display,
            [item]: !display[item],
        });
    };

    const menuItems = [{ name: 'Item 1', subItems: ['Sub Item 1', 'Sub Item 2'] }];
    return (
        // <div className="flex flex-row items-center p-2">
        //     <div className="">
        //         <FaHome color="gray" />
        //     </div>
        //     <div className="ml-2 text-gray-500">MenuItem</div>
        // </div>

        <ul>
            {menuItems.map((item) => (
                <li key={item.name}>
                    <div className={cx('memu flex flex-row items-center p-2')} onClick={() => handleClick(item.name)}>
                        <div className="text-gray-500 text-xl">
                            <FaHome />
                        </div>
                        <div className="ml-2 text-gray-500">{item.name}</div>
                        <div className="text-gray-500 text-xl">
                            <MdOutlineExpandMore />
                        </div>
                    </div>
                    {display[item.name] && (
                        <ul>
                            {item.subItems.map((subItem) => (
                                <li key={subItem}>{subItem}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default MenuItem;
