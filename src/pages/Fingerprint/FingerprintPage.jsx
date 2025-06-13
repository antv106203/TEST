import { Route, Routes } from 'react-router-dom'
import { withAuthorization } from '../../hoc'
import ListFingerprint from '../../components/Fingerprint/ListFingerprint';
const FingerprintPage = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListFingerprint />}/>
            </Routes>
        </>
    )
}

export default withAuthorization(FingerprintPage, ["ADMIN", "GAURD"]);