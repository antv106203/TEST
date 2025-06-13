import "./PopupConfirmDelete.css"

const PopupConfirmDelete  = ({ visible, onClose, onConfirm, email }) => {

    if (!visible) return null;
    return (
        <div className="popup-confirm-delete-overlay">
            <div className="popup-confirm-delete-box">
                <h3>Xác nhận xóa tài khoản</h3>
                <p>Bạn có chắc muốn xóa tài khoản <strong>{email}</strong> không?</p>
                <div className="popup-confirm-delete-actions">
                    <button className="popup-confirm-delete-btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="popup-confirm-delete-btn-confirm" onClick={() => onConfirm(email)}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}

export default PopupConfirmDelete