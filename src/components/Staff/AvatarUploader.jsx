
import "./AvatarUploader.css"
import { useState, useRef } from "react";

const AvatarUploader = ({ onAvatarChange }) => {
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            if (onAvatarChange) {
                onAvatarChange(file); // Gửi file lên component cha
            }
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };
    return(
        <div className="avatar-upload-container" onClick={handleBoxClick}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
            />
            {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="avatar-preview" />
            ) : (
                <div className="upload-box">
                    <div className="upload-icon">📤</div>
                    <button className="upload-button">Upload Image</button>
                    <p className="upload-text">or drop a file</p>
                </div>
            )}
        </div>
    )
}

export default AvatarUploader;