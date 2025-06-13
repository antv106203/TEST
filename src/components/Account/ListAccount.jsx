import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../Header/Title";
import "./ListAccount.css";
import { faArrowsRotate, faCircleUser, faLock, faLockOpen, faMagnifyingGlass, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { blockAccount, deleteAccount, getListAccount, registerAccount, resetPasswordByAdmin, unblockAccount } from "../../service/AccountAPI";
import { useEffect, useState } from "react";
import { formatAccessTime } from "../../utils/DateUtils";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import PopupConfirmDelete from "./PopupConfirmDelete ";
import CreateAccount from "./CreateAccount";

const ListAccount = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [listAccount, setListAccount] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const handlePageChange = (page) => {
        setPage(page);
    }

    

    const fetchListAccount = async () => {
        setLoading(true);
        try {
            const response = await getListAccount(page, limit, email, role, status);
            if (response && response.status_code === 200) {
                setListAccount(response.data);
                setTotalPage(response.pagination.totalPages);
                setCurrentPage(response.pagination.page);
            };
        } catch (error) {
            toast.error(response.message);
        } finally {
            setLoading(false);
        }

        const response = await getListAccount(page, limit, email, role, status);
        if (response && response.status_code === 200) {
            setListAccount(response.data);
            setTotalPage(response.pagination.totalPages);
            setCurrentPage(response.pagination.page);
        };

    }

    const handleBlockAccount = async (email) => {
        setLoading(true);
        try {
            const response = await blockAccount(email);
            if (response && response.status_code === 200) {
                toast.success(response.message);
                await fetchListAccount();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
        finally{
            setLoading(false);
        }
    }
    const handleUnBlockAccount = async (email) => {
        setLoading(true);
        try {
            const response = await unblockAccount(email);
            if (response && response.status_code === 200) {
                toast.success(response.message);
                await fetchListAccount();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
        finally{
            setLoading(false);
        }
    }

    const handleDeleteClick = (email) => {
        setSelectedEmail(email);
        setShowPopup(true);
    };

    const handleDeleteAccount = async (email) => {
        try {
            const response = await deleteAccount(email);
            if (response && response.status_code === 200) {
                toast.success(response.message);
                setShowPopup(false);
                await fetchListAccount();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    }

    const handleResetPasswordByAdmin = async (email) => {
        setLoading(true);
        try {
            const response = await resetPasswordByAdmin(email);
            if (response && response.status_code === 200) {
                toast.success(response.message);
                await fetchListAccount();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
        finally{
            setLoading(false);
        }
    }

    const handleCreateAccount = async (email, role) => {
        setLoading(true);
        try {
            const response = await registerAccount(email, role);
            if (response && response.status_code === 201) {
                toast.success(response.message);
                setShowCreateAccount(false);
                await fetchListAccount();
            } else {
                toast.error(response.message);
            }   
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
        finally{
            setLoading(false);
        }
    }
    

    useEffect(() => {
        fetchListAccount();
    }, [page]);


    return (
        <>
            {loading && (
                <Loading />
            )}

            {showPopup && (
                < PopupConfirmDelete 
                    visible={showPopup}
                    onClose={() => setShowPopup(false)}
                    email={selectedEmail}
                    onConfirm={handleDeleteAccount}
                />
            )}
            {showCreateAccount && (
                <CreateAccount 
                    visible={showCreateAccount}
                    onClose={() => setShowCreateAccount(false)}
                    onConfirm={handleCreateAccount}
                />
            )}
            <div className="list-account-container">
                <Title name={"Danh sách tài khoản"} />
                <div className="list-account-container-content">
                    <div className="list-account-toolbar">
                        <div className="list-account-toolbar-create" onClick={() => setShowCreateAccount(true)}>
                            <div className="list-account-toolbar-create-icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div className="list-account-toolbar-create-label" >
                                Thêm tài khoản
                            </div>
                        </div>
                        <div className="list-account-toolbar-filter">
                            <div className="list-account-toolbar-search">
                                <input type="text" placeholder="Tìm kiếm tài khoản" name="email" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="list-account-toolbar-role" onChange={(e) => setRole(e.target.value)}>
                                <select name="role" id="role" defaultValue={"1"}>
                                    <option value="1" disabled>Chọn vai trò</option>
                                    <option value="">Tất cả</option>
                                    <option value="ADMIN">Quản lý</option>
                                    <option value="GAURD">Nhân viên an ninh</option>
                                </select>
                            </div>
                            <div className="list-account-toolbar-role">
                                <select name="role" id="role" defaultValue={"1"} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="1" disabled>Chọn trạng thái</option>
                                    <option value="">Tất cả</option>
                                    <option value="ACTIVE">Kích hoạt</option>
                                    <option value="INACTIVE">Đã khóa</option>
                                </select>
                            </div>
                            <div className="list-account-toolbar-btn-search" onClick={fetchListAccount}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </div>
                    <div className="list-account-table">
                        <table className="list-account">
                            <thead>
                                <tr>
                                    <th>Tài khoản</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAccount.map((res, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="list-account-account-icon">
                                                <FontAwesomeIcon icon={faCircleUser} />
                                            </div>
                                        </td>
                                        <td>{res.email}</td>
                                        {
                                            res.role === "ADMIN" ? (
                                                <td className="list-account-role-admin">Quản lý</td>
                                            ) : res.role === "GAURD" ? (
                                                <td className="list-account-role-guard">Nhân viên</td>
                                            ) : null
                                        }
                                        {
                                            res.status === "ACTIVE" ? (
                                                <td>
                                                    <div className="list-account-status-active">
                                                        Kích hoạt
                                                    </div>
                                                </td>
                                            ) : res.status === "INACTIVE" ? (
                                                <td>
                                                    <div className="list-account-status-inactive">
                                                        Đã khóa
                                                    </div>
                                                </td>
                                            ) : null
                                        }
                                        <td>{formatAccessTime(res.createdAt)}</td>
                                        <td>{formatAccessTime(res.updatedAt)}</td>
                                        {
                                            res.role === "ADMIN" ? (
                                                <td>
                                                    {null}
                                                </td>
                                            ) : (
                                                // <td>
                                                //     <button className="edit-btn">✎</button>
                                                //     <button className="delete-btn">🗑️</button>
                                                // </td>
                                                res.status === "ACTIVE" ? (
                                                    <td>
                                                        <div className="list-account-btn">
                                                            <div className="list-account-btn-block" onClick={() => handleBlockAccount(res.email)}>
                                                                <FontAwesomeIcon icon={faLock} />
                                                            </div>
                                                            <div className="list-account-btn-delete" onClick={() => handleDeleteClick(res.email)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </div>
                                                            <div className="list-account-btn-reset-password" onClick={() => handleResetPasswordByAdmin(res.email)}>
                                                                <FontAwesomeIcon icon={faArrowsRotate} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                ) :(
                                                    <td>
                                                        <div className="list-account-btn">
                                                            <div className="list-account-btn-unblock" onClick={() => handleUnBlockAccount(res.email)}>
                                                                <FontAwesomeIcon icon={faLockOpen} />
                                                            </div>
                                                            <div className="list-account-btn-delete" onClick={() => handleDeleteClick(res.email)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </div>
                                                            <div className="list-account-btn-reset-password" onClick={() => handleResetPasswordByAdmin(res.email)}>
                                                                <FontAwesomeIcon icon={faArrowsRotate} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                )

                                            )
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="list-account-pagination">
                        <div className="list-account-pagination-left">
                            <div>
                                Trang: 
                            </div>
                            <div className="list-account-pagination-left-current-page">
                                {page}
                            </div>
                            <div>
                                /
                            </div>
                            <div>
                                {totalPage}
                            </div>
                        </div>
                        <div className="list-account-pagination-right">
                            <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} name={"Tài khoản"} total={listAccount.length}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListAccount;
