import React, { useEffect, useState } from "react";
import "./RedesignedStaffList.css";
import Title from "../Header/Title";
import { fetchListDepartment } from "../../service/DepartmentAPI";
import Loading from "../Loading/Loading";
import { deletePreStaff, deleteStaff, fetchListStaff, restoreStaff } from "../../service/StaffAPI";
import { FaSortUp, FaSortDown, FaEye, FaTrash, FaUndoAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RedesignedStaffList = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("ACTIVE");
    const [limit, setLimit] = useState(5);
    const limitOptions = [5, 10, 15];
    const [showLimitOptions, setShowLimitOptions] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [jumpPage, setJumpPage] = useState("");
    // const totalPages = 20;
    const [totalPages, setTotalPages] = useState(1);
    const getPages = () => {
        const maxDisplay = 5;
        const pages = [];

        if (totalPages <= maxDisplay) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const pages = getPages();

    const [page, setPage] = useState(1);
    const [userCode, setUserCode] = useState("");
    const [userName, setUserName] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [listDepartment, setListDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listStaff, setListStaff] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc")

    const handleSortClick = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };
    
    const getListDepartment = async() =>{
        setLoading(true);
        try {
            const result = await fetchListDepartment(null,"asc", null);
            if(result.status_code === 200){
                setListDepartment(result.data);
            }
            else {
                setLoading(false);
                toast.error(result.message);
            }
        } catch (error) {
            
        } finally{
            setLoading(false);
        }
    }




    useEffect(() => {
        getListDepartment();
    }, [])

    const getListStaff = async() =>{
        setLoading(true)
        try {
            const result = await fetchListStaff(departmentId, currentPage, limit, userName, userCode, sortOrder,activeTab );
            if(result.status_code === 200){
                setListStaff(result.data);
                setCurrentPage(result.pagination.page);
                setTotalPages(result.pagination.totalPages);
            }
            else{
                setLoading(false);
                toast.error(result.message)
            }
        } catch (error) {
            setLoading(false)
            toast.error(`Internal server: ${error}`)
        } finally{
            setLoading(false)
        }
    }
    const handleDeletePreStaff = (staffId) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deletePreStaff(staffId);
                if (res.status_code === 200) {
                    toast.success("Xóa thành công!");
                    getListStaff();
                } else {
                    toast.error(res.message);
                }
            }
        });
    };
    const handleRestoreStaff = async (_idUser) => {
        setLoading(true);
        try {
            const res = await restoreStaff(_idUser);
            if (res.status_code === 200) {
                toast.success(res.message);
                getListStaff();
            } else {
                toast.error(res.message);
                getListStaff();
            }
        } catch (error) {
            toast.error(`Lỗi bất định: ${error}`);
            setLoading(false);
        } finally{
            setLoading(false);
        }
    };

    const handleClickDelete = (staffId) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteStaff(staffId);
                if (res.status_code === 200) {
                    toast.success("Xóa thành công!");
                    getListStaff;
                } else {
                    toast.error(res.message);
                }
            }
        });
    };
    useEffect(() => {
        getListStaff();
    }, [currentPage, limit, activeTab, userCode, userName, departmentId, sortOrder])

    return (
        <>
            {loading && <Loading />}
            <div className="redesign-staff-container">
                <Title name={"Danh sách nhân viên"} />

                <div className="redesign-staff-content">
                    {/* Bộ lọc */}
                    <div className="redesign-staff-content-filter">
                        <input 
                            type="text" 
                            placeholder="Mã nhân viên" 
                            value={userCode} 
                            onChange={(e) => setUserCode(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Tên nhân viên"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="">Chọn phòng ban</option>
                            {listDepartment.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                {dep.department_name}
                                </option>
                            ))}
                        </select>
                        <button className="redesign-staff-content-filter-add-btn" onClick={() => navigate("/at/staff/create-staff")}>Thêm nhân viên</button>
                    </div>
                    <div className="redesign-staff-content-table">
                        <div className="redesign-staff-content-table-status">
                            <button
                                className={activeTab === "ACTIVE" ? "redesign-staff-content-table-status-tab active" : "redesign-staff-content-table-status-tab"}
                                onClick={() => setActiveTab("ACTIVE")}
                            >
                                Hoạt động
                            </button>
                            <button
                                className={activeTab === "DELETED" ? "redesign-staff-content-table-status-tab active" : "redesign-staff-content-table-status-tab"}
                                onClick={() => setActiveTab("DELETED")}
                            >
                                Đã xóa
                            </button>
                        </div>
                        <div className="table-responsive-wrapper">
                            <table className="redesign-staff-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Mã NV</th>
                                        <th onClick={handleSortClick} style={{ cursor: "pointer" }}>
                                            Họ tên{" "}
                                            {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                                        </th>

                                        <th>Phòng</th>
                                        <th>Email</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listStaff.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        listStaff.map((staff, index) => (
                                        <tr key={staff._id}>
                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                            <td>
                                                <img src={staff.avatar} alt="avatar" className="staff-avatar" />
                                            </td>
                                            <td>{staff.user_code}</td>
                                            <td>{staff.full_name}</td>
                                            <td>{staff.department_id.department_name}</td>
                                            <td>{staff.email}</td>
                                            <td>
                                                {activeTab === "ACTIVE" ? (
                                                    <>
                                                    <button className="action-btn view" onClick={() => navigate(`/at/staff/${staff._id}`)}>
                                                        <FaEye style={{ marginRight: "6px" }} /> Xem
                                                    </button>
                                                    <button className="action-btn delete" onClick={() => handleDeletePreStaff(staff._id)}>
                                                        <FaTrash style={{ marginRight: "6px" }} /> Xóa
                                                    </button>
                                                    </>
                                                ) : (
                                                    <>
                                                    <button className="action-btn restore" onClick={() => handleRestoreStaff(staff._id)}>
                                                        <FaUndoAlt style={{ marginRight: "6px" }} /> Hoàn tác
                                                    </button>
                                                    <button className="action-btn delete" onClick={() => handleClickDelete(staff._id)}>
                                                        <FaTrash style={{ marginRight: "6px" }} /> Xóa
                                                    </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                        ))
                                    )}
                                    </tbody>
                            </table>
                        </div>
                        <div className="redesign-staff-footer">
                            {/* LIMIT hiển thị lên trên */}
                            <div className="redesign-staff-footer-limit-wrapper" onClick={() => setShowLimitOptions(!showLimitOptions)}>
                                <div className="redesign-staff-footer-limit-selected">
                                Hiển thị: <span>{limit}</span> bản ghi/trang ▾
                                </div>
                                {showLimitOptions && (
                                <div className="redesign-staff-footer-limit-options">
                                    {limitOptions.map((opt) => (
                                    <div
                                        key={opt}
                                        className={`redesign-staff-footer-limit-option ${opt === limit ? "selected" : ""}`}
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        setLimit(opt);
                                        setShowLimitOptions(false);
                                        }}
                                    >
                                        {opt}
                                    </div>
                                    ))}
                                </div>
                                )}
                            </div>

                            {/* PAGINATION */}
                            <div className="redesign-staff-footer-pagination-controls">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>

                                {pages.map((page, index) => (
                                <button
                                    key={index}
                                    className={page === currentPage ? "active" : ""}
                                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                                    disabled={page === "..."}
                                >
                                    {page}
                                </button>
                                ))}

                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>

                                <div className="redesign-staff-footer-jump-to-page">
                                Đến trang:
                                <input
                                    type="number"
                                    min={1}
                                    max={totalPages}
                                    value={jumpPage}
                                    onChange={(e) => setJumpPage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && jumpPage >= 1 && jumpPage <= totalPages) {
                                            setCurrentPage(Number(jumpPage));
                                            setJumpPage("");
                                        }
                                    }}
                                />
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RedesignedStaffList;
