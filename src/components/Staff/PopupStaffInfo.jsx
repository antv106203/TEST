import { useState } from "react";
import "./PopupStaffInfo.css"
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { updateStaff } from "../../service/StaffAPI";

const PopupStaffInfo = ({ onClose, user }) => {
    const [formData, setFormData] = useState({
        full_name: user.full_name || "",
        email: user.email || "",
        sex: user.sex || "",
       date_of_birth: user.date_of_birth
        ? new Date(user.date_of_birth).toISOString().split("T")[0]
        : "",
        phone_number: user.phone_number || "",
        avatar: user.avatar || ""
    });

    const [loading, setLoading] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const id = user._id;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file); // <-- lưu file để gửi đi
            const imageURL = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, avatar: imageURL })); // dùng để hiển thị preview
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const formDataToSend = new FormData();

            // Nếu người dùng không chọn ảnh mới, avatar sẽ là URL cũ -> gửi nó như 1 text
            if (avatarFile) {
                formDataToSend.append("avatar", avatarFile); // Gửi file mới
            } else {
                formDataToSend.append("avatar", formData.avatar); // Gửi đường dẫn cũ
            }

            // Gửi các trường còn lại
            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("sex", formData.sex);
            formDataToSend.append("date_of_birth", formData.date_of_birth);
            formDataToSend.append("phone_number", formData.phone_number);

            const res = await updateStaff(formDataToSend, id);

            if (res.status_code === 200) {
                toast.success("Cập nhật thành công!");
                onClose();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(`${error}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <Loading />}
            <div className="employee-popup-overlay">
                <div className="employee-popup">
                    <button className="employee-popup-close-btn" onClick={onClose}>×</button>
                    <h2 className="employee-popup-title">Thông tin nhân viên</h2>
                    <div className="employee-popup-content">
                        <div className="employee-popup-avatar-section">
                            <label htmlFor="avatar-upload" className="employee-avatar-label">
                                <img src={formData.avatar} alt="Avatar" className="employee-popup-avatar" />
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="employee-popup-avatar-input"
                            />
                        </div>
                        <div className="employee-popup-form">
                            <label>
                                Họ và tên
                                <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="employee-popup-input"
                                />
                            </label>
                            <label>
                                Email
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="employee-popup-input"
                                />
                            </label>
                            <label>
                                Giới tính
                                <select
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                className="employee-popup-input"
                                >
                                <option value="">Chọn giới tính</option>
                                <option value="NAM">Nam</option>
                                <option value="NỮ">Nữ</option>
                                </select>
                            </label>
                            <label>
                                Ngày sinh
                                <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="employee-popup-input"
                                />
                            </label>
                            <label>
                                Số điện thoại
                                <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="employee-popup-input"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="employee-popup-actions">
                        <button className="employee-popup-btn cancel" onClick={onClose}>Hủy</button>
                        <button className="employee-popup-btn update" onClick={handleUpdate}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopupStaffInfo;
