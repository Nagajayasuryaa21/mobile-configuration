import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Sidenav from "../Sidenav";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import pageData from "../../constants/data";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import logo from "../../assets/logo.png"

const OTPVerification = (props) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <div className="h-screen flex">
      <Sidenav from="otp-verification" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
          OTP Verification
          </h1>
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-[65%] overflow-auto h-full bg-[#F1F1F1] border-r-2 flex px-20 py-20 items-center justify-center border-gray-300">
            <div className="w-[400px] h-[800px] bg-[#5AA9E1] rounded-3xl border border-solid border-2 border-black">
              <div className="flex h-[30px] justify-between items-center py-5 w-full my-2 mb-4">
                <KeyboardBackspaceIcon
                  fontSize="small"
                  sx={{ color: "black", fontSize: 40 }}
                  className="ml-2"
                />
                <h1 className="  text-xl py-5 text-center w-full mr-10">
                    OTP Verification
                </h1>
              </div>
              <div className="h-[80%] flex flex-col justify-center items-center">
                <h1 className="text-xl ">Ticket Number :</h1>
                <h1 className="text-xl  text-red-700 ">Ticket Number : XYU213542673</h1>
                <div className="flex items-center mt-10 my-3">
                    <img src={logo} alt = "logo" className="w-10"/>
                    <h1 className="text-2xl font-bold mx-5">OTP Verification</h1>
                </div>
                <p className="mx-20 text-center text-sm text-gray-800">Please enter the OTP Sent to the mobile number:</p>
                <h1 className="text-white font-bold">Phone : 91-XXXXXX9875</h1>
                <div className="flex w-full justify-between px-16 my-2">
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                    <div className="flex h-8 w-8 bg-white rounded-md"></div>
                </div>
                <p className="mx-20 text-center text-sm text-gray-800 mt-10">Didn't Receive the OTP?</p>
                <h1 className="my-2 text-[#111C43] font-bold">RESEND OTP</h1>
                <h1 className="my-2 text-white bg-[#111C43] w-[200px] py-2 text-center font-bold rounded-xl">Verify</h1>
                





              </div>
            </div>
          </div>
          <div className="w-[35%] overflow-y-auto py-5">
            <div className="w-full my-4 px-5">
              <h1 className="font-light my-2 text-xl  text-gray-600">
                Group Type
              </h1>
              <input
                className=" w-full text-sm px-3 py-2 bg-gray-200 rounded-xl text-gray-600  "
                value="Job Done"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
