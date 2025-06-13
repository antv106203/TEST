import { useNavigate, useParams } from "react-router-dom"
import Title from "../Header/Title"
import "./StaffDetail.css"
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { getDetailStaff } from "../../service/StaffAPI";
import { toast } from "react-toastify";
import { formatAccessTime, formatDateOnly } from "../../utils/DateUtils";
import image_finger from "../../assets/fingerprint.png"
import emptyImage from "../../assets/emptybox.png"
import { deleteFingerprint, disableFingerprint, enableFingerprint } from "../../service/FingerprintAPI";
import PopupEnableFingerprint from "../Fingerprint/PopupEnableFingerprint";
import PopupConfirmDeleteFingerprint from "../Fingerprint/PopupConfirmDeleteFingerprint";
import PopupStaffInfo from "./PopupStaffInfo";

const StaffDetail = () => {

    const navigate = useNavigate();

    const {_id} = useParams();

    const [detailStaff, setDetailStaff] = useState({});
    const [loading, setLoading] = useState(false);
    const [listFingerprint, setListFingerprint] = useState([]);
    
    //enable fingerprint
    const [selectedExpiryDate, setSelectedExpiryDate] = useState("");
    const [selectedFingerprintId, setSelectedFingerprintId] = useState("");
    const [isPopupEnableVisible, setIsPopupEnableVisible] = useState(false);

    //delete Fingerprint
    const [id_fingerprint_db, setIdFingerprintDb] = useState(null);
    const [mac_address, setMacAddress] = useState(null);
    const [fingerprint_id, setFingerprintId] = useState(null);
    const [showPopupConfirmDelete, setShowPopupConfirmDelete] = useState(false);

    //popup detail
    const [showPopupDetail, setShowPopupDetail] = useState(false);


    const handleFetchDetailStaff = async () => {
        setLoading(true);
        try {
            const res = await getDetailStaff(_id);
            console.log(res)
            if(res.status_code === 200){
                setDetailStaff(res.informationOfUser);
                setListFingerprint(res.informationOfUser.fingerprints);
            }
            else {
                setLoading(false);
                toast.error(res.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Lỗi hệ thống");
        }
        finally{
            setLoading(false);
        }
    }

    const handleDisableFingerprint = async (id) => {
        setLoading(true);
        try {
            const res = await disableFingerprint(id);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchDetailStaff();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi vô hiệu hóa vân tay");
        } finally {
            setLoading(false);
        }
    }

    const handleOpenPopupEnable = (id) => {
        setSelectedExpiryDate("");
        setSelectedFingerprintId(id);
         // reset ngày khi mở popup
        setIsPopupEnableVisible(true);
    };

    const handleConfirmEnable = async (id,expiryDate) => {
        setLoading(true);
        try {
            const res = await enableFingerprint(id, expiryDate);
            if (res.status_code === 200) {
                toast.success(res.message);
                handleFetchDetailStaff();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi kích hoạt vân tay");
        } finally {
            setLoading(false);
        }
    }
    

    const handleClickDelete = (fingerprint_id, mac_address, _id_fingerprint_db) => {
        setIdFingerprintDb(_id_fingerprint_db);
        setFingerprintId(fingerprint_id);
        setMacAddress(mac_address);
        setShowPopupConfirmDelete(true);
    }

    const handleDeleteFingerprint = async (fingerprint_id, mac_address, _id) => {
            setLoading(true);
            try {
                const res = await deleteFingerprint(fingerprint_id, mac_address, _id);
                if (res.status_code === 200) {
                    toast.success(res.message);
                    handleFetchDetailStaff();
                } else {
                    setLoading(false);
                    toast.error(res.message);
                }
            } catch (error) {
                setLoading(false);
                toast.error("Có lỗi xảy ra khi xóa vân tay");
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        handleFetchDetailStaff();
    }, [showPopupDetail])
    console.log("listfinger", listFingerprint)
    return (
        <>
            {loading && <Loading />}
            <PopupEnableFingerprint
                isVisible={isPopupEnableVisible}
                onClose={() => setIsPopupEnableVisible(false)}
                onConfirm={handleConfirmEnable}
                initialExpiryDate={selectedExpiryDate}
                id ={selectedFingerprintId}
            />

            {showPopupConfirmDelete && 
                <PopupConfirmDeleteFingerprint 
                    onClose={() => setShowPopupConfirmDelete(false)} 
                    visible={showPopupConfirmDelete}
                    onConfirm={handleDeleteFingerprint}
                    fingerprint_id={fingerprint_id}
                    mac_address={mac_address}
                    _id_fingerprint_db={id_fingerprint_db}
                
                />
            }
            {
                showPopupDetail && 
                <PopupStaffInfo 
                    onClose={() => setShowPopupDetail(false)}
                    user={detailStaff.user}
                />
            }
            <div className="staff-detail-container">
                <Title name={"Chi tiết nhân viên"} exit={true} onExit={() => navigate("/at/staff")}/>
                <div className="staff-detail-container-content">
                    <div className="staff-detail-info-section">
                        <div className="staff-detail-avatar">
                            <img src={detailStaff?.user?.avatar} alt="avatar" />
                            <button
                                className="staff-detail-update-btn"
                                onClick={() => setShowPopupDetail(true)}
                            >
                                Thay đổi
                            </button>
                        </div>
                        <div className="staff-detail-info">
                            <div className="staff-detail-info-row">
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Họ và tên:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.full_name}</span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Mã nhân viên:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.user_code}</span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Phòng:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.department_id?.department_name}</span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Số điện thoại:</span>
                                    <span className="staff-detail-info-item-value">
                                        {
                                            detailStaff?.user?.phone_number 
                                                ? detailStaff.user.phone_number 
                                                : "Không có"
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="staff-detail-info-row">
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Email:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.email}</span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Giới tính:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.sex}</span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Ngày sinh:</span>
                                    <span className="staff-detail-info-item-value">
                                        {
                                            detailStaff?.user?.date_of_birth 
                                                ? formatDateOnly(detailStaff?.user?.date_of_birth)
                                                : "Không có"
                                        }
                                    </span>
                                </div>
                                <div className="staff-detail-info-item">
                                    <span className="staff-detail-info-item-label">Trạng thái:</span>
                                    <span className="staff-detail-info-item-value">{detailStaff?.user?.status === "ACTIVE" ? "Hoạt động" : "Xóa tạm thời"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-staff-fingerprint-section-container">
                        <div className="fingerprint-section-title">Danh sách vân tay</div>
                        <div className="detail-staff-fingerprint-section">
                            {listFingerprint.length === 0 ? (
                                <div className="empty-fingerprint-box">
                                    <img src={emptyImage} alt="No fingerprints" className="empty-fingerprint-image" />
                                    <p>Không có vân tay nào được đăng ký</p>
                                </div>
                            ): (
                                <div className="detail-fingerprint-grid">
                                    {listFingerprint.map((fp) => (
                                        <div key={fp._id} className={`detail-fingerprint-card ${fp.status.toLowerCase()}`}>
                                            <div className="detail-card-inner">
                                                {/* Front side */}
                                                <div className="detail-card-front">
                                                    <img
                                                        src={image_finger}
                                                        className="detail-fingerprint-avatar"
                                                        alt="Avatar"
                                                    />
                                                    <h4>{fp.user_id.full_name}</h4>
                                                    <p><strong>Tên:</strong> {fp.fingerprint_name}</p>
                                                    <p><strong>HSD:</strong> {formatDateOnly(fp.expiry_at)}</p>
                                                </div>

                                                    {/* Back side */}
                                                <div className="detail-card-back">
                                                    <button onClick={() => handleClickDelete(fp.fingerprint_id, fp.device_id.mac_address, fp._id)}>Xoá</button>
                                                    {fp.status === "INACTIVE" && <button onClick={() => handleOpenPopupEnable(fp._id)}>Kích hoạt</button>}
                                                    {fp.status === "ACTIVE" && <button onClick={() => handleDisableFingerprint(fp._id)}>Vô hiệu hóa</button>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffDetail