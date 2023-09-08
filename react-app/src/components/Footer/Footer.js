import './Footer.css';


const Footer = () => {
    return (
        //   <footer className="Footer">
        //   <h2>Skill Swap</h2>
        //   <p>Copyright &copy; 2023 Oscar Alcantar. All rights reserved.</p>
        //   <div className="footer-grid">
        //     <a href="https://github.com/Oscar-999">Github
        //       <i className="bx bxl-github bx-flashing"></i>
        //     </a>
        //     <a href="https://www.linkedin.com/in/oscar-alcantar-800313204/">Linkedin
        //       <i class='bx bxl-linkedin-square'></i>
        //     </a>
        //   </div>

        // </footer>


        <footer className="footer">
            <div className="footer-content">
                <ul className="footer-links">
                    <li class="space">&copy; {new Date().getFullYear()} OscarAlcantar, Inc.</li>
                    <li>
                        <a href="https://github.com/Oscar-999"><i className="bx bxl-github bx-flashing"></i></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/oscar-alcantar-800313204/"><i class='bx bxl-linkedin-square'></i></a>
                    </li>
                    <li>Terms</li>
                    <li>Privacy</li>
                    <li>Your Privacy Choices</li>
                    <li>English (US)</li>
                    <li>$ USD</li>
                    <li>Support & resources</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
