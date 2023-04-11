import sleepingSnorlax from '../assets/snorlax404Error.gif'
import { Link } from 'react-router-dom'


const ErrorPage = (props) => {

    const handleReset = () => {
        props.setButtonSelected = false;
    }


    return (
        <div className="errorContainer">
            <div className="wrapper">
                <h1 className="error-title">404 ERROR</h1>
                <img src={sleepingSnorlax} alt='a sleeping snorlax' className="errorImage" />

                <p className="errorMessage">
                    Seems you have bumped into a wild Snorlax!
                    <span className="statusText">
                        {`${props.apiError}`}
                    </span>
                </p>

                <Link to="/" className="goHomeBtn" onClick={handleReset}>Go Home</Link>

            </div>
        </div>
    )
};

export default ErrorPage;