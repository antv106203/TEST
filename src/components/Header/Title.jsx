import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Title.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Title = ({ name, exit, onExit }) => {
    return (
        <div className="title-container">
            {exit && (
                <div className="title-exit" onClick={onExit}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            )}
            <div className="title-name">
                {name}
            </div>
        </div>
    );
};

export default Title;