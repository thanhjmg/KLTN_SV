import { Scrollbar } from 'react-scrollbars-custom';
function KetQuaHocTap() {
    return (
        <>
            <div className="w-full  bg-slate-300 p-3">
                <div className=" flex flex-col w-full  h-full bg-white  border rounded ">
                    <div className="w-auto">
                        <h1 className="text-2xl text-sv-text-2 font-bold border-b-2 ml-2  h-10">Kết quả học tập</h1>
                    </div>
                    <Scrollbar className="w-full, h-60">
                        <table className="mt-2">
                            <thead className="">
                                <tr className="bg-gray-200 h-16 w-14">
                                    <th rowSpan={3} className="w-44 px-1 py-1 border border-sv-blue-4">
                                        STT
                                    </th>
                                    <th rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Mã lớp học phần
                                    </th>
                                    <th rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Tên môn học/Học phần
                                    </th>
                                    <th rowSpan={3} className="px-4 py-1  border border-sv-blue-4">
                                        Số tín chỉ
                                    </th>
                                    <th colSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        Giữa kỳ
                                    </th>
                                    <th colSpan={9} className="px-4 py-1 border border-sv-blue-4">
                                        Thường xuyên
                                    </th>
                                    <th colSpan={5} className="px-4 py-1 border border-sv-blue-4">
                                        Thực hành
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        TBQT
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Cuối kỳ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Điểm tổng kết
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Thang điểm 4
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Điểm chữ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Xếp loại
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-2 border border-sv-blue-4">
                                        Ghi chú
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Đạt
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        Chuyên cần
                                    </th>
                                    <th rowSpan={1} colSpan={9} className="px-4 py-2 border border-sv-blue-4">
                                        LT Hệ số 1
                                    </th>
                                    <th rowSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        3
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        4
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        5
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        3
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        4
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        5
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        6
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        7
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        8
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        9
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-300">
                                    <td colSpan={28}> jhj</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="border px-1 py-1">1</td>
                                    <td className="border px-8 py-2">420300068520</td>
                                    <td className=" border px-2 py-2 max-w-md whitespace-nowrap text-ellipsis">
                                        Những nguyên lý cơ bản của chủ nghĩa Mác- Lenin
                                    </td>
                                    <td className="border px-1 py-1">5</td>
                                    <td className="border px-4 py-1">7,0</td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1">7,0</td>
                                    <td className="border px-4 py-1">7,5</td>
                                    <td className="border px-4 py-1">7.0</td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1">9.0</td>
                                    <td className="border px-4 py-1">7.0</td>
                                    <td className="border px-4 py-1">3.2</td>
                                    <td className="border px-4 py-1">A+</td>
                                    <td className="border px-4 py-1">Khá</td>
                                    <td className="border px-4 py-1"></td>
                                    <td className="border px-4 py-1"></td>
                                </tr>
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </div>
        </>
    );
}

export default KetQuaHocTap;
