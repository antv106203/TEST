import { useNavigate } from "react-router-dom";
import "./UnauthorizedPage.css"
import errorImage from "../../assets/error-image.svg"
import { Button } from "reactstrap";
const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div className="UnauthorizedPage-container">
            <div className="UnauthorizedPage-wrapper">
                <div className="UnauthorizedPage-errorImage">
                    <img src={errorImage} alt="" />
                </div>
                <h6 className="UnauthorizedPage-errorInfo">Bạn không có quyền để vào trang này</h6>
                <p className="UnauthorizedPage-errorHelp">Bạn chưa được cấp quyền nên không thể vào được trang này. Vui lòng quay lại trang chủ và liên hệ với admin để được cấp quyền nếu cần thiết.</p>
                <div className="UnauthorizedPage-boxBtn">
                    <Button
                    onClick={() => navigate('/')}
                        className={`UnauthorizedPage-errorBtn rounded-pill`}
                        type="submit"
                        color="secondary-red"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage;