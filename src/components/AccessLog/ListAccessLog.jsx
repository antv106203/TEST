/* eslint-disable no-unused-vars */
import API_CONFIG from "../../config/ApiConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Title from "../Header/Title"
import "./ListAccessLog.css"
import { faArrowLeft, faArrowRight, faArrowsRotate, faBackward, faForward, faSearch } from "@fortawesome/free-solid-svg-icons"
import History from "./History"
import Loading from "../Loading/Loading"
import IconPagination from "../Staff/IconPagination"
import { useEffect, useState } from "react"
import { deleteAccesslog, getListAccessLog } from "../../service/AccessLogAPI"
import { fetchListDepartment } from "../../service/DepartmentAPI"
import { io } from "socket.io-client";
import { toast } from "react-toastify"
const socket = io(API_CONFIG.API_HOST);
import Swal from "sweetalert2";
import Pagination from "../Pagination/Pagination"

const ListAccessLog = () => {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [ListAccessLog, setListAccessLog] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [department_id, setDepartment_id] = useState(null);
    const [result, setResult] = useState(null);
    const [order, setOrder] = useState("desc");
    const [listDepartment, setListDepartment] = useState([])
    const [render, setRender] = useState(false)

    const handlePageChange = (page) => {
        setPage(page);
    }
    

    const handleSearch = () => {
        fetchListAccessLog();
    }

    const handleRefresh = () => {
        setFromDate("");       // reset input date
        setToDate("");         // reset input date
        setDepartment_id("");  // reset select
        setResult("");         // reset select
        setRender(!render)
    }

    

    const fetchListAccessLog = async () => {
        setLoading(true);
        try {
            const res = await getListAccessLog(page, limit, order, department_id, result, fromDate, toDate);
            if(res.status_code == 200){
                setListAccessLog(res.data);
                setPage(res.pagination.page);
                setTotalPage(res.pagination.totalPages);
            }
            else {
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(`Lỗi bất định: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const getListDepartment = async () => {
        const res = await fetchListDepartment(null, "asc", null);
        setListDepartment(res.data);
    }

    useEffect(() => {
        fetchListAccessLog()
    }, [render, page])

    useEffect(() => {
        getListDepartment()
    }, [])

    const handleClickLog = (log) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteAccesslog(log._id);
                if (res.status_code === 200) {
                    toast.success("Xóa thành công!");
                    fetchListAccessLog(); // reload danh sách
                } else {
                    toast.error(res.message);
                }
            }
        });
    };

    useEffect(() => {
        socket.on("access-log-updated", () => {
            fetchListAccessLog();
        });

        return () => {
            socket.off("access-log-updated");
        };
    }, [page, limit, department_id, result, fromDate, toDate, order]);

    return(
        <>
            {loading && <Loading />}
            <div className="list-accesslog-container">
                <Title name={"Lịch sử truy cập"}/>
                <div className="list-accesslog-content-container">
                    <div className="list-accesslog-content">
                        <div className="list-accesslog-filter">
                            <div className="list-accesslog-filter-from">
                                <div className="list-accesslog-from-label">
                                    Từ ngày
                                </div>
                                <div className="list-accesslog-filter-from-input">
                                    <input 
                                        type="date" 
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)} 
                                    
                                    />
                                </div>
                            </div>
                            <div className="list-accesslog-filter-to">
                                <div className="list-accesslog-filter-to-label">
                                    Đến ngày
                                </div>
                                <div className="list-accesslog-filter-to-input">
                                    <input 
                                        type="date" 
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)} 
                                    
                                    />
                                </div>
                            </div>
                            <div className="list-accesslog-filter-status">
                                <div className="list-accesslog-filter-status-label">
                                    Trạng thái
                                </div>
                                <div className="list-accesslog-filter-status-select">
                                    <select value={result} onChange={(e) => setResult(e.target.value)}>
                                        <option value={""}>Tất cả</option>
                                        <option value="success">Thành công</option>
                                        <option value="failed">Lỗi</option>
                                    </select>
                                </div>
                            </div>
                            <div className="list-accesslog-filter-status">
                                <div className="list-accesslog-filter-status-label">
                                    Phòng
                                </div>
                                <div className="list-accesslog-filter-status-select">
                                    <select value={department_id} onChange={(e) => setDepartment_id(e.target.value)}>
                                        <option value={""}>Tất cả</option>
                                        {listDepartment.map((dep) => (
                                            <option key={dep._id} value={dep._id}>
                                                {dep.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="list-accesslog-filter-button-search-container">
                                <div className="list-accesslog-filter-button-search" onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </div>
                                <div className="list-accesslog-filter-button-refresh" onClick={handleRefresh}>
                                    <FontAwesomeIcon icon={faArrowsRotate}/>
                                </div>
                                
                            </div>
                        </div>
                        <div className="list-accesslog">
                            
                            {
                                ListAccessLog && ListAccessLog.map((log, index) => (
                                    <History key={log._id || index} accesslog={log} onClick = {handleClickLog}/>
                                ))
                            }
                        </div>
                        <div className="list-accesslog-pagination">
                            <div className="list-accesslog-pagination-left">
                                <div>
                                    Trang: 
                                </div>
                                <div className="list-accesslog-pagination-left-current-page">
                                    {page}
                                </div>
                                <div>
                                    /
                                </div>
                                <div>
                                    {totalPage}
                                </div>
                            </div>
                            <div className="list-accesslog-pagination-right">
                                <Pagination totalPages={totalPage} currentPage={page} onPageChange={handlePageChange} name={"Lượt"} total={ListAccessLog.length}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 
export default ListAccessLog