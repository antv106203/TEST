import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PopupSearchingDevice.css";
import { faSearch, faWifi } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const PopupSearchingDevice = ({ onClose, loading, devices, onConnectClick }) => {

    return (
        <div className="popup-search-device-overlay">
            <div className="popup-search-device-content">
                <div className="popup-search-device-header">
                    <h3>Tìm thiết bị</h3>
                    <button className="popup-search-device-close-btn" onClick={onClose}>
                    X
                    </button>
                </div>

                {loading && (
                <>
                    <div className="popup-search-device-loading">
                        <div className="popup-search-device-spinner" />
                        <p>Đang dò thiết bị...</p>
                    </div>
                </>
                )}

                {!loading && devices.length === 0 && (
                    <div className="no-device-found">
                        <FontAwesomeIcon icon={faSearch} className="no-device-icon" />
                        <p>Không tìm thấy thiết bị mới</p>
                    </div>
                )}

                {!loading && devices.length > 0 && (
                <div className="popup-search-device-device-list">
                    {devices.map((device, idx) => (
                    <div
                        key={idx}
                        className="popup-search-device-item"
                        title="Click để kết nối"
                    >
                        <span>
                        <FontAwesomeIcon icon={faWifi} className="wifi-icon" />
                        {device.mac_address}
                        </span>
                        <button
                            className="popup-search-device-connect-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onConnectClick(device);
                            }}
                        >
                        Kết nối
                        </button>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}
export default PopupSearchingDevice;