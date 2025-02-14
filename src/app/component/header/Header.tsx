import Image from "next/image"
import { FaLongArrowAltRight } from "react-icons/fa";


const Header = () => {
    return (
        <header className="flex fixed backdrop-blur-sm z-[1000] w-[97%] mb-[30px] items-center justify-between px-[10px] border-2 border-[#0E464F] rounded-[15px] text-white h-[60px]">
            <div>
                <Image src='/logo.svg' alt="logo" width={70} height={50} />
            </div>
            <div className="md:flex gap-5 hidden ">
                <a href="">Events</a>
                <a href="">My Tickets</a>
                <a href="">About Project</a>
            </div>
            <button className="bg-white p-[10px] text-[#0E464F] rounded-[10px] md:text-base text-[13px] font-medium flex items-center gap-2">My Tickets <FaLongArrowAltRight />            </button>
        </header>
    )
}

export default Header
