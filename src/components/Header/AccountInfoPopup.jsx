import { toast } from "react-toastify";
import { getAccountByEmail } from "../../service/AccountAPI";
import "./AccountInfoPopup.css"
import { use, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { formatAccessTime } from "../../utils/DateUtils";
// const account = {
//     email: localStorage.getItem("email"),
//     role: localStorage.getItem("role"),
//     createdAt: "jflkff",
//     updatedAt: "lhfjflkf",
// }
const AccountInfoPopup = ({ open, onClose }) => {

    if (!open) return null;

    const email = localStorage.getItem("email");
    const [account, setAccount] = useState(null)

    const [loading, setLoading] = useState(false);

    const handleFetchAccountInfo = async () => {
        setLoading(true);
        try {
            const response = await getAccountByEmail(email);
            if (response && response.status_code === 200) {
                setAccount(response.data[0]);
            }

        } catch (error) {
            toast.error(response.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchAccountInfo();
    }, [])

    console.log(account);
    return (
        <>
            {loading && <Loading />}
            <div className="account-info-popup-overlay">
                <div className="account-info-popup">
                    <div className="account-info-popup-header">
                        <h2>Thông tin tài khoản</h2>
                        <span className="account-info-popup-close-btn" onClick={onClose}>&times;</span>
                    </div>
                    <div className="account-info-popup-content">
                        <div className="account-info-popup-info-row">
                            <span className="account-info-popup-info-label">Email:</span>
                            <span className="account-info-popup-info-value">{account?.email}</span>
                        </div>
                        <div className="account-info-popup-info-row">
                            <span className="account-info-popup-info-label">Vai trò:</span>
                            {/* <span className="account-info-popup-info-value">{account?.role}</span> */}
                            {
                                account?.role === "ADMIN" ? <span className="account-info-popup-info-value">Quản lý</span> : <span className="account-info-popup-info-value">Nhân viên an ninh</span>
                            }
                        </div>
                        <div className="account-info-popup-info-row">
                            <span className="account-info-popup-info-label">Ngày tạo:</span>
                            <span className="account-info-popup-info-value">{formatAccessTime(account?.createdAt)}</span>
                        </div>
                        <div className="account-info-popup-info-row">
                            <span className="account-info-popup-info-label">Ngày cập nhật:</span>
                            <span className="account-info-popup-info-value">{formatAccessTime(account?.updatedAt)}</span>
                        </div>
                        <div className="account-info-popup-footer">
                            <button onClick={onClose}>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccountInfoPopup;