import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Title from "../Header/Title";
import "./ListFingerprint.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {use, useEffect, useState } from "react";
import PopupRequestCreateFingerprint from "./PopupRequestCreateFingerprint";
import PopupCreateFingerprint from "./PopupCreateFingerprint";
import { deleteFingerprint, disableFingerprint, enableFingerprint, getListFingerprint } from "../../service/FingerprintAPI";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import { getListDevice } from "../../service/DeviceAPI";
import { fetchListStaff } from "../../service/StaffAPI";
import PopupFingerprintDetail from "./PopupFingerprintDetail";
import PopupEnableFingerprint from "./PopupEnableFingerprint";
import PopupConfirmDeleteFingerprint from "./PopupConfirmDeleteFingerprint";


const ListFingerprint = () => {

    const [loading, setLoading] = useState(false)
    const [showPopupRequestCreateFingerprint, setShowPopupRequestCreateFingerprint] = useState(false)
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    //pagination and filter
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [order, setOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [device_id, setDeviceId] = useState("");
    const [user_id, setUserId] = useState("");
    const [status, setStatus] = useState(null);
    const [listDevice, setListDevice] = useState([]);

    const [listFingerprint, setListFingerprint] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [id_department, setIdDepartment] = useState("");

    const [selectedFingerprint, setSelectedFingerprint] = useState(null);
    const [_id_fingerprint, setIdFingerprint] = useState(null);
    const [showDetailPopup, setShowDetailPopup] = useState(false);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedExpiryDate, setSelectedExpiryDate] = useState("");
    const [selectedFingerprintId, setSelectedFingerprintId] = useState("");

    const [showPopupConfirmDelete, setShowPopupConfirmDelete] = useState(false);

    const [id_fingerprint_db, setIdFingerprintDb] = useState(null);
    const [mac_address, setMacAddress] = useState(null);
    const [fingerprint_id, setFingerprintId] = useState(null);


    const handleOpenPopup = (id) => {
        setSelectedExpiryDate("");
        setSelectedFingerprintId(id);
         // reset ngày khi mở popup
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleFetchFingerprint = async () => {
        setLoading(true);
        try {
            const res = await getListFingerprint(page, limit, search, order, status, user_id, device_id);
            console.log("res", res);
            if(res.status_code === 200){
                setListFingerprint(res.data);
                setCurrentPage(res.pagination.page);
                setTotalPage(res.pagination.totalPages);
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
            
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi lấy danh sách vân tay");
        } finally {
            setLoading(false);
        }
    }

    const handleFetchListDevice = async () => {
        try {
            const res = await getListDevice(1, 1000000, null, null, null);
            console.log("res", res);
            if(res.status_code === 200){
                setListDevice(res.data);
            }
            else{
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lấy danh sách thiết bị");
        }
    }

    const handlePageChange = (page) => {
        setPage(page);
    }


    const handleRequestComplete = (department, device) => {
        setSelectedDepartment(department);
        setSelectedDevice(device);
        setShowPopupRequestCreateFingerprint(false);
        setShowCreatePopup(true);
    };

    const handleClickSearch = () => {
        handleFetchFingerprint();
    }

    useEffect(() => {
        handleFetchFingerprint();
    }, [page, showDetailPopup, showCreatePopup]);




    useEffect(() => {
        handleFetchListDevice();
    }, [showCreatePopup]);

    const handleViewDetail = (fingerprint) => {
        setSelectedFingerprint(fingerprint);
        setIdFingerprint(fingerprint._id);
        setShowDetailPopup(true);
    };

    const handleConfirm = async (id,expiryDate) => {
        setLoading(true);
        try {
            const res = await enableFingerprint(id, expiryDate);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchFingerprint();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi kích hoạt vân tay");
        } finally {
            setLoading(false);
        }
    }

    const handleDisableFingerprint = async (id) => {
        setLoading(true);
        try {
            const res = await disableFingerprint(id);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchFingerprint();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi vô hiệu hóa vân tay");
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteFingerprint = async (fingerprint_id, mac_address, _id) => {
        setLoading(true);
        try {
            const res = await deleteFingerprint(fingerprint_id, mac_address, _id);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchFingerprint();
            } else {
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi xóa vân tay");
        } finally {
            setLoading(false);
        }
    }

    const handleClickDelete = (fingerprint_id, mac_address, _id_fingerprint_db) => {
        setIdFingerprintDb(_id_fingerprint_db);
        setFingerprintId(fingerprint_id);
        setMacAddress(mac_address);
        setShowPopupConfirmDelete(true);
    }

    useEffect(() => {
        const fetchEmployeesByDepartment = async () => {
            if (!device_id) {
                setEmployees([]); // không có phòng thì để danh sách rỗng
                return;
            }

            try {
                const res = await fetchListStaff(id_department, 1, 1000000, null, null, null, "ACTIVE"); // bạn phải viết API này
                if (res.status_code === 200) {
                    setEmployees(res.data);
                } else {
                    setEmployees([]);
                    toast.error(res.message);
                }
            } catch (error) {
                setEmployees([]);
                toast.error("Không thể tải danh sách nhân viên");
            }
        };

        fetchEmployeesByDepartment();
    }, [device_id]);

    console.log("listFingerprint", listFingerprint);
    return (
        <>
            {showPopupRequestCreateFingerprint && <PopupRequestCreateFingerprint onClose={() => setShowPopupRequestCreateFingerprint(false)} onComplete={handleRequestComplete}/>}
            {showCreatePopup && 
                < PopupCreateFingerprint 
                    onClose={() => setShowCreatePopup(false)}
                    department={selectedDepartment}
                    device={selectedDevice}
                />
            
            }
            {loading && <Loading />}
            {showDetailPopup && <PopupFingerprintDetail onClose={() => setShowDetailPopup(false)} fingerprint={selectedFingerprint} _id_fingerprint = {_id_fingerprint}/>}
            <PopupEnableFingerprint
                isVisible={isPopupVisible}
                onClose={handleClosePopup}
                onConfirm={handleConfirm}
                initialExpiryDate={selectedExpiryDate}
                id ={selectedFingerprintId}
            />
            {showPopupConfirmDelete && 
                <PopupConfirmDeleteFingerprint 
                    onClose={() => setShowPopupConfirmDelete(false)} 
                    visible={showPopupConfirmDelete}
                    onConfirm={handleDeleteFingerprint}
                    fingerprint_id={fingerprint_id}
                    mac_address={mac_address}
                    _id_fingerprint_db={id_fingerprint_db}
                
                />
            }
            <div className="list-fingerprint-container">
                <Title name={"Danh sách vân tay"}/>
                <div className="list-fingerprint-container-content">
                    <div className="list-fingerprint-toolbar">
                        <div className="list-fingerprint-toolbar-create" onClick={() => setShowPopupRequestCreateFingerprint(true)}>
                            <div className="list-fingerprint-toolbar-create-icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div className="list-fingerprint-toolbar-create-label" >
                                Thêm vân tay
                            </div>
                        </div>
                        <div className="list-fingerprint-toolbar-filter">
                            <input 
                                type="text" 
                                placeholder="Tìm theo tên vân tay"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} 
                            
                            />
    
                            <select
                                value={device_id}
                                onChange={(e) => {
                                    const selectedDeviceId = e.target.value;
                                    setDeviceId(selectedDeviceId);

                                    // Tìm thiết bị được chọn trong listDevice để lấy department_id._id
                                    const selectedDevice = listDevice.find(device => device._id === selectedDeviceId);
                                    if (selectedDevice && selectedDevice.department_id) {
                                        setIdDepartment(selectedDevice.department_id._id);
                                    } else {
                                        setIdDepartment(""); // Nếu không tìm thấy thì reset
                                    }
                                }}
                            >
                                <option value="">Chọn phòng</option>
                                {listDevice.map((device) => (
                                    <option key={device._id} value={device._id}>
                                        {device.department_id.department_name}
                                    </option>
                                ))}
                            </select>
                            
                            <select
                                value={user_id}
                                onChange={(e) => {
                                    const selectedUserId = e.target.value;
                                    setUserId(selectedUserId);
                                }}
                            >
                                <option value="">Chọn nhân viên</option>
                                {employees.map((employee) => (
                                    <option key={employee._id} value={employee._id}>
                                        {`${employee.full_name} - ${employee.user_code}`}
                                    </option>
                                ))}
                                
                            </select>
                            
                            <button className="list-fingerprint-toolbar-filter-button" onClick={handleClickSearch}>Lọc</button>
                        </div>
                    </div>
                    <div className="list-fingerprint-table">
                        <div className="fingerprint-grid">
                            {listFingerprint.map((fp) => (
                                <div key={fp._id} className={`fingerprint-card ${fp.status.toLowerCase()}`}>
                                    <div className="card-inner">
                                        {/* Front side */}
                                        <div className="card-front">
                                            <img
                                                src={fp.user_id.avatar || "/default-avatar.png"}
                                                className="fingerprint-avatar"
                                                alt="Avatar"
                                            />
                                            <h4>{fp.user_id.full_name}</h4>
                                            <p><strong>ID:</strong> {fp.fingerprint_id}</p>
                                            <p><strong>Tên:</strong> {fp.fingerprint_name}</p>
                                            <p><strong>Phòng:</strong> {fp.device_id?.department_id?.department_name}</p>
                                            <span className={`status ${fp.status.toLowerCase()}`}>
                                                {fp.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                                            </span>
                                        </div>

                                            {/* Back side */}
                                        <div className="card-back">
                                            <button onClick={() => handleViewDetail(fp)}>Xem chi tiết</button>
                                            <button onClick={() => handleClickDelete(fp.fingerprint_id, fp.device_id.mac_address, fp._id)}>Xoá</button>
                                            {fp.status === "INACTIVE" && <button onClick={() => handleOpenPopup(fp._id)}>Kích hoạt</button>}
                                            {fp.status === "ACTIVE" && <button onClick={() => handleDisableFingerprint(fp._id)}>Vô hiệu hóa</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="list-fingerprint-table-pagination">
                            <div className="list-fingerprint-table-pagination-left">
                                <div>
                                    Trang: 
                                </div>
                                <div className="list-fingerprint-pagination-left-current-page">
                                    {page}
                                </div>
                                <div>
                                    /
                                </div>
                                <div>
                                    {totalPage}
                                </div>
                            </div>
                            <div className="list-fingerprint-table-pagination-right">
                                <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} name={"Vân Tay"} total={listFingerprint.length}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListFingerprint;