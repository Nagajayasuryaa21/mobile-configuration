import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Sidenav from "../Sidenav";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import pageData from "../../constants/data";

const AddOrder = (props) => {
  const [isChecked, setChecked] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [configJson,setConfigJson] = useState({
    isStockEnable:false,
    isPriceEnable:false,
    isQuantityEnable:false
  })  
  useEffect(() => {
    // Filter configJson based on groupType="JD" and pageName="Select Repair Type"
    const filteredConfig = pageData.configJson.filter(
      (item) =>
        item.groupType === "JD" && item.pageName === "Add Order"
    );
    var selectedConfigJson;
    if (filteredConfig.length > 1) {
      selectedConfigJson = filteredConfig.find(
        (item) => item.nextPage === "Condition"
      );
    } else {
      selectedConfigJson = filteredConfig[0];
    }
    // Set the selected configJson to state
    setSelectedConfig(selectedConfigJson);
    setConfigJson(selectedConfigJson.configJson);
  }, []);

  console.log("CONST",selectedConfig)
  console.log("JSON",configJson)

  return (
    <div className="h-screen flex">
      <Sidenav from="add-order" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
            Add Order
          </h1>
          <button className="mx-5 bg-[#1F73B7] text-white px-4 py-1 rounded-lg shadow-xl hover:bg-[#1E88E5]">SAVE UPDATES</button>
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-[65%] overflow-auto h-full bg-[#F1F1F1] border-r-2 flex px-20 py-20 items-center justify-center border-gray-300">
            <div className="w-[400px] h-[800px] bg-[#5AA9E1] rounded-3xl border border-solid border-2 border-black">
              <div className="flex h-[30px] justify-between items-center py-5 w-full my-2">
                <KeyboardBackspaceIcon
                  fontSize="small"
                  sx={{ color: "black", fontSize: 40 }}
                  className="ml-2"
                />
                <h1 className="  text-xl py-5 text-center w-full ml-5">
                  Add Order
                </h1>
                <div className="flex">
                  <h1>Next</h1>
                  <KeyboardDoubleArrowRightIcon
                    fontSize="small"
                    sx={{ color: "black", fontSize: 25 }}
                    className="ml-2"
                  />
                </div>
              </div>
              <div className="bg-[#0E2859] border-gray-400 border-2 flex items-center h-10 w-full px-2 py-3">
                <SearchIcon
                  fontSize="small"
                  sx={{ color: "gray", fontSize: 25 }}
                  className="ml-2"
                />
                <h1 className="text-gray-500 text-xl mx-5">Search</h1>
              </div>
              <div>
                <div className="bg-white flex  m-1 rounded-md px-5 py-3 flex-col">
                    <h1 className=" text-red-700 text-xl font-bold m1-3">Spare Title (ABC...)</h1>
                    <h1 className="  text-sm  my-1">SkuCode: 123..</h1>
                    {(configJson.isStockEnable)&&(<h1 className="  text-sm  my-1">Stock: 0</h1>)}
                    {(configJson.isPriceEnable)&&(<h1 className="  text-sm  my-1">Price: 0.0</h1>)}
                    {(configJson.isQuantityEnable)&&(<div className="flex">
                        <h1>Qty</h1> 
                        <div className="border-2 text-red-700 border-red-700 rounded-full text-sm px-2 mx-3 font-bold ">-</div>
                        <div className="border rounded-xl px-5 text-center flex justify-center items-center">0</div>
                        <div className="border-2 text-red-700 border-red-700 rounded-full text-sm px-1.5 mx-3 font-bold ">+</div>
                    </div>)}
                </div>
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
            <div className="flex flex-wrap mt-3 pb-5 px-4 border-dashed border-gray-500 border-b-2"></div>
            <h1 className="text-lg px-5 text-[#1F73B7] font-sans font-bold mt-4 mb-5">
              Set page items
            </h1>
            <div className="flex flex-wrap pb-5 px-4">
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={configJson.isStockEnable}
                      onChange={(e)=>{setConfigJson({...configJson,isStockEnable:e.target.checked})}}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        configJson.isStockEnable ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        configJson.isStockEnable ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className="ml-3">Enable Stock</h1>
              </div>
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" 
                      value={configJson.isPriceEnable}
                      onChange={(e)=>{setConfigJson({...configJson,isPriceEnable:e.target.checked})}}
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        configJson.isPriceEnable ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        configJson.isPriceEnable ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className=" ml-3">Enable Price </h1>
              </div>
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" 
                      value={configJson.isQuantityEnable}
                      onChange={(e)=>{setConfigJson({...configJson,isQuantityEnable:e.target.checked})}}
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        configJson.isQuantityEnable ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        configJson.isQuantityEnable ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className=" ml-3">Enable Quantity </h1>
              </div>
            </div>
            <div className="pb-5 px-4 border-dashed border-gray-500 border-b-2">
            </div>
            <div className="px-2 flex flex-wrap justify-center items-center gap-2 py-5">
              {/* <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base">
                Update
              </button>
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base">
                Reset
              </button> */}
              {/* <button className="border-[#D32F2F] border-solid border  rounded-lg px-5 py-2 text-[#D32F2F] hover:text-white hover:font-bold hover:bg-[#D32F2F] text-base">
                Remove Page
              </button>
              <button className="bg-[#082F49] rounded-lg py-2 px-10 text-white font-bold text-base hover:bg-[#1F73B7]">
                Add New page
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
