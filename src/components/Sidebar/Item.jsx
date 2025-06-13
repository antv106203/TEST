import colors from "./enums/colors";
import colorsHovered from "./enums/colors-hovered";

const Item = ({ bgColor, children, onClick, classes, isActive }) => {
  const baseColor = colors[bgColor] || "";
  const hoverColor = colorsHovered[bgColor] || "";
  const activeClass = isActive ? "active-item" : "";

  return (
    <div
      onClick={onClick}
      className={`item ${baseColor} ${hoverColor} ${activeClass} ${classes || ""}`}
    >
      {children}
    </div>
  );
};

export default Item;