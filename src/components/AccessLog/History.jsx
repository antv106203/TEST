import "./History.css";
import avataDefault from "../../assets/avatardefault.jpg";
import { formatAccessTime } from "../../utils/DateUtils";

const History = ({ accesslog, onClick}) => {
    return (
        <div 
            className={`history-container ${accesslog?.result === "success" ? "success-border" : "error-border"}`}
            onClick={() => onClick(accesslog)}
        >
            <div className="history-avatar">
                <img src={accesslog?.user_id?.avatar || avataDefault} alt="avatar" />
            </div>
            <div className="history-information">
                <div className="history-line-user-code">
                    {accesslog?.user_id?.user_code || "Không xác định"}
                </div>
                <div className="history-line-full-name">
                    {accesslog?.user_id?.full_name || ""}
                </div>
                <div className="history-line-department-name">
                    {accesslog?.user_id?.department_id?.department_name || ""}
                </div>
                <div className="history-line-time">
                    {formatAccessTime(accesslog?.access_time)}
                </div>
                <div className={`history-line-status ${accesslog?.result === "success" ? "status-success" : "status-failed"}`}>
                    {accesslog?.result === "success" ? "Thành công" : "Lỗi"}
                </div>
            </div>
        </div>
    );
};

export default History;
