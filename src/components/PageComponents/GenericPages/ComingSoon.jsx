import { useEffect, useState } from "react";
import Sidenav from "../../Sidenav";
import image from "../../../assets/coming_soon_image.png"

const ComingSoon = (props) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <div className="h-screen flex">
      <Sidenav from="coming-soon" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5 h-[60px]">
          {/* <h1 className="text-3xl font-sans text-[#111C43] font-bold">
          Technician Signature
          </h1> */}
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-full overflow-auto h-full bg-[#F1F1F1] border-r-2 flex px-20 py-20 items-center justify-center border-gray-300">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <img src={image} className="w-[30%]"/>
                    <h1 className="text-4xl font-bold font-sans text-gray-600 ">Coming Soon...</h1>
                    <p className="text-xl text-gray-500 w-[65%] text-center py-5">We're diligently working on enhancing this page's functionality. Stay tuned for exciting updates! 
Thank you for your patience.</p>
                </div>
                
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
