import { useState } from "react";
import "./CreateAccount.css";

const CreateAccount = ({ visible, onClose, onConfirm }) => {

    if (!visible) return null;

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleConfirm = () => {
        onConfirm(email, role);
    }


    return (
        <div className="popup-create-account-overlay">
            <div className="popup-create-account-popup-box">
                <h3>Tạo tài khoản mới</h3>
                <div className="popup-create-account-popup-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                    />
                </div>
                <div className="popup-create-account-popup-field">
                    <label>Vai trò:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Chọn vai trò</option>
                        <option value="ADMIN">Quản lý</option>
                        <option value="GAURD">Nhân viên an ninh</option>
                    </select>
                </div>
                <div className="popup-create-account-popup-actions">
                    <button className="popup-create-account-btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="popup-create-account-btn-confirm" onClick={handleConfirm}>Xác nhận</button>
                </div>
            </div>
        </div>
    )

}

export default CreateAccount;