// import "./DetailDepartment.css"
import "./DetailDepartment.css"
import Title from "../Header/Title"
import IconTool from "../Staff/IconTool";
import { faArrowLeft, faArrowRight, faBackward, faCircleInfo, faForward, faPen, faRetweet, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePreStaff,fetchListStaff } from "../../service/StaffAPI";
import IconPagination from "../Staff/IconPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDetailDepartment, updateDepartment } from "../../service/DepartmentAPI";
import { formatAccessTime } from "../../utils/DateUtils";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import Loading from "../Loading/Loading";
import PopupUpdateDepartment from "./PopupUpdateDepartment";

const DetailDepartment = () => {

    const navigate = useNavigate();
    const {_id} = useParams();
    const [status, setStatus] = useState("ACTIVE")
    const [loading, setLoading] = useState(false);



    // list staff
    const [listStaff, setListStaff] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [order, setOrder] = useState("asc");
    const [full_name, setFullName] = useState(null);
    const [user_code, setUserCode] = useState(null);  
    const [totalStaff, setTotalStaff] = useState(null)  
    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handlePageChange = (pagea) => {
        setPage(pagea)
    }

    const handleFirstPage = () => {
        setPage(1);
    }
    const handleLastPage = () => {
        setPage(totalPage);
    }

    const [departmentDetail, setDetailDepartment] = useState({})
    
    const handleNextPage = () => {
        if (page < totalPage) setPage(page + 1);
    };

    const getListStaff = async() =>{
        setLoading(true);
        try {
            const result = await fetchListStaff(_id, page, limit, full_name, user_code, order, status);
            if(result.status_code === 200){
                setListStaff(result.data);
                setPage(result.pagination.page);
                setTotalPage(result.pagination.totalPages);
                setTotalStaff(result.pagination.total);
                setCurrentPage(result.pagination.page)
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
            
        } catch (error) {
            setLoading(false);
            toast.error(`Lỗi không xác định: ${error}`)
        } finally{
            setLoading(false);
        }
    }

    const handleDeleteStaff = async(id) => {
        setLoading(true);
        try {
            const res = await deletePreStaff(id)
            if(res.status_code === 200){
                toast.success(res.message);
                getListStaff();
            }
            else {
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(`Lỗi không xác định: ${error}`)
        }
        finally{
            setLoading(false)
        }
    }
    // detail
    const [floor, setFloor] = useState("");
    const [department_name, setDepartmentName] = useState(null);
    const [department_code, setDepartmentCode] = useState(null);
    const [total_member, setTotalMember] = useState(null);
    const [created_at, setCreatedAt] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    // detailPopup

    const [showPopupUpdateDepartment, setShowPopupUpdateDepartment] = useState(false);



    const fetchDetailDepartment = async() => {
        setLoading(true);
        try {
            const result = await getDetailDepartment(_id);
            if(result.status_code == 200){
                setDetailDepartment(result.data);
                setFloor(result?.data?.floor);
                setDepartmentName(result.data.department_name);
                setDepartmentCode(result.data.department_code);
                setTotalMember(result.data.total_member);
                setCreatedAt(result.data.createdAt);
                setUpdatedAt(result.data.updatedAt);
            }

            else {
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
                setLoading(false);
                toast.error(`Lỗi không xác định: ${error}`);
        }
        finally{
            setLoading(false)
        }
    }

    const handleUpdateDepartment = async (id_i ,name, code, fl) => {
        setLoading(true)
        try {
            const department = {   
                department_name: name,
                department_code:code,
                floor: fl,
            };
            const result = await updateDepartment(id_i, department);
            if(result.status_code === 200){ 
                toast.success(result.message)
                fetchDetailDepartment();
            }
            else{
                setLoading(false)
                toast.error(result.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(`Lỗi không xác định: ${error}`);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDetailDepartment();
    }, []);

    useEffect(() => {
        getListStaff();
    }, [page, limit, full_name, user_code]);
    console.log(currentPage)
    /*
    return(
        <div className="detail-department-container">
            <Title name={"Thông tin phòng ban"} exit={true} onExit={() => navigate("/at/department")}/>
            <div className="detail-department-content-container">
                <div className="detail-department-content">
                    <div className="detail-department-infomation-general">
                        <div className="detail-department-infomation-general-header">
                            <h4>Thông tin chung</h4>
                        </div>
                        <div className="detail-department-info">
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Tầng
                                </div>
                                <div className="detail-department-name-input">
                                    <select type="text" value={floor} onChange={(e) => setFloor(e.target.value)}>
                                        <option value={null} disabled selected hidden>Chọn tầng</option>
                                        <option value={"Tầng 1"}>Tầng 1</option>
                                        <option value={"Tầng 2"}>Tầng 2</option>
                                        <option value={"Tầng 3"}>Tầng 3</option>
                                        <option value={"Tầng 4"}>Tầng 4</option>
                                        <option value={"Tầng 5"}>Tầng 5</option>
                                        <option value={"Tầng 6"}>Tầng 6</option>
                                    </select>
                                </div>
                            </div>
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Tên phòng
                                </div>
                                <div className="detail-department-name-input">
                                    <input type="text" value={department_name}  onChange={(e) => setDepartmentName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Mã phòng
                                </div>
                                <div className="detail-department-name-input">
                                    <input type="text" value={department_code}  onChange={(e) => setDepartmentCode(e.target.value)}/>
                                </div>
                            </div>
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Tổng số nhân viên
                                </div>
                                <div className="detail-department-name-input">
                                    <input type="text" value={total_member}  onChange={(e) => setTotalMember(e.target.value)} disabled/>
                                </div>
                            </div>
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Ngày tạo
                                </div>
                                <div className="detail-department-name-input">
                                    <input type="text" value={formatAccessTime(created_at)} disabled/>
                                </div>
                            </div>
                            <div className="detail-department-name">
                                <div className="detail-department-name-label">
                                    Ngày cập nhật gần nhất
                                </div>
                                <div className="detail-department-name-input">
                                    <input type="text" value={formatAccessTime(updated_at)} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-department-list-staff">
                        <div className="detail-department-infomation-general-header">
                            <h4>Danh sách nhân viên</h4>
                        </div>
                        <div className="detail-department-list-staff-content">
                            <div className="detail-department-list-staff-filter">
                                <div className="detail-department-filter-user-name">
                                    <div className="detail-department-filter-user-name-input">
                                        <input placeholder="Tìm kiếm theo tên nhân viên" value={full_name} onChange={(e) => setFullName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="detail-department-filter-user-code">
                                    <div className="detail-department-filter-user-code-input">
                                        <input placeholder="Tìm kiếm theo mã nhân viên" value={user_code} onChange={(e) => setUserCode(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-department-list-staff-table">
                                <table className="student-table">
                                    <thead>
                                        <tr>
                                            <th>Mã nhân viên</th>
                                            <th>Họ và Tên</th>
                                            <th>Email</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="student-table-body">
                                        {listStaff.map((staff, index) => (
                                            <tr key={staff?._id || index}>
                                                <td>{staff?.user_code}</td>
                                                <td>{staff?.full_name}</td>
                                                <td>{staff?.email}</td>
                                                <td>
                                                    <div className="table-td-tool">
                                                        {
                                                            status === "ACTIVE" ? (
                                                                <>
                                                                    <IconTool color={"#00b894"} icon={faCircleInfo} /> 
                                                                    <IconTool color={"#d63031"} icon={faTrash} /> 
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <IconTool color={"#0984e3"} icon={faRetweet} />
                                                                    <IconTool color={"#d63031"} icon={faTrash} />
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
                <div className="detail-department-content-tool">
                    <div className="detail-department-content-tool-cancel" onClick={() => {navigate("/at/department")}}>
                        <FontAwesomeIcon icon={faXmark} />
                        Trở lại 
                    </div>
                    <div className="detail-department-content-tool-update" onClick={handleUpdateDepartment}>
                        <FontAwesomeIcon icon={faPen} />
                        Cập nhật
                    </div>
                </div>
            </div>
        </div>
    )
        */

    return(
        <>  
            {loading && <Loading />}
            {
                showPopupUpdateDepartment && 
                <PopupUpdateDepartment
                    onClose={() => setShowPopupUpdateDepartment(false)}
                    department={departmentDetail}
                    onUpdate={handleUpdateDepartment}
                />
            }
            <div className="detail-department-container">
                <Title name={"Thông tin phòng ban"} exit={true} onExit={() => navigate("/at/department")}/>
                <div className="detail-department-content-container">
                    <div className="detail-department-info-section">
                        <div className="detail-department-header">
                            <h3>Thông tin chung</h3>
                            <button className="detail-department-header-edit-button" onClick={() => setShowPopupUpdateDepartment(true)}>Cập nhật</button>
                        </div>
                        <div className="detail-department-info-container">
                            <p><strong>Tầng:</strong> {departmentDetail?.floor}</p>
                            <p><strong>Tên phòng:</strong> {departmentDetail?.department_name}</p>
                            <p><strong>Mã phòng:</strong> {departmentDetail?.department_code}</p>
                            <p><strong>Tổng số nhân viên:</strong> {departmentDetail?.total_member}</p>
                        </div>
                    </div>
                    <div className="detail-department-list-staff-section">
                        <div className="detail-department-header">
                            <h3>Danh sách sinh viên</h3>
                        </div>
                        <div className = "detail-department-list-staff">
                            <div className="detail-department-list-staff-table-wrapper">
                                <table className="detail-department-list-staff-table">
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Mã nhân viên</th>
                                            <th>Họ và Tên</th>
                                            <th>Email</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listStaff.map((staff, index) => (
                                            <tr key={staff?._id}>
                                                <td>
                                                    <img
                                                        src={staff?.avatar}
                                                        alt="Avatar"
                                                        className="detail-list-staff-table-avatar"
                                                    />
                                                </td>
                                                <td>{staff?.user_code}</td>
                                                <td>{staff?.full_name}</td>
                                                <td>{staff?.email}</td>
                                                <td>
                                                    <div className= "detail-list-staff-button-wrap">
                                                        <button className="detail-department-list-staff-table-button-info" onClick={() => navigate(`/at/staff/${staff._id}`)}>Xem</button>
                                                        <button className="detail-department-list-staff-table-button-delete" onClick={() => handleDeleteStaff(staff._id)}>Xóa</button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="detail-list-staff-pagination">
                                <div className="detail-list-staff-pagination-summary">
                                    Tổng {totalStaff} nhân viên
                                </div>
                                <div className="detail-list-staff-pagination-controls">
                                    <button onClick={handleFirstPage} disabled={currentPage === 1}>&laquo;</button>
                                    <button onClick={handlePrevPage} disabled={currentPage === 1}>&lsaquo;</button>

                                    <span className="detail-list-staff-pagination-current">{currentPage}</span>

                                    <button onClick={handleNextPage} disabled={currentPage === totalPage}>&rsaquo;</button>
                                    <button onClick={handleLastPage} disabled={currentPage === totalPage}>&raquo;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailDepartment

