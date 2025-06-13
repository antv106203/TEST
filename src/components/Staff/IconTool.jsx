import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./IconTool.css"

const IconTool = ({icon, color, onClick}) =>{
    return(
        <div className="icontool-container" style={{backgroundColor: color}} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </div>
    )
}
export default IconTool