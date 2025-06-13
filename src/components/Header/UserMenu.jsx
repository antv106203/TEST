import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UserMenu.css"
import logoUser from "../../assets/header-logo-account.png";
import { useEffect, useRef, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AccountInfoPopup from "./AccountInfoPopup";
import ChangePasswordPopup from "./ChangePasswordPopup";

const UserMenu = ({user, handleLogOut}) =>{

    const [open, setOpen] = useState(false);
    const [popupInfoAccount, setPopupInfoAccount] = useState(false);
    const [popupChangePassword, setPopupChangePassword] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <>
            {popupInfoAccount && <AccountInfoPopup open={popupInfoAccount} onClose={() => setPopupInfoAccount(false)} />}
            {popupChangePassword && <ChangePasswordPopup onClose={() => setPopupChangePassword(false)} />}
            <div className="user-menu-wrapper" ref={menuRef}>
                <div className="avatar-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} />
                </div>

                {open && (
                    <div className="user-menu-dropdown">
                        <div className="user-info">
                            <img src={logoUser} alt="Avatar" />
                            <div>
                                <strong>{user.email}</strong>
                                {
                                    user.role === "ADMIN" ? <p> Quản lý </p> : <p> Nhân viên an ninh </p>
                                }
                            </div>
                        </div>
                        <ul className="user-menu-list">
                            <li onClick={() => {setPopupInfoAccount(true)
                                setOpen(false)
                            }}> Thông tin cá nhân </li>
                            <li
                                onClick={() => {setPopupChangePassword(true)
                                    setOpen(false)
                                }}
                            > 
                                Đổi mật khẩu 
                            </li>
                            <li onClick={handleLogOut}> Đăng xuất </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserMenu;