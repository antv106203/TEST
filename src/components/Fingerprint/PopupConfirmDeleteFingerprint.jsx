import "./PopupConfirmDeleteFingerprint.css"

const PopupConfirmDeleteFingerprint = ({visible, onClose, onConfirm, fingerprint_id, mac_address, _id_fingerprint_db}) => {

    if (!visible) return null;
    return (
        <div className="popup-confirm-delete-overlay">
            <div className="popup-confirm-delete-box">
                <h3>Xác nhận xóa vân tay</h3>
                <p>Bạn có chắc muốn xóa vân tay này không?</p>
                <div className="popup-confirm-delete-actions">
                    <button className="popup-confirm-delete-btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="popup-confirm-delete-btn-confirm" onClick={() => {onConfirm(fingerprint_id, mac_address, _id_fingerprint_db); onClose()}}>Xác nhận</button>
                </div>
            </div>
        </div>
    )

}

export default PopupConfirmDeleteFingerprint