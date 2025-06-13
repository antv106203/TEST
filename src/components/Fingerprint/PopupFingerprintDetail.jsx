import { use, useEffect, useState } from "react";
import { formatAccessTime } from "../../utils/DateUtils";
import "./PopupFingerprintDetail.css"
import { getFingerprintDetail, updateFingerprint } from "../../service/FingerprintAPI";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const PopupFingerprintDetail = ({ onClose, fingerprint, handleUpdate, _id_fingerprint }) => {

    const [detailFingerprint, setDetailFingerprint] = useState({});
    const [loading, setLoading] = useState(false);
    const [fingerprintName, setFingerprintName] = useState("");
    const [expiryAt, setExpiryAt] = useState("");

    const handleFetchDetailFingerprint = async () => {
        setLoading(true);
        try {
            const response = await getFingerprintDetail(_id_fingerprint);

            if (response.status_code === 200) {
                setDetailFingerprint(response.data);
                setFingerprintName(response.data.fingerprint_name);
                setExpiryAt(response.data.expiry_at);
            } else {
                setLoading(false);
                toast.error(response.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching fingerprint detail:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateFingerprint = async () => {
        setLoading(true);
        try {
            const response = await updateFingerprint(_id_fingerprint, fingerprintName, expiryAt);

            if (response.status_code === 200) {
                toast.success(response.message);
                onClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Error updating fingerprint:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchDetailFingerprint()
    }, [])
    return (
        <>
            {loading && <Loading />}
            <div className="popup-detail-fingerprint-overlay">
                <div className="popup-detail-fingerprint-content">
                    <div className="popup-detail-fingerprint-header">
                        <h2>Thông tin vân tay</h2>
                        <button className="popup-detail-fingerprint-close-icon" onClick={onClose}>×</button>
                    </div>
                    
                    <div className="popup-detail-fingerprint-avatar">
                        <img
                            src={fingerprint.user_id?.avatar || "/default-avatar.png"}
                            alt="Avatar"
                        />
                    </div>
                    <div className="popup-detail-fingerprint-info">
                        <p><strong>Tên nhân viên:</strong> {detailFingerprint.user_id?.full_name}</p>
                        <p><strong>Mã nhân viên:</strong> {detailFingerprint.user_id?.user_code}</p>
                        <div className="popup-detail-fingerprint-row">
                            <label>Tên vân tay:</label>
                            <input
                                type="text"
                                className="popup-detail-fingerprint-input"
                                value={fingerprintName}
                                onChange={(e) => setFingerprintName(e.target.value)}
                                placeholder="Nhập tên vân tay"
                            />
                        </div>
                        <p><strong>ID vân tay:</strong> {detailFingerprint.fingerprint_id}</p>
                        <p><strong>Trạng thái:</strong> {detailFingerprint.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}</p>
                        <div className="popup-detail-fingerprint-row">
                            <label>Hạn sử dụng:</label>
                            <input
                                type="date"
                                className="popup-detail-fingerprint-input"
                                value={
                                    expiryAt
                                    ? new Date(detailFingerprint.expiry_at).toISOString().split("T")[0]
                                    : ""
                                }
                                onChange={(e) => setExpiryAt(e.target.value)}
                                disabled={detailFingerprint.status === "INACTIVE"}
                            />
                        </div>
                        <p><strong>Phòng ban:</strong> {detailFingerprint.device_id?.department_id?.department_name}</p>
                    </div>
                    <button className="popup-detail-fingerprint-update-button" onClick={handleUpdateFingerprint}>
                        Cập nhật
                    </button>
                    <button className="popup-detail-fingerprint-close-button" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopupFingerprintDetail;