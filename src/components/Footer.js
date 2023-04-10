function getYear() {
    return new Date().getFullYear();
}

const Footer = () => {
    return (

        <footer className='footer'>
            <p>Copyright © {getYear()} <br />
            <a href="https://katiemak.dev/">Katie </a> 
            <a href="https://hadiyahussein.com/">Hadiya </a> 
            <a href="http://solivanlau.com/">Solivan </a> 
            <a href="https://amiracle.dev/">Amir</a>
            </p> 
        </footer>
    )
}

export default Footer;