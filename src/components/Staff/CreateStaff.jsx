import { useEffect, useState } from "react";
import Title from "../Header/Title";
import AvatarUploader from "./AvatarUploader";
import "./CreateStaff.css";
import { fetchListDepartment } from "../../service/DepartmentAPI";
import { createNewUser } from "../../service/StaffAPI";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const CreateStaff = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        full_name: "",
        user_code: "",
        email: "",
        department_id: null,
        phone_number: "",
        date_of_birth: "",
        sex: ""
    });

    const [loading, setLoading] = useState(false);

    const [listDepartment, setListDepartment] = useState([]);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleAvatarUpload = (file) => {
        setAvatarFile(file);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        let processedValue = value;

        if (name === "date_of_birth") {
            processedValue = value === "" ? null : value;
        }

        setUserData((prevData) => ({
            ...prevData,
            [name]: processedValue,
        }));
    };



    const getListDepartment = async () => {
        const result = await fetchListDepartment(null,null, null);
        setListDepartment(result.data);
    }

    const handleSubmit = async () => {
        setLoading(true);
        // Handle form submission logic here
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        for (let key in userData) {
            // Bỏ qua nếu là chuỗi rỗng hoặc null (đặc biệt quan trọng với ObjectId như department_id)
            if (userData[key] !== "" && userData[key] !== null) {
                formData.append(key, userData[key]);
            }
        }
        // Send formData to your API endpoint
        try {

            const res = await createNewUser(formData);
            if(res.status_code === 201){
                toast.success(res.message);
                setTimeout(() => {
                    navigate(-1);
                }, 500);
            }
            else{
                toast.error(
                    <div>
                        {(res.message).map((msg, idx) => (
                            <div key={idx}>{msg}</div>
                        ))}
                    </div>
                );
            }
        }
        catch (error) {
            toast.error("Có lỗi xảy ra khi tạo người dùng!");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListDepartment()
    }, []);

    console.log(userData);
    return (
        <>
            {loading && (
                <Loading />
            )}
            <div className="create-staff-container">
                <Title name={"Thêm mới nhân viên"} />
                <div className="create-staff-content-container">
                    <div className="create-staff-content">
                        <div className="create-staff-content-left">
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Tên nhân viên <span style={{ color: "red" }}>*</span>
                                </div>
                                <div className="create-staff-info-input">
                                    <input 
                                        type="text" 
                                        placeholder="Nhập tên nhân viên"
                                        name="full_name"
                                        value={userData.full_name}
                                        onChange={handleChangeInput} 
                                    />
                                </div>
                            </div>
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Mã nhân viên <span style={{ color: "red" }}>*</span>
                                </div>
                                <div className="create-staff-info-input">
                                    <input 
                                        type="text" 
                                        placeholder="Nhập mã nhân viên" 
                                        name="user_code"
                                        value={userData.user_code}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Email <span style={{ color: "red" }}>*</span>
                                </div>
                                <div className="create-staff-info-input">
                                    <input 
                                        type="email" 
                                        placeholder="Nhập email nhân viên"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChangeInput} 
                                    />
                                </div>
                            </div>
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Giới tính <span style={{ color: "red" }}>*</span>
                                </div>
                                <div className="create-staff-info-input">
                                    <label style={{ marginRight: '10px' }}>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="NAM"
                                        onChange={handleChangeInput}
                                        checked={userData.sex === "NAM"}
                                    />
                                        Nam
                                    </label>
                                    <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="NỮ"
                                        onChange={handleChangeInput}
                                        checked={userData.sex === "NỮ"}
                                    />
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="create-staff-content-right">
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Phòng <span style={{ color: "red" }}>*</span>
                                </div>
                                <div className="create-staff-info-input">
                                    <select 
                                        name="department_id"
                                        value={userData.department_id}
                                        onChange={handleChangeInput}
                                    >
                                        <option value={""}>Chọn phòng ban</option>
                                        {listDepartment.map((department) => (
                                            <option key={department._id} value={department._id}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Số điện thoại
                                </div>
                                <div className="create-staff-info-input">
                                    <input 
                                        type="text" 
                                        placeholder="Nhập số điện thoại"
                                        name="phone_number"
                                        value={userData.phone_number}
                                        onChange={handleChangeInput} 
                                    />
                                </div>
                            </div>
                            <div className="create-staff-info">
                                <div className="create-staff-info-label">
                                    Ngày sinh
                                </div>
                                <div className="create-staff-info-input">
                                    <input 
                                        type="date" 
                                        placeholder="Nhập ngày sinh"
                                        name="date_of_birth"
                                        value={userData.date_of_birth}
                                        onChange={handleChangeInput} 
                                    />
                                </div>
                            </div>
                            <div className="create-staff-info1">
                                <div className="create-staff-info-label">
                                    Ảnh chân dung
                                </div>
                                <AvatarUploader onAvatarChange={handleAvatarUpload}/>
                            </div>
                        </div>
                    </div>
                    <div className="create-staff-button-container">
                        <button className="create-staff-button-cancel" onClick={() => navigate("/at/staff")}>Hủy</button>
                        <button className="create-staff-button-create" onClick={handleSubmit}>Thêm mới</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CreateStaff;  