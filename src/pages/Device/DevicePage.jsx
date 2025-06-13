import { Route, Routes } from 'react-router-dom'
import { withAuthorization } from '../../hoc'
import ListDevice from '../../components/Device/ListDevice';
const DevicePage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListDevice />}/>
            </Routes>
        </>
    )
}

export default withAuthorization(DevicePage, ["ADMIN", "GAURD"]);