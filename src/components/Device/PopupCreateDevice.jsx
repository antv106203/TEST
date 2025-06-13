import { use, useEffect, useState } from "react";
import "./PopupCreateDevice.css";
import { fetchListDepartment } from "../../service/DepartmentAPI";
import Loading from "../Loading/Loading";
import { createDevice } from "../../service/DeviceAPI";
import { toast } from "react-toastify";

const PopupCreateDevice = ({ onClose, device}) => {

    const [loading, setLoading] = useState(false);

    const [department_id, setDepartment_id] = useState(null);
    const [listDepartment, setListDepartment] = useState([]);

    const [device_name, setDeviceName] = useState("");

    const handleFetchListDepartment = async() => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await fetchListDepartment(null, null, null);
            if (res.status_code === 200) {
                setListDepartment(res.data)
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
                setLoading(false);
                toast.error(res.message);
        } finally {
            setLoading(false)
        }
    }
    const handleCreateDevice = async () => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await createDevice(device_name, department_id, device.mac_address);
            if (res.status_code === 201) {
                toast.success("Kết nối thiết bị thành công");
                onClose();
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchListDepartment();
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
            <div className="popup-create-device-overlay">
                <div className="popup-create-device-content">
                    <div className="popup-create-device-header">
                        <h3>Kết nối thiết bị</h3>
                        <button className="popup-create-device-close-btn" onClick={onClose}>
                        X
                        </button>
                    </div>
                    <div className="popup-create-device-form-group">
                        <label>Phòng ban</label>
                        <select
                            value={department_id}
                            onChange={(e) => {
                                setDepartment_id(e.target.value);
                            }}
                            defaultValue={""}
                        >
                            <option value={""} disabled>-- Chọn phòng ban --</option>
                            {listDepartment.map((department) => (
                                <option key={department._id} value={department._id}>
                                    {department.department_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="popup-create-device-form-group">
                        <label>Tên thiết bị</label>
                        <input  
                            type="text"
                            value={device_name}
                            onChange={(e) => {
                                setDeviceName(e.target.value);
                            }}
                        
                        />
                    </div>
                    <div className="popup-create-device-form-group">
                        <label>Địa chỉ MAC</label>
                        <input type="text" value={device.mac_address} disabled />
                    </div>
                    <button className="popup-create-device-btn-save" onClick={handleCreateDevice}>
                    Lưu kết nối
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopupCreateDevice;