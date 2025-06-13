import { useState } from "react";
import "./ChangePasswordPopup.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import { changePasswordByUser, requestPasswordChange } from "../../service/AccountAPI";
import { toast } from "react-toastify";

const ChangePasswordPopup = ({onClose}) => {

    const email = localStorage.getItem("email");
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: nhập mật khẩu, 2: nhập OTP
    const [loading, setLoading] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(prevState => !prevState);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(prevState => !prevState);
    };

    const handleRequestOTP = async () => {
        setLoading(true);
        try {

            const responseOTP = await requestPasswordChange(email, currentPassword);
            if (responseOTP && responseOTP.status_code === 200) {
                setLoading(false);
                toast.success(responseOTP.message);
                setStep(2); // Chuyển sang bước nhập OTP
            } else {
                // Xử lý lỗi nếu cần
                setLoading(false);
                toast.error(responseOTP.message);
            }
            
        } catch (error) {
            toast.error("Có lỗi xảy ra trong quá trình gửi yêu cầu OTP.");
            setLoading(false);
        }
    }

    const handleChangePassword = async () => {
        setLoading(true);
        try {
            
            const response = await changePasswordByUser(email, newPassword, otp);
            if(response && response.status_code === 200){
                setLoading(false);
                toast.success(response.message);
                onClose();
            } else {
                setLoading(false);
                toast.error(response.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Có lỗi xảy ra");
            onClose();
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className="change-passowrd-popup-overlay">
                <div className="change-passowrd-popup-content">
                    <div className="change-passowrd-popup-header">
                        <h3>Đổi mật khẩu</h3>
                        <button className="change-passowrd-popup-close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="password-input-container">
                        <label>Mật khẩu hiện tại:</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                disabled={step === 2}
                            />
                            <span className="password-toggle-icon" onClick={toggleCurrentPasswordVisibility}>
                                <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </div>
                    <div className="password-input-container">
                        <label>Mật khẩu mới:</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                disabled={step === 2}
                            />
                            <span className="password-toggle-icon" onClick={toggleNewPasswordVisibility}>
                                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </div>
                    {step === 1 && (
                        <button className="change-passowrd-popup-continue-button" onClick={handleRequestOTP}>Tiếp tục</button>
                    )}

                    {step === 2 && (
                        <>
                            <label>OTP (gửi về email):</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                            />
                            <div className="change-passowrd-popup-actions">
                                <button onClick={handleChangePassword}>Xác nhận</button>
                                <button onClick={onClose}>Hủy</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ChangePasswordPopup;