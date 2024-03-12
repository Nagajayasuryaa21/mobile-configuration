import { useState ,useEffect} from "react";
import logo from "../assets/kapture-icon-logo.png.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
const getSideBarLink = (name, from,page, link) => {
  return (<a href={link} className="w-50">
    <div
      className={`rounded-md ${
        from === page
          ? "bg-[#1f2f7069] text-white"
          : "pl-12 text-[#A3AED1]"
      } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
    >
      {from == page && (
        <TripOriginOutlinedIcon
          fontSize="small"
          sx={{ color: "gray", fontSize: 15 }}
          className="mx-2 mr-4"
        />
      )}
      <h1 className={` text-lg  `}>{name}</h1>
    </div>
  </a>);
};
const Sidenav = (props) => {
  const [from, setFrom] = useState(props.from);
  const [flowConfigOpen, setFlowConfigOpen] = useState(false);
  const [pageConfigOpen, setPageConfigOpen] = useState(false);
  const [l1Flow,setL1Flow] = useState(false);
  const [l2Flow,setL2Flow] = useState(false);

  useEffect(() => {

    const froml1 = L1Flow.find((e)=>from===e.from)
    const froml2 = L2Flow.find((e)=>from===e.from)
    if(!froml1 && !froml2 && from!="coming-soon"){
      setPageConfigOpen(true);
    }else{
      setFlowConfigOpen(true)
      if(!froml1 && from!="coming-soon"){
        setL2Flow(true)
      }else if(!froml2 && from!="coming-soon"){
        setL1Flow(true)
      }
    }
  }, []);

  const toggleFlowConfig = () => {
    setFlowConfigOpen(!flowConfigOpen);
  };

  const togglePageConfig = () => {
    setPageConfigOpen(!pageConfigOpen);
  };
  
  const L2Flow = [
    {
      name: "Job Done",
      link: "/job-done",
      from: "job-done",
    },
    {
      name: "Spare Part Request",
      link: "/coming-soon",
      from: "spare-part-request",
    },
    {
      name: "Reschedule",
      link: "/coming-soon",
      from: "reschedule",
    },
    {
      name: "Pending",
      link: "/coming-soon",
      from: "pending",
    },
    {
      name: "Estimate",
      link: "/coming-soon",
      from: "estimate",
    },
    {
      name: "Customer Disapproved",
      link: "/coming-soon",
      from: "customer-disapproved",
    },
    {
      name: "Beyond Repair",
      link: "/coming-soon",
      from: "beyond-repair",
    },
    {
      name: "Call back to workshop",
      link: "/coming-soon",
      from: "call-back-to-workshop",
    },
  ];
  
  const L1Flow = [
    {
      name: "Repair In Progress",
      link: "/coming-soon",
      from: "repair-in-progress",
    },
    {
      name: "Door Close",
      link: "/coming-soon",
      from: "door-close",
    },
    {
      name: "Exchange Requested",
      link: "/coming-soon",
      from: "exchange-requested",
    },
    
  ];

  

  return (
    <div className="h-full w-[400px] bg-[#111C43] overflow-y-auto">
      <div className="my-[20px]">
        <a href="/">
          <div className="flex items-center ml-[30px]">
            <img src={logo} alt="logo" className="w-[35px]" />
            <h1 className="text-white text-2xl mx-2   font-sans">Kapture CX</h1>
          </div>
        </a>
      </div>
      <div
        className="flex items-center mt-10 my-2 mx-5 px-2 py-3 rounded-md bg-[#1f2f7069]"
        onClick={toggleFlowConfig}
      >
        <AccountTreeIcon
          fontSize="small"
          sx={{ color: "white", fontSize: 30 }}
          className="mx-2"
        />
        <h1 className="text-lg text-white font-bold cursor-pointer">
          Flow Configuration
        </h1>
        <KeyboardArrowDownOutlinedIcon
          fontSize="small"
          sx={{ color: "white", fontSize: 30 }}
          className="mr-2 ml-auto"
        />
      </div>

      {flowConfigOpen && (
        <div className="ml-12 mr-5">
          <div
              className="flex items-center my-3 my-2 ml-5 px-2 py-3 rounded-md bg-[#1f2f7069]"
              onClick={(e)=>{setL1Flow(!l1Flow)}}
            >
              <h1 className="text-lg text-white  cursor-pointer ml-5">
                LEVEL 1              </h1>
              {(!l1Flow)?(<KeyboardArrowDownOutlinedIcon
                fontSize="small"
                sx={{ color: "white", fontSize: 25 }}
                className="mr-2 ml-auto"
              />)
              :(<KeyboardArrowUpIcon
                fontSize="small"
                sx={{ color: "white", fontSize: 25 }}
                className="mr-2 ml-auto"
              />)}
            </div>
            {
              (l1Flow)&&(L1Flow.map((item) =>{
                return <div key={item.id} className="ml-12 ">
                  {getSideBarLink(item.name,item.from,from,item.link)}
                </div>
              })
              )
            }
          <div
            className="flex items-center my-3 my-2 ml-5 px-2 py-3 rounded-md bg-[#1f2f7069]"
            onClick={(e)=>{setL2Flow(!l2Flow)}}
          >
            <h1 className="text-lg text-white  cursor-pointer ml-5">
            LEVEL 2
            </h1>
            {(!l2Flow)?(<KeyboardArrowDownOutlinedIcon
                fontSize="small"
                sx={{ color: "white", fontSize: 25 }}
                className="mr-2 ml-auto"
              />)
              :(<KeyboardArrowUpIcon
                fontSize="small"
                sx={{ color: "white", fontSize: 25 }}
                className="mr-2 ml-auto"
              />)}
          </div>
          {
            (l2Flow)&&(L2Flow.map((item) =>{
              return <div key={item.id} className="ml-12 ">
                {getSideBarLink(item.name,item.from,from,item.link)}
              </div>
            })
            )
          }
          {/* <a href="/job-done" className="w-50">
            <div
              className={`rounded-md ${
                from === "job-done"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "job-done" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Job Done</h1>
            </div>
          </a>
          <a href="/job-done" className="w-50">
            <div
              className={`rounded-md ${
                from === "spare-part-request"
                  ? "bg-[#1f2f7069]  text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "spare-part-request" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg `}>Spare Part Request</h1>
            </div>
          </a>
          <a href="/job-done" className="w-50">
            <div
              className={`rounded-md ${
                from === "spare-part-request"
                  ? "bg-[#1f2f7069]  text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "spare-part-request" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg `}>Spare Part Request</h1>
            </div>
          </a>
          <a href="/job-done" className="w-50">
            <div
              className={`rounded-md ${
                from === "spare-part-request"
                  ? "bg-[#1f2f7069]  text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "spare-part-request" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg `}>Spare Part Request</h1>
            </div>
          </a>
          <a href="/job-done" className="w-50">
            <div
              className={`rounded-md ${
                from === "spare-part-request"
                  ? "bg-[#1f2f7069]  text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "spare-part-request" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg `}>Spare Part Request</h1>
            </div>
          </a> */}
        </div>
      )}
      <div
        className="flex items-center my-2 mx-5 px-2 py-3 rounded-md bg-[#1f2f7069]"
        onClick={togglePageConfig}
      >
        <AppSettingsAltIcon
          fontSize="small"
          sx={{ color: "white", fontSize: 30 }}
          className="mx-2"
        />
        <h1 className="text-lg text-white font-bold cursor-pointer">
          Page Configuration
        </h1>
        <KeyboardArrowDownOutlinedIcon
          fontSize="small"
          sx={{ color: "white", fontSize: 30 }}
          className="mr-2 ml-auto"
        />
      </div>
      {pageConfigOpen && (
        <div className="ml-12 mr-5">
          <a href="/select-repair-type" className="w-50">
            <div
              className={`rounded-md ${
                from === "select-repair-type"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "select-repair-type" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Select Repair Type</h1>
            </div>
          </a>
          <a href="/add-order" className="w-50">
            <div
              className={`rounded-md ${
                from === "add-order"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "add-order" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Add order</h1>
            </div>
          </a>
          <a href="/image-selection" className="w-50">
            <div
              className={`rounded-md ${
                from === "image-selection"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "image-selection" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Image Selection</h1>
            </div>
          </a>
          <a href="/total-charges" className="w-50">
            <div
              className={`rounded-md ${
                from === "total-charges"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "total-charges" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Total Charges</h1>
            </div>
          </a>
          <a href="/technician-signature" className="w-50">
            <div
              className={`rounded-md ${
                from === "technician-signature"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "technician-signature" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Technician Signature</h1>
            </div>
          </a>
          <a href="/customer-signature" className="w-50">
            <div
              className={`rounded-md ${
                from === "customer-signature"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "customer-signature" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Customer Signature</h1>
            </div>
          </a>
          <a href="/otp-verification" className="w-50">
            <div
              className={`rounded-md ${
                from === "otp-verification"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "otp-verification" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>OTP Verification</h1>
            </div>
          </a>
          <a href="/customer-review" className="w-50">
            <div
              className={`rounded-md ${
                from === "customer-review"
                  ? "bg-[#1f2f7069] text-white"
                  : "pl-12 text-[#A3AED1]"
              } hover:bg-[#1f2f7069] my-5 px-2 py-2 flex items-center`}
            >
              {from == "customer-review" && (
                <TripOriginOutlinedIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 15 }}
                  className="mx-2 mr-4"
                />
              )}
              <h1 className={` text-lg  `}>Customer Review</h1>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidenav;
