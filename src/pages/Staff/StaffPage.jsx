import { Route, Routes } from 'react-router-dom'
import CreateStaff from '../../components/Staff/CreateStaff'
import { withAuthorization } from '../../hoc'
import StaffDetail from '../../components/Staff/StaffDetail'
import RedesignedStaffList from '../../components/Staff/RedesignedStaffList'

const StaffPage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<RedesignedStaffList />}/>
                <Route path='/create-staff' element = {<CreateStaff />}/>
                <Route path='/:_id' element = {<StaffDetail/>}/>
            </Routes>
        </>
    )
}

export default withAuthorization(StaffPage, ["ADMIN", "GAURD"]);