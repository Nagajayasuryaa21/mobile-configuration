import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Sidenav from "../Sidenav";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import pageData from "../../constants/data";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const ImageSelection = (props) => {
  const [isChecked, setChecked] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [configJsonArray, setConfigJsonArray] = useState([]);
  const [configJson, setConfigJson] = useState({
    id: 0,
    title: "",
    name: "",
  });
  useEffect(() => {
    // Filter configJson based on groupType="JD" and pageName="Select Repair Type"
    const filteredConfig = pageData.configJson.filter(
      (item) => item.groupType === "JD" && item.pageName === "Image Selection"
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
    setConfigJsonArray(selectedConfigJson.configJson.images);
  }, []);

  console.log("CONST", selectedConfig);
  console.log("JSON", configJsonArray);

  const renderImage = (image) => {
    return (
      <div className="bg-white flex  m-1 h-[150px] rounded-md px-5 py-3 flex-col cursor-pointer" onClick={(e)=>{onImageClick(image)}}>
        <div className="flex justify-between mb-10">
          <h1 className=" text-black text-xl font-bold m1-3">{image.title}</h1>
          <div className="bg-black rounded-full px-1 flex justify-center items-center">
            <CameraAltOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
          </div>
        </div>
        <PermMediaIcon sx={{ color: "black", fontSize: 50 }} />
      </div>
    );
  };

  const onImageClick = (image) => {
    setConfigJson({...image})
  }

  const resetImageJson = () =>{
    setConfigJson({
      id: 0,
      title: "",
      name: "",
    }) 
  }

  const validate = ()=>{
    if(!configJson.title){
      alert("Title Cannot be Empty")
      return 0
    }
    if(!configJson.name){
      alert("Image Name Cannot be Empty")
      return 0
    }
    
    return 1
  }

  const getJson = ()=>{
    return configJson;
  }

  const handleAddItem = () => {
    if(!validate()){
      return
    }
    const newJson = {...getJson(),id:(configJsonArray.length+1)}
    setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,images:[...configJsonArray, configJson]}})
    setConfigJsonArray([...configJsonArray, newJson])
    resetImageJson()

  };

  const handleUpdateItem = () => {
    // Find index of currentItem in bodyItems
    if(!validate()){
      return
    }
      const index = configJsonArray.findIndex((item) => item.id === configJson.id);
      if (index !== -1) {
        // Update item at index with currentItem
        const updatedBodyItems = [...configJsonArray];
        updatedBodyItems[index] = {...getJson()};
        setConfigJsonArray(updatedBodyItems);
        setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,body:updatedBodyItems}})
      }else{
        alert("Please select valid item for update")
      }
    
    resetImageJson()

  };

  const handleDeleteItem = () => {
    
    // Filter out currentItem from bodyItems
    
      const updatedBodyItems = configJsonArray.filter(
        (item) => item.id !== configJson.id
      );
      setConfigJsonArray(updatedBodyItems)
      setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,body:updatedBodyItems}})
      resetImageJson()
    
  };

  return (
    <div className="h-screen flex">
      <Sidenav from="image-selection" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
            Image Selection
          </h1>
          <button className="mx-5 bg-[#1F73B7] text-white px-4 py-1 rounded-lg shadow-xl hover:bg-[#1E88E5]">
            SAVE UPDATES
          </button>
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-[65%] overflow-auto h-full bg-[#F1F1F1] border-r-2 flex px-20 py-20 items-center justify-center border-gray-300">
            <div className="w-[400px] h-[800px] bg-[#5AA9E1] rounded-3xl border-solid border-2 border-black">
              <div className="flex h-[30px] justify-between items-center py-5 w-full my-2 mb-4">
                <KeyboardBackspaceIcon
                  fontSize="small"
                  sx={{ color: "black", fontSize: 40 }}
                  className="ml-2"
                />
                <h1 className="  text-xl py-5 text-center w-full mr-10">
                  Select Image
                </h1>
              </div>
              <div className="h-[80%]">
                <div className="h-full ">
                {configJsonArray &&
                  configJsonArray.map((items) => {
                    return <div key={items.id}>{renderImage(items)}</div>;
                  })}
                </div>
                <h1 className="text-white text-center rounded-md py-1 bg-[#0E2859] flex justify-center items-center text-xl mt-[30px] mx-5">
                  Next
                </h1>
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
            <div className="pb-4 flex flex-wrap">
              <div className="w-[50%] my-3 px-5">
                <h1 className="font-light my-2 text-xl  text-gray-600">
                  Title
                </h1>
                {/* <select className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl ">
                  <option value="">Select</option>
                </select> */}
                <input
                  className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                  placeholder="Enter Title"
                  value={configJson.title}
                  onChange={(e)=>{setConfigJson({...configJson,title:e.target.value})}}
                />
              </div>
              <div className="w-[50%] my-3 px-5">
                <h1 className="font-light my-2 text-xl  text-gray-600">
                  Save Image As
                </h1>
                {/* <select className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl ">
                  <option value="">Select</option>
                </select> */}
                <input
                  className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                  placeholder="Enter Image Name"
                  value={configJson.name}
                  onChange={(e)=>{setConfigJson({...configJson,name:e.target.value})}}
                />
              </div>
            </div>

            <div className="pb-5 px-4 border-dashed border-gray-500 border-b-2"></div>
            <div className="px-2 flex flex-wrap justify-center items-center gap-2 py-5">
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={handleUpdateItem}>
                Update
              </button>
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={resetImageJson}>
                Reset
              </button>
              <button className="border-[#D32F2F] border-solid border  rounded-lg px-5 py-2 text-[#D32F2F] hover:text-white hover:font-bold hover:bg-[#D32F2F] text-base" onClick={handleDeleteItem}>
                Remove Page
              </button>
              {(configJson.id === 0)&&(<button className="bg-[#082F49] rounded-lg py-2 px-10 text-white font-bold text-base hover:bg-[#1F73B7]" onClick={handleAddItem}>
                Add New page
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelection;
