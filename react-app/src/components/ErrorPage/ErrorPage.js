import './ErrorPage.css'
import errorImage from './assets/images/error404.jpg'
import "./ErrorPage.css";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const ErrorPage = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1>Oops! Something Went Wrong</h1>
                <p>Looks like there was an error while processing your request.</p>
                <p>Please try again later or contact support for assistance.</p>
                <img
                    src={errorImage}
                    alt="Error"
                    className="error-image"
                />
            </div>
            <NavLink to="/" className="error-button">
                Back to home
            </NavLink>
        </div>
    )
}

export default ErrorPage
