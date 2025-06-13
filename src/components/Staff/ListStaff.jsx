/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../Header/Title";
import "./ListStaff.css"
import {faArrowLeft, faArrowRight, faArrowsRotate, faBackward, faCircleInfo, faFileArrowDown, faFileArrowUp, faForward, faRetweet, faSquareCaretLeft, faSquareCaretRight, faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconTool from "./IconTool";
import { useEffect, useState } from "react";
import IconPagination from "./IconPagination";
import { deletePreStaff, deleteStaff, fetchListStaff, restoreStaff } from "../../service/StaffAPI";
import { notification } from "antd";
import { fetchListDepartment } from "../../service/DepartmentAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
const departments = ["Phòng Nhân sự", "Phòng Kế toán", "Phòng Kỹ thuật"];
const ListStaff = () =>{

    const navigate = useNavigate();


    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [id_department, setId_department] = useState(null);
    const [limit, setLimit] = useState(6);
    const [full_name, setFull_name] = useState(null);
    const [user_code, setUser_code] = useState(null);
    const [order, setOrder] = useState("desc");
    const [status, setStatus] = useState("ACTIVE")
    const [numberStaff, setNumberStaff] = useState(null);
    const [render, setRender] = useState(true);
    const [listDepartment, setListDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("");

    const [listStaff, setListStaff] = useState([]);


    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };
    
    const handleNextPage = () => {
        if (page < totalPage) setPage(page + 1);
    };
    
    const handleGoToFirstPage = () => {
        setPage(1);
    };
    
    const handleGoToLastPage = () => {
        setPage(totalPage);
    };

    const handleRefreshFilter = () =>{
        setFull_name(null);
        setId_department(null);
        setUser_code(null);
        setStatus("ACTIVE");
        setSelectedDepartmentName("");
        setOrder("asc")
    }


    const getListStaff = async() =>{
        setLoading(true)
        try {
            const result = await fetchListStaff(id_department, page, limit, full_name, user_code, order, status);
            if(result.status_code === 200){
                setListStaff(result.data);
                setPage(result.pagination.page);
                setTotalPage(result.pagination.totalPages);
                setNumberStaff(result.pagination.returned); 
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

    const handleDeletePreStaff = async (_idUser) => {
        const res = await deletePreStaff(_idUser);
    
        if (res.status_code === 200) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    
        // Chờ 1 giây rồi render lại
        setTimeout(() => {
            setRender(prev => !prev);
        }, 1000); 
    };
    const handleRestoreStaff = async (_idUser) => {
        const res = await restoreStaff(_idUser);
    
        if (res.status_code === 200) {
            // openNotificationWithIcon("success", res.message);
            toast.success(res.message);
        } else {
            // openNotificationWithIcon("error", res.message);
            toast.error(res.message);
        }
    
        // Chờ 1 giây rồi render lại
        setTimeout(() => {
            setRender(prev => !prev);
        }, 1000); 
    };

    const handleDeleteStaff = async (_idUser) => {
        const res = await deleteStaff(_idUser);
    
        if (res.status_code === 200) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    
        // Chờ 1 giây rồi render lại
        setTimeout(() => {
            setRender(prev => !prev);
        }, 1000); 
    };

    const handleDepartmentChange = (e) => {
        const name = e.target.value;
        setSelectedDepartmentName(name);
    
        const found = listDepartment.find(dep => dep.department_name === name);
        if (found) {
            setId_department(found._id); // hoặc found.id tuỳ dữ liệu của bạn
        } else {
            setId_department(null);
        }
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

    useEffect(() =>{
        getListStaff()
    }, [page, status, user_code, full_name, id_department, order, render])
    useEffect(() =>{
        getListDepartment()

    },[])
    return(
        <>
            {loading && <Loading />}
            <div className="liststaff-container">
                <Title name={"Danh sách nhân viên"}/>
                <div className="liststaff-content-container">
                    <div className="liststaff-content">
                        <div className="liststaff-filter">
                            <div className="liststaff-filter-staff_code">
                                <div className="staff_code-label">
                                    Mã nhân viên
                                </div>
                                <div className="staff_code-input">
                                    <input 
                                        type="text" 
                                        value={user_code}
                                        onChange={(e) => setUser_code(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="liststaff-filter-staff_name">
                                <div className="staff_name-label">
                                    Tên nhân viên
                                </div>
                                <div className="staff_name-input">
                                    <input 
                                        type="text" 
                                        value={full_name}
                                        onChange={(e) => setFull_name(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="liststaff-filter-department">
                                <div className="staff-department-label">
                                    Phòng
                                </div>
                                <div className="staff-department-select">
                                    <input 
                                        type="text" 
                                        list="department-options"
                                        value={selectedDepartmentName}
                                        onChange={handleDepartmentChange}
                                    />
                                    <datalist id="department-options">
                                        {listDepartment.map((department, index) => (
                                            <option key={index} value={department.department_name} />
                                        ))}
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="liststaff-tool">
                            <div className="liststaff-tool-download-upload">
                                <div className="liststaff-tool-download" onClick={() => setOrder("desc")}>
                                    <FontAwesomeIcon icon={faFileArrowDown} />
                                </div>
                                <div className="liststaff-tool-upload" onClick={() => setOrder("asc")}>
                                    <FontAwesomeIcon icon={faFileArrowUp} />
                                </div>
                            </div>
                            <div className="liststaff-tool-create-resset">
                                <div className="liststaff-tool-resset" onClick={handleRefreshFilter}>
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </div>
                                <div className="liststaff-tool-create" onClick={() => navigate("/at/staff/create-staff")}>
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </div>
                            </div>
                        </div>
                        <div className="liststaff-table-container">
                            <div className="liststaff-table">
                                <div className="liststaff-table-filter">
                                    <div
                                        className={`liststaff-table-filter-status-normal ${status === "ACTIVE" ? "ACTIVE" : ""}`}
                                        onClick={() => setStatus("ACTIVE")}
                                    >
                                        Hoạt động
                                    </div>
                                    <div 
                                        className={`liststaff-table-filter-status-deleted ${status === "DELETED" ? "DELETED" : ""}`}
                                        onClick={() => setStatus("DELETED")}
                                    >
                                        Đã xoá
                                    </div>
                                </div>
                                <div className="liststaff-table-content">
                                    <table className="student-table">
                                        <thead>
                                            <tr>
                                            <th>STT</th>
                                            <th>Mã nhân viên</th>
                                            <th>Họ và Tên</th>
                                            <th>Email</th>
                                            <th>Phòng</th>
                                            <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listStaff.map((staff, index) => (
                                                <tr key={staff?._id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{staff?.user_code}</td>
                                                    <td>{staff?.full_name}</td>
                                                    <td>{staff?.email}</td>
                                                    <td>{staff?.department_id?.department_name}</td>
                                                    <td>
                                                        <div className="table-td-tool">
                                                            {
                                                                status === "ACTIVE" ? (
                                                                    <>
                                                                        <IconTool color={"#00b894"} icon={faCircleInfo} onClick={() => navigate(`/at/staff/${staff._id}`)}/> 
                                                                        <IconTool color={"#d63031"} icon={faTrash} onClick={() => handleDeletePreStaff(staff._id)}/> 
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <IconTool color={"#0984e3"} icon={faRetweet} onClick={() => handleRestoreStaff(staff._id)}/>
                                                                        <IconTool color={"#d63031"} icon={faTrash} onClick={() => handleDeleteStaff(staff._id)}/>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="pagination">
                            <div className="pagination-left">
                                <div>
                                    Trang: 
                                </div>
                                <div className="pagination-left-current-page">
                                    {page}
                                </div>
                                <div>
                                    /
                                </div>
                                <div>
                                    {totalPage}
                                </div>
                            </div>
                            <div className="pagination-right">
                                <IconPagination icon={faBackward} skip={"right"} onClick={handleGoToFirstPage}/>
                                <IconPagination icon={faArrowLeft} skip={"right"} onClick={handlePrevPage}/>
                                <div className="pagination-right-current-page">
                                    {page}
                                </div>
                                <IconPagination icon={faArrowRight} skip={"left"} onClick={handleNextPage}/>
                                <IconPagination icon={faForward} skip={"left"} onClick={handleGoToLastPage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListStaff;