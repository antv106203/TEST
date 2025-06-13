import { useState } from "react";
import "./PopupUpdateDepartment.css"

const PopupUpdateDepartment = ({onClose, department, onUpdate }) => {


    const [department_name, setDepartmentName] = useState(department.department_name);
    const [department_code, setDepartmentCode] = useState(department.department_code);
    const [floor, setFloor] = useState(department.floor);
    const _id = department._id;
    const handleSubmit = () => {
        onUpdate(_id, department_name, department_code, floor);
        onClose();

    };
    return (
        <div className="popup-update-department-overlay">
            <div className="popup-update-department-content">
                <button className="popup-update-department-close-btn" onClick={onClose}>&times;</button>
                <h2>Thông tin phòng ban</h2>

                <div className="popup-update-department-form">
                    <label>Tầng:</label>
                    <select 
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                    >
                        {[1, 2, 3, 4, 5, 6].map((f) => (
                        <option key={f} value={`Tầng ${f}`}>Tầng {f}</option>
                        ))}
                    </select>

                    <label>Tên phòng:</label>
                    <input
                        type="text"
                        value={department_name}
                        onChange={(e) => setDepartmentName(e.target.value)}
                    />

                    <label>Mã phòng:</label>
                    <input
                        type="text"
                        value={department_code}
                        onChange={(e) => setDepartmentCode(e.target.value)}
                    />
                </div>

                <div className="popup-update-department-actions">
                    <button className="popup-update-department-btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="popup-update-department-btn-update" onClick={handleSubmit}>Cập nhật</button>
                </div>
            </div>
        </div>
    )
}

export default PopupUpdateDepartment