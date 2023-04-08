import sleepingSnorlax from '../assets/snorlax404Error.gif'
import { Link } from 'react-router-dom'


const ErrorPage = () => {
    return(
        <div className="errorContainer">
            <div className="wrapper">
                <h1 className="error-title">404 ERROR</h1>
                <img src={sleepingSnorlax} alt='a sleeping snorlax' className="errorImage" />
                <p className="errorMessage">Seems you have bumped into a wild Snorlax!</p>
                <Link to="/" className="goHomeBtn">Go Home</Link>
                
            </div>
        </div>
    )
};

export default ErrorPage;