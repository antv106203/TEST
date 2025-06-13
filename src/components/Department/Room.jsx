import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import "./Room.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Room = ({name, onClick}) =>{
    return(
        <div className="room-container" onClick={onClick}>
            <div className="room-icon">
                <FontAwesomeIcon icon={faHouseChimney} />
            </div>
            <div className="room-name">
                {name}
            </div>
        </div>
    )
}

export default Room;