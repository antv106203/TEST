/* eslint-disable no-unused-vars */
import { useState } from "react";
import Title from "../Header/Title";
import "./CreateDepartmentPopup.css"

const CreateDepartment = ({ onClose, onSubmit}) => {
    const [department, setDepartment] = useState({
        floor: null,
        department_name: null,
        department_code: null
    })

    const handleSubmit = () => {
        onSubmit(department);
        onClose();
      };

    return(
        <div className="create-department-popup-overlay">
            <div className="create-department-popup">
                <div className="create-department-header">
                    <h3>Thêm phòng</h3>
                    <div className="create-department-button-cancel" onClick={onClose}>
                        X
                    </div>
                </div>
                <div className="create-department-popup-content">
                    <div className="create-department-floor">
                        <div className="create-department-floor-label">
                            Tầng <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </div>
                        <div className="create-department-floor-select">
                            <select 
                                value={department.floor || ""}
                                onChange={(e) => setDepartment({ ...department, floor: e.target.value })}
                            >
                                <option value="">Chọn</option>
                                <option value="Tầng 1">Tầng 1</option>
                                <option value="Tầng 2">Tầng 2</option>
                                <option value="Tầng 3">Tầng 3</option>
                                <option value="Tầng 4">Tầng 4</option>
                                <option value="Tầng 5">Tầng 5</option>
                                <option value="Tầng 6">Tầng 6</option>
                            </select>
                        </div>
                    </div>
                    <div className="create-department-name">
                        <div className="create-department-name-label">
                            Tên phòng <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </div>
                        <div className="create-department-name-input">
                            <input 
                                type="text"
                                value={department.department_name || ""}
                                onChange={(e) => setDepartment({ ...department, department_name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="create-department-code">
                        <div className="create-department-code-label">
                            Mã phòng <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                        </div>
                        <div className="create-department-code-input">
                            <input 
                                type="text"
                                value={department.department_code || ""}
                                onChange={(e) => setDepartment({ ...department, department_code: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-department-popup-actions">
                    <button className="create-department-popup-actions-cancel-btn" onClick={onClose}>Hủy</button>
                    <button className="create-department-popup-actions-submit-btn" onClick={handleSubmit}>Thêm</button>
                </div>
            </div>
        </div>
    )
}
export default CreateDepartment;