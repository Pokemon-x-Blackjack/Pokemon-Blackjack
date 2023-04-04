function getYear() {
    return new Date().getFullYear();
}

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="wrapper">
                <p>Copyright © {getYear()} Hadiya, Katie, Solivan and Amir</p>
            </div>
        </footer>
    )
}

export default Footer;