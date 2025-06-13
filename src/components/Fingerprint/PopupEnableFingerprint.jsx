import { useState } from "react";
import "./PopupEnableFingerprint.css"

const PopupEnableFingerprint = ({onClose, onConfirm, isVisible, initialExpiryDate = "",id}) => {

    const [expiryDate, setExpiryDate] = useState(initialExpiryDate);

    const handleConfirm = () => {
        onConfirm(id, expiryDate);
        onClose();
        setExpiryDate("");
    };

    console.log(expiryDate)

    if (!isVisible) return null;
    return (
        <div className="popup-enable-fingerprint-overlay">
            <div className="popup-enable-fingerprint-content" role="dialog" aria-modal="true" aria-labelledby="popup-title">
                <div className="popup-enable-fingerprint-header">
                    <h2 id="popup-title">Kích hoạt vân tay</h2>
                    <button 
                        className="popup-enable-fingerprint-close-icon" 
                        onClick={onClose} 
                        aria-label="Đóng popup"
                    >
                        &times;
                    </button>
                </div>

                <div className="popup-enable-fingerprint-row">
                    <label htmlFor="expiry-date-input">Hạn sử dụng:</label>
                    <input
                        id="expiry-date-input"
                        type="date"
                        className="popup-enable-fingerprint-input"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>

                <button 
                    className="popup-enable-fingerprint-button popup-enable-fingerprint-confirm"
                    onClick={handleConfirm}
                    disabled={!expiryDate}
                >
                    Xác nhận
                </button>
                <button 
                    className="popup-enable-fingerprint-button popup-enable-fingerprint-cancel"
                    onClick={onClose}
                >
                    Hủy
                </button>
            </div>
        </div>
    )
}
export default PopupEnableFingerprint;