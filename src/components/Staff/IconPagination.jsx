import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./IconPagination.css"

const IconPagination = ({icon, skip, onClick}) =>{
    const skipClass = skip === "left" ? "skip-left" : skip === "right" ? "skip-right" : "skip-full";
    return(
        <div className={`icon-pagination-tool ${skipClass}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon}/>
        </div>
    )
}
export default IconPagination