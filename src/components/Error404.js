import sleepingSnorlax from '../assets/snorlax404Error.gif'
import { useState } from 'react';
import Landing from './Landing';


const ErrorPage = (props) => {
    const [showHomePage, setShowHomePage] = useState(false);

    const handleReset = () => {
        // Unmount the ErrorPage component before rendering the Landing component
        setShowHomePage(false);
    }

    return (
        // Render the 404 component only when showHomePage is false
        !showHomePage && (
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
                    <button className="goHomeBtn" onClick={() => setShowHomePage(true)}>Go Home</button>
                </div>
            </div>
        )
    );
};

export default ErrorPage;
