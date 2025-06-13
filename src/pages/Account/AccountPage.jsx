import { Route, Routes } from 'react-router-dom'
import { withAuthorization } from '../../hoc'
import ListAccount from '../../components/Account/ListAccount';

const AccountPage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListAccount />}/>
            </Routes>
        </>
    )
}

export default withAuthorization(AccountPage, ["ADMIN"]);