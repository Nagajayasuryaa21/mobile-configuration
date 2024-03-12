import logo from "../assets/kapture-icon-logo.png.png"
const Navbar = (props) => {
    return(
        <div className="w-full bg-[#111C43] py-[20px]">
            <a href="/">
                <div className="flex items-center ml-[30px]">
                    <img src={logo} alt="logo" className="w-[40px]"/>
                    <h1 className="text-white text-3xl mx-2  font-sans">Kapture CX</h1>
                </div>
            </a>
            
            
        </div>
    )
}

export default Navbar;