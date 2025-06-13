import "./PopupConfirmDeleteDevice.css"

const PopupConfirmDeleteDevice = ({onClose, onDelete, device_id}) => {

    const handleDeleteDevice = () => {
        onDelete(device_id);
        onClose();
    }
    return(
        <div className="popup-confirm-delete-overlay">
            <div className="popup-confirm-delete-box">
                <h3>Xác nhận xóa thiết bị</h3>
                <p>Bạn có chắc muốn xóa thiết bị này không?</p>
                <div className="popup-confirm-delete-actions">
                    <button className="popup-confirm-delete-btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="popup-confirm-delete-btn-confirm" onClick={handleDeleteDevice}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}

export default PopupConfirmDeleteDevice;