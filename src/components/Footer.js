function getYear() {
    return new Date().getFullYear();
}

const Footer = () => {
    return (
        <div className='footer'>
            <p>Copyright © {getYear()} Hadiya, Katie, Solivan and Amir</p>
        </div>
    )
}

export default Footer;