import { toast } from "react-toastify";
import { getDeviceDetail } from "../../service/DeviceAPI";
import "./PopupDeviceDetail.css"
import { useEffect, useState } from "react";

const PopupDeviceDetail = ({ isVisible, onClose, onUpdate, id }) => {

    if (!isVisible) {
        return null;
    }

    const [detailDevice, setDetailDevice] = useState({});

    const handleFetchDetailDevice = async () => {
        try {
            const response = await getDeviceDetail(id);
            if (response.status_code === 200) {
                setDetailDevice(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy thông tin thiết bị");
        }
    }

    const handleUpdateDevice = async () => {
        onUpdate(id, detailDevice.device_name);
        onClose();
    }

    useEffect(() => {
        handleFetchDetailDevice();
    }, []);

    return (
        <div className="popup-device-detail-overlay">
            <div className="popup-device-detail-content">
                <div className="popup-device-detail-header">
                    <h2>Chi tiết thiết bị</h2>
                    <button className="popup-device-detail-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="popup-device-detail-form">
                    <div className="form-group">
                        <label>Tên thiết bị:</label>
                        <input
                            type="text"
                            value={detailDevice.device_name}
                            onChange={(e) => setDetailDevice({ ...detailDevice, device_name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Địa chỉ MAC:</label>
                        <input
                            type="text"
                            value={detailDevice.mac_address}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Tên phòng:</label>
                        <input
                            type="text"
                            value={detailDevice?.department_id?.department_name}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <input
                            type="text"
                            value={detailDevice.status}
                            disabled
                        />
                    </div>
                </div>

                <div className="popup-device-detail-actions">
                    <button className="btn btn-update" onClick={handleUpdateDevice}>
                        Cập nhật
                    </button>
                    <button className="btn btn-cancel" onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}
export default PopupDeviceDetail;