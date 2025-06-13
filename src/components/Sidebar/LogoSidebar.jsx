
const LogoSidebar = ({ image, imageName, classes }) =>{
    return(
        <img 
            src={image}
            alt={imageName}
            className={`logo-image ${classes}`}
        />
    )
}

export default LogoSidebar