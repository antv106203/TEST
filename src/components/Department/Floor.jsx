import "./Floor.css"

const Floor = ({name, onSelect, isSelected}) =>{
    return(
        <div className={`floor-container ${isSelected ? "selected" : ""}`} onClick={onSelect}>
            {name}
        </div>
    )
}

export default Floor;