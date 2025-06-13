/* eslint-disable no-unused-vars */
import { faArrowDown, faArrowUp, faMagnifyingGlass, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Title from "../Header/Title";
import Floor from "./Floor";
import "./ListDepartment.css"
import Room from "./Room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createNewDepartment, fetchListDepartment } from "../../service/DepartmentAPI";
import { useNavigate } from "react-router-dom";
import CreateDepartment from "./CreateDepartmentPopup";
import { toast } from "react-toastify";

const listFloor = ["Tầng 1", "Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5", "Tầng 6"]
const ListDepartment = () =>{

    const navigate = useNavigate();

    const [search, setSearch] = useState(null);
    const [order, setOrder] = useState("desc")
    const [listRoom, setListRoom] = useState([]);
    const [floor, setFloor] = useState(null);

    const [showPopup, setShowPopup] = useState(false);


    const getListDepartment = async() =>{
        const result = await fetchListDepartment(search,order, floor);
        setListRoom(result.data);
        console.log(result);
    }

    const handleSelectFloor = (floorName) => {
        if (floor === floorName) {
            setFloor(null); // bỏ chọn nếu tầng đang được chọn
        } else {
            setFloor(floorName);
        }
    };

    const handleAddRoom = async (department) => {
        const result = await createNewDepartment(department);
        if(result.status_code === 201){
            setShowPopup(false);
            toast.success(result.message)
        }
        else{
            setShowPopup(false);
            toast.error(result.message)
        }
    }

    useEffect(() =>{
        getListDepartment()
    }, [search, order, floor, showPopup])

    return(
        <>
            {showPopup && (
                <CreateDepartment
                    onClose={() => { setShowPopup(false) }}
                    onSubmit={handleAddRoom}
                />
            )}
            <div className="listdepartment-container">
                <Title name={"Danh sách phòng ban"}/>
                <div className="listdepartment-container-content">
                    <div className="listdepartment-content">
                        <div className="listdepartment-floor-create">
                            <div className="listdepartment-create" onClick={() => setShowPopup(true)}>
                                <FontAwesomeIcon icon={faSquarePlus}/>
                                <div className="department-create-label">
                                    Thêm phòng
                                </div>
                            </div>
                            <div className="listdepartment-floor">
                                {listFloor.map((floor1, index) => (
                                    <Floor 
                                        key={index} 
                                        name={floor1} 
                                        isSelected={floor === floor1}
                                        onSelect={() => handleSelectFloor(floor1)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="listdepartment-room">
                            <div className="listdepartment-room-filter">
                                <div className="listdepartment-room-filter-icon">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm theo mã phòng hoặc tên phòng"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                                <div className="listdepartment-room-filter-order">
                                    <FontAwesomeIcon 
                                        icon={faArrowUp}
                                        onClick={() => setOrder("asc")}
                                        className={order === "asc" ? "active" : ""} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={faArrowDown}
                                        onClick={() => setOrder("desc")}
                                        className={order === "desc" ? "active" : ""} 
                                    />
                                </div>
                            </div>
                            <div className="listdepartment-room-content">
                                {listRoom.map((room, index) => (
                                <Room key={room._id} name={room.department_name} onClick={() => navigate(`/at/department/${room._id}`)}/>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListDepartment;