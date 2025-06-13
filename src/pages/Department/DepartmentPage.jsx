import { Route, Routes } from 'react-router-dom'
import DetailDepartment from '../../components/Department/DetailDepartment'
import { withAuthorization } from '../../hoc'
import RoomManager from '../../components/Department/RoomManager'

const DepartmentPage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<RoomManager />}/>
                <Route path='/:_id' element = {<DetailDepartment />}/>
            </Routes>
        </>
    )
}

export default withAuthorization(DepartmentPage, ["ADMIN", "GAURD"]);