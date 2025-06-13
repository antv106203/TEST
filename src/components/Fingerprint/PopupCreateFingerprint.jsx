import { use, useEffect, useState } from "react";
import "./PopupCreateFingerprint.css"
import { fetchListStaff } from "../../service/StaffAPI";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { createFingerprint } from "../../service/FingerprintAPI";

const PopupCreateFingerprint = ({ onClose, department, device }) => {

    const [loading, setLoading] = useState(false)
    const [listStaff, setListStaff] = useState([])
    const [fingerprint_id, setFingerprintId] = useState(null);
    const [fingerprint_name, setFingerprintName] = useState("");
    const [expiry_at, setExpiryAt] = useState(null);
    const [user_id, setUserId] = useState(null);

    
    const handleFetchListStaff = async() => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await fetchListStaff(department, 1,1000000, null, null, null,"ACTIVE");
            if (res.status_code === 200) {
                setListStaff(res.data)
            }
            else{
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
                setLoading(false);
                toast.error(error);
        } finally {
            setLoading(false)
        }
    }

    const handleCreateFingerprint = async () => {
        setLoading(true)
        try {
            // Simulate an API call
            const res = await createFingerprint(fingerprint_id, fingerprint_name, expiry_at, user_id, device);
            if (res.status_code === 201) {
                toast.success(res.message);
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
        handleFetchListStaff();
    }, [])
    return (
        <>
            {loading && <Loading/>}
            <div className="popup-create-fingerprint-overlay">
                <div className="popup-create-fingerprint-content">

                    <div className="popup-create-fingerprint-header">
                        <h2>Tạo vân tay mới</h2>
                        <button className="popup-create-fingerprint-close" onClick={onClose}>×</button>
                    </div>

                    <label>Tên nhân viên:</label>
                    <select
                        defaultValue=""
                        value={user_id}
                        onChange={(e) => {
                            setUserId(e.target.value);
                        }}

                    >
                        <option value="">-- Chọn nhân viên --</option>
                        {listStaff.map((staff) => (
                            <option key={staff._id} value={staff._id}>
                                {`${staff.full_name} - ${staff.user_code}`}
                            </option>
                        ))}
                    </select>

                    <label>Tên vân tay:</label>
                    <input 
                        type="text" 
                        placeholder="Nhập tên vân tay"
                        value={fingerprint_name}
                        onChange={(e) => setFingerprintName(e.target.value)} 
                    />

                    <label>ID vân tay:</label>
                    <input 
                        type="number" 
                        placeholder="Nhập ID"
                        value={fingerprint_id}
                        onChange={(e) => setFingerprintId(e.target.value)} 
                    />

                    <label>Hạn sử dụng:</label>
                    <input 
                        type="date"
                        placeholder="Nhập hạn sử dụng"
                        value={expiry_at}
                        onChange={(e) => setExpiryAt(e.target.value)} 
                    />

                    <div className="popup-create-fingerprint-buttons">
                        <button onClick={onClose}>Hủy</button>
                        <button onClick={handleCreateFingerprint}>Hoàn thành</button>
                    </div>
                </div>
            </div>
        </>

    )
}
export default PopupCreateFingerprint