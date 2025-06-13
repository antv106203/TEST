import { useEffect, useState } from "react"
import "./PopupRequestCreateFingerprint.css"
import Loading from "../Loading/Loading"
import { fetchListDepartment } from "../../service/DepartmentAPI"
import { toast } from "react-toastify"
import { getListDevice } from "../../service/DeviceAPI"
import { requestCreateFingerprint } from "../../service/FingerprintAPI"
import scanFingerprintImg from "../../assets/scan-fingerprint.png";
const PopupRequestCreateFingerprint = ({ onClose, onComplete }) => {

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1);
    const [listDevice, setListDevice] = useState([])
    const [mac_address, setMacAddress] = useState(null);

    const handleFetchListDepartment = async() => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await getListDevice(null, 100, null, null, null);
            if (res.status_code === 200) {
                setListDevice(res.data)
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRequestCreateFingerprint = async () => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await requestCreateFingerprint(mac_address);
            if (res.status_code === 200) {
                setStep(2);
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
    const handleRetryRequestCreateFingerprint = async () => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await requestCreateFingerprint(mac_address);
            if (res.status_code === 200) {
                toast.success("Yêu cầu quét vân tay thành công");
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

    const handleComplete = () => {
        const selected = listDevice.find(d => d.mac_address === mac_address);
        if (selected && selected.department_id) {
            onComplete(selected.department_id._id, selected._id);
        }
    };
    useEffect(() => {
        handleFetchListDepartment()
    }, [])
    return (
        <>
            {loading && <Loading />}
            <div className="request-add-fingerprint-overlay">
                <div className="request-add-fingerprint-popup">
                    <div className="request-add-fingerprint-popup-header">
                        <h3>Yêu cầu thêm vân tay</h3>
                        <button className="request-add-fingerprint-close-btn" onClick={onClose}>×</button>
                    </div>

                    {step === 1 && (
                        <>
                            <div className="request-add-fingerprint-step1">
                                <label>Chọn phòng:</label>
                                <select
                                    value={mac_address}
                                    onChange={(e) => {
                                        setMacAddress(e.target.value);
                                    }}
                                >
                                    <option value={null}>Chọn phòng</option>
                                    {listDevice.map((device) => (
                                        <option key={device._id} value={device.mac_address}>
                                            {device.department_id.department_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="request-add-fingerprint-popup-actions">
                                <button className="request-add-fingerprint-cancel-btn" onClick={onClose}>Hủy</button>
                                <button className="request-add-fingerprint-confirm-btn" onClick={handleRequestCreateFingerprint}>Quét vân tay</button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                         <>
                            <div className="fingerprint-scan-instruction">
                                <img src={scanFingerprintImg} alt="Scan fingerprint" />
                                <p>Hãy đặt ngón tay lên máy quét...</p>
                            </div>
                            <div className="request-add-fingerprint-popup-actions">
                                <button className="request-add-fingerprint-confirm-btn" onClick={handleComplete}>Hoàn thành</button>
                                <button className="request-add-fingerprint-retry-btn" onClick={handleRetryRequestCreateFingerprint}>Yêu cầu lại</button>
                                <button className="request-add-fingerprint-cancel-btn" onClick={onClose}>Hủy</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default PopupRequestCreateFingerprint