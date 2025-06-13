import DropdownItem from "./DropdownItem";
import Icon from "./Icon";
import Item from "./Item";
import LogoSidebar from "./LogoSidebar";
import LogoSidebarText from "./LogoSidebarText";
import SidebarMain from "./SidebarMain";
import "./Sidebar.css"
import { useLocation, useNavigate } from "react-router-dom";

let typeClass = 'newpurple';
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <SidebarMain
            bgColor={typeClass}
            isCollapsed={false}
            position='left'
        >
            <LogoSidebar
                image='https://media2.giphy.com/media/eNAsjO55tPbgaor7ma/source.gif'
                imageName='react logo'
            />
            <LogoSidebarText>AT GROUP</LogoSidebarText>
            {/* <DropdownItem
                values={['First', 'Second', 'Third']}
                bgColor={typeClass}>
                Menu
            </DropdownItem> */}

            <Item bgColor={typeClass} onClick={() => handleClick('/at/dashboard')} isActive={currentPath === '/at/dashboard'}>
                <Icon className="fas fa-home" />
                Trang chủ
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/department')} isActive={currentPath.includes('/at/department')}>
                <Icon className="fa-regular fa-building" />
                Phòng ban
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/staff')} isActive={currentPath.includes('/at/staff')}>
                <Icon className="fa-regular fa-id-card" />
                Nhân sự
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/fingerprint')} isActive={currentPath.includes('/at/fingerprint')}>
                <Icon className="fa-regular fa-hand-spock" />
                Vân tay
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/history')} isActive={currentPath.includes('/at/history')}>
                <Icon className="fa-regular fa-clock" />
                Lịch sử
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/device')} isActive={currentPath.includes('/at/device')}>
                <Icon className="fa-solid fa-satellite-dish" />
                Thiết bị
            </Item>
            <Item bgColor={typeClass} onClick={() => handleClick('/at/account')} isActive={currentPath.includes('/at/account')}>
                <Icon className="fa-regular fa-user" />
                Tài khoản
            </Item>
        </SidebarMain>
    )
}

export default Sidebar;