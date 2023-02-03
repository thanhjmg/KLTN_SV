function ItemMenu({Icon,NameMenu,onClick}) {
    return ( 
        <>
            <div className="flex flex-col w-44 h-24  bg-white items-center justify-center border border-white rounded " onClick={onClick}>
                    <div className="w-full  flex justify-center p-2">{Icon}</div>
                    <div className="text-sv-text-1">{NameMenu}</div>
                    
            </div>
        </>
     );
}

export default ItemMenu;