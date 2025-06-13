import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../Header/Title";
import "./ListDevice.css";
import { faArrowsRotate, faCircleInfo, faCircleUser, faFingerprint, faLock, faPlus, faSearch, faTrash, faWifi } from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useState } from "react";
import PopupSearchingDevice from "./PopupSearchingDevice";
import { deleteDevice, getListDevice, getUnregisteredDevices, updateDevice } from "../../service/DeviceAPI";
import PopupCreateDevice from "./PopupCreateDevice";
import Loading from "../Loading/Loading";
import { fetchListDepartment } from "../../service/DepartmentAPI";
import Pagination from "../Pagination/Pagination";
import PopupDeviceDetail from "./PopupDeviceDetail";
import { toast } from "react-toastify";
import PopupConfirmDeleteDevice from "./PopupConfirmDeleteDevice";
import API_CONFIG from "../../config/ApiConfig";
import { io } from "socket.io-client";
const socket = io(API_CONFIG.API_HOST);

const ListDevice = () => {
    const [popupSearchingDevice, setPopupSearchingDevice] = useState(false);
    const [loadingPopupFindDevice, setLoadingPopupFindDevice] = useState(false);
    const [devices, setDevices] = useState([]);
    const [showConnectPopup,setShowConnectPopup] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listDepartment, setListDepartment] = useState([]);


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [listDevice, setListDevice] = useState([]);
    const [search, setSearch] = useState("");
    const [department_id, setDepartmentId] = useState(null);
    const [popupDetail, setPopupDetail] = useState(false);
    const [_id, setId] = useState(null);
    const [popupDeleteDevice, setPopupDeleteDevice] = useState(false);
    const [device_id, setDeviceId] = useState(null);

    const handleFindDevice = async () => {
        setLoadingPopupFindDevice(true);
        try {
            const res = await getUnregisteredDevices();
            if (res.status_code === 200) {
                setDevices(res.data);
            }
            else{
                setLoadingPopupFindDevice(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoadingPopupFindDevice(false);
            toast.error(res.message);
        }
        finally{
            setLoadingPopupFindDevice(false);
        }
    }
    const handleSearchClick = () => {
        setPopupSearchingDevice(true);
        handleFindDevice();
    };

    const handleConnectClick = (device) => {
        setPopupSearchingDevice(false);
        setSelectedDevice(device);
        setShowConnectPopup(true);
    };
    const handleClickInfo = (id) => {
        setId(id);
        setPopupDetail(true);
    }

    const handleFetchListDepartment = async () => {
        setLoading(true);
        try {
            const res = await fetchListDepartment(null, "asc", null);
            if (res.status_code === 200) {
                setListDepartment(res.data);
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi lấy danh sách phòng ban");
        }
        finally{
            setLoading(false);
        }
    }

    const handleFetchListDevice = async () => {
        setLoading(true);
        try {
            const res = await getListDevice(page, limit, search, "asc", department_id);
            if (res.status_code === 200) {
                setListDevice(res.data);
                setTotalPage(res.pagination.totalPages);
                setCurrentPage(res.pagination.page);
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi lấy danh sách thiết bị");
        }
        finally{
            setLoading(false);
        }
    }

    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleClickSearch = () => {
        setLoading(true);
        handleFetchListDevice();
    }

    const handleClickDelete = (id) => {
        setDeviceId(id);
        setPopupDeleteDevice(true);
    }

    const handleUpdateDevice = async (id, device_name) => {
        setLoading(true);
        try {
            const res = await updateDevice(id, device_name);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchListDevice();
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi thêm thiết bị");
        }
        finally{
            setLoading(false);
        }
    }

    const handleDeleteDevice = async (id) => {
        setLoading(true);
        try {
            const res = await deleteDevice(id);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchListDevice();
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra khi xóa thiết bị");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchListDepartment();
    }, []);

    useEffect(() => {
        handleFetchListDevice();
    }, [page]);

    useEffect(() => {
        const handleStatusUpdate = () => {
            handleFetchListDevice();
        };

        socket.on("device-status-updated", handleStatusUpdate);

        return () => {
            socket.off("device-status-updated", handleStatusUpdate);
        };
    }, [page, limit, search, department_id]);



    return (
        <>
            {popupSearchingDevice && 
            <PopupSearchingDevice 
                onClose={async () => {
                    setPopupSearchingDevice(false)
                    await handleFetchListDevice();
                }}
                loading={loadingPopupFindDevice}
                devices={devices}
                onConnectClick={handleConnectClick}
            
            />
            }

            {
                showConnectPopup && 
                <PopupCreateDevice 
                    onClose={async () => {
                        setShowConnectPopup(false);
                        await handleFetchListDevice();
                    }}
                    device={selectedDevice}
                />
            }
            {
                popupDetail && 
                <PopupDeviceDetail 
                    onClose={() => setPopupDetail(false)}
                    isVisible={popupDetail}
                    id={_id}
                    onUpdate={handleUpdateDevice}
                />
            }
            
            {
                loading && <Loading />
            }

            {
                popupDeleteDevice && 
                <PopupConfirmDeleteDevice 
                    onClose={() => setPopupDeleteDevice(false)}
                    onDelete={handleDeleteDevice} 
                    device_id = {device_id}
                />
            }
            <div className="list-device-container">
                <Title name={"Danh sách thiết bị"}/>
                <div className="list-device-container-content">
                    <div className="list-device-toolbar">
                        <div className="list-device-toolbar-create" onClick={handleSearchClick}>
                            <div className="list-device-toolbar-create-icon">
                                <FontAwesomeIcon icon={faWifi} />
                            </div>
                            <div className="list-device-toolbar-create-label" >
                                Tìm thiết bị
                            </div>
                        </div>
                        <div className="list-device-toolbar-search">
                            <input
                                type="text"
                                className="device-search-input"
                                placeholder="Tìm theo tên thiết bị..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                className="device-room-select"
                                value={department_id}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                                <option value="">Tất cả phòng</option>
                                {listDepartment.map((department) => (
                                    <option key={department._id} value={department._id}>
                                        {department.department_name}
                                    </option>
                                ))}
                            </select>

                             <button className="device-search-button" onClick={handleClickSearch}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    <div className="list-device-table">
                        <table className="list-device">
                            <thead>
                                <tr>
                                    <th>Thiết bị</th>
                                    <th>Tên thiết bị</th>
                                    <th>Trạng thái</th>
                                    <th>Địa chỉ</th>
                                    <th>Phòng ban</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listDevice.map((device, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="list-device-icon">
                                                <FontAwesomeIcon icon={faFingerprint} />
                                            </div>
                                        </td>
                                        <td>{device.device_name}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <div className={`list-device-status ${device.status === "ONLINE" ? "online" : "offline"}`}>
                                                {device.status}
                                            </div>
                                        </td>
                                        <td>{device.mac_address}</td>
                                        <td>{device.department_id.department_name}</td>
                                        <td>
                                            <div className="list-device-btn">
                                                <div className="list-device-btn-delete" onClick={() => handleClickDelete(device._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </div>
                                                <div className="list-device-btn-info" onClick={() => handleClickInfo(device._id)}>
                                                    <FontAwesomeIcon icon={faCircleInfo} />
                                                </div>
                                            </div>
                                        </td>
                                           
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="list-device-pagination">
                        <div className="list-device-pagination-left">
                            <div>
                                Trang: 
                            </div>
                            <div className="list-device-pagination-left-current-page">
                                {page}
                            </div>
                            <div>
                                /
                            </div>
                            <div>
                                {totalPage}
                            </div>
                        </div>
                        <div className="list-device-pagination-right">
                            <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} name={"Thiết bị"} total={listDevice.length}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListDevice;