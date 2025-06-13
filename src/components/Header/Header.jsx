import {faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css"
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import UserMenu from "./UserMenu";
const Header = () =>{

    const dispatch = useDispatch();

    const doLogout = () => {
        dispatch(logout());
    }

    const user = {
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
    }
    return(
        <div className="header" >
            {/* <div className="tagLogout" onClick={() => doLogout()}>
                <div className="icon-header">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
                <div className="nameTagLogout">
                    Đăng xuất
                </div>
            </div> */}

            <div className="left-header">
                <div className="notification-wrapper">
                    <FontAwesomeIcon icon={faBell} className="bell-icon" />
                    <span className="notification-badge"></span>
                </div>
            </div>
            <div className="right-header">
                <UserMenu 
                    user={user} 
                    handleLogOut={doLogout}

                />
            </div>
        </div>
    )
}

export default Header;