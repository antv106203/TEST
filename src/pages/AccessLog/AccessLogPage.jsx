import { Route, Routes } from 'react-router-dom'
import ListAccessLog from '../../components/AccessLog/ListAccessLog'
import { withAuthorization } from '../../hoc'

const AccessLogPage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListAccessLog />}/>
            </Routes>
        </>
    )
}

export default withAuthorization(AccessLogPage, ["ADMIN", "GAURD"]);