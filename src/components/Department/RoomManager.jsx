import React, { useEffect, useState } from 'react';
import './RoomManager.css';
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch } from 'react-icons/fa';
import Title from '../Header/Title';
import avatarRoom from '../../assets/hinh-anh-van-phong-lam-viec-hien-dai-1-1.jpg';
import { useNavigate } from 'react-router-dom';
import { createNewDepartment, fetchListDepartment } from '../../service/DepartmentAPI';
import CreateDepartment from './CreateDepartmentPopup';
import { toast } from 'react-toastify';
import { formatDateOnly } from '../../utils/DateUtils';
import Loading from '../Loading/Loading';

const floors = ['Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4', 'Tầng 5', 'Tầng 6', 'Tầng 7'];

const RoomManager = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState("asc");
    const [listRoom, setListRoom] = useState([]);
    const [floor, setFloor] = useState(null);
    const [loading, setLoading] = useState(null);

    const [showPopup, setShowPopup] = useState(false);

    const roomsPerPage = 4;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex + roomsPerPage < listRoom.length) {
            setCurrentIndex(currentIndex + roomsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - roomsPerPage);
        }
    };

    const getListDepartment = async () => {
        setLoading(true);
        try {
            const result = await fetchListDepartment(search, order, floor);
            if (result.status_code === 200) {
                setListRoom(result.data);
                setCurrentIndex(0);
            }
            else {
                setLoading(false)
                toast.error(result.message)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    };

    const handleAddRoom = async (department) => {
        const result = await createNewDepartment(department);
        if (result.status_code === 201) {
            setShowPopup(false);
            toast.success(result.message);
            await getListDepartment()
        } else if (result.status_code === 400) {
            toast.error(result.message);
        }
    };

    useEffect(() => {
        getListDepartment();
    }, [search, order, floor]);

    const visibleRooms = listRoom.slice(currentIndex, currentIndex + roomsPerPage);

    return (
        <>
            {showPopup && (
                <CreateDepartment
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleAddRoom}
                />
            )}
            {
                loading && <Loading />
            }
            <div className='manage-list-room-container'>
                <div className='manage-list-room-content'>
                    <Title name={"Danh sách phòng ban"} />
                    <div className="manage-list-room-toolbar">
                        <select value={floor ?? 'Tất cả'} onChange={(e) => setFloor(e.target.value === 'Tất cả' ? null : e.target.value)}>
                            <option value="Tất cả">Tất cả</option>
                            {floors.map((floor) => (
                                <option key={floor} value={floor}>{floor}</option>
                            ))}
                        </select>

                        <div className="manage-list-room-search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Tìm theo tên phòng"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <button className="manage-list-room-create-room-btn" onClick={() => setShowPopup(true)}>
                            <FaPlus /> Tạo phòng
                        </button>
                    </div>

                    <div className="manage-list-room-carousel">
                        <button className="manage-list-room-scroll-btn left" onClick={handlePrev} disabled={currentIndex === 0}>
                            <FaChevronLeft />
                        </button>

                        <div className="manage-list-room-room-list">
                            {visibleRooms.map((room, id) => (
                                <div key={id} className="manage-list-room-room-card">
                                    <img src={avatarRoom} alt={room.department_name} />
                                    <h4>{room.department_name}</h4>
                                    <p>Mã phòng: {room.department_code}</p>
                                    <p>Tầng: {room.floor}</p>
                                    <p>Tổng số người: {room.total_member}</p>
                                    <p>Ngày tạo: <span className="status">{formatDateOnly(room.createdAt)}</span></p>
                                    <div className="manage-list-room-room-actions">
                                        <button className="manage-list-room-edit-btn" onClick={() => navigate(`/at/department/${room._id}`)}>Chi tiết</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="manage-list-room-scroll-btn right"
                            onClick={handleNext}
                            disabled={currentIndex + roomsPerPage >= listRoom.length}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomManager;
