import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Sidenav from "../Sidenav";
import pageData from "../../constants/data";

const SelectRepairType = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [configJson, setConfigJson] = useState(pageData.configJson);
  const [enableAdd, setEnableAdd] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [headItems, setHeadItems] = useState(null);
  const [bodyItems, setBodyItems] = useState(null);
  const [currentItem, setCurrentItem] = useState({
    id: 0,
    title: "",
    type: "",
    isEditable: false,
    isInputEnable: false,
    isMandatory: false,
    isOutPutEnable: false,
    input: {
      objId: "",
      fieldId: "",
    },
    output: {
      objId: "",
      fieldId: "",
    },
    position: "",
  });

  useEffect(() => {
    // Filter configJson based on groupType="JD" and pageName="Select Repair Type"
    const filteredConfig = pageData.configJson.filter(
      (item) =>
        item.groupType === "JD" && item.pageName === "Select Repair Type"
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
    setHeadItems(selectedConfigJson.configJson.head);
    setBodyItems(selectedConfigJson.configJson.body);
  }, []);
  console.log("Select Config",selectedConfig);
  console.log(headItems);
  const renderHeadInput = (item) => {
    switch (item.type) {
      case "calendar":
        return (
          <div className="flex my-1 w-full justify-between cursor-pointer" onClick={()=>{handleOnItemClick(item,"Top")}}>
            <h1 className="text-white font-bold">{item.title}</h1>
            <input type="date" className="w-[150px]" />
          </div>
        );
      case "text":
      case "button-text":
        return (
          <div className="flex my-1 w-full justify-between cursor-pointer"  onClick={()=>{handleOnItemClick(item,"Top")}}>
            <h1 className="text-white font-bold">{item.title}</h1>
            <input type="text" className="w-[150px]" />
          </div>
        );
      default:
        return null;
    }
  };
  const renderBodyInput = (item) => {
    switch (item.type) {
      case "check-box":
        return (
          <div className="flex my-2 mx-6 rounded-md py-1 justify-center items-center bg-[#0E2859] cursor-pointer" onClick={()=>{handleOnItemClick(item,"Bottom")}}>
            <h1 className="text-white ">{item.title}</h1>
            <input type="checkbox" className="mx-2 bg-black" />
          </div>
        );
      case "text":
        return (
          <div className="flex flex-col mx-5 my-2 justify-between cursor-pointer" onClick={()=>{handleOnItemClick(item,"Bottom")}}>
            <h1 className=" text-gray-800 ">{item.title}</h1>
            <input type="text" className="w-full py-1 rounded-md" />
          </div>
        );
      case "dropdown":
        return (
          <div className="flex flex-col mx-5 px-2 py-1 rounded-md my-2 justify-between bg-white cursor-pointer" onClick={()=>{handleOnItemClick(item,"Bottom")}}>
            <h1 className=" text-white text-center rounded-md py-1 bg-[#0E2859] w-full">
              {item.title}
            </h1>
            <select className="py-3 bg-white px-2">
              <option>Select</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const getJson = ()=>{
    const newJson = {
      id: currentItem.id,
      title: currentItem.title,
      type: currentItem.type,
      isEditable: currentItem.isEditable,
      isInputEnable: currentItem.isInputEnable,
      isMandatory: currentItem.isMandatory,
      isOutPutEnable: currentItem.isOutPutEnable,
      input: {
        objId: currentItem.input.objId,
        fieldId: currentItem.input.fieldId,
      },
      output: {
        objId: currentItem.output.objId,
        fieldId: currentItem.output.objId,
      },
    }
    return newJson
  }

  const validate = ()=>{
    if(!currentItem.title){
      alert("Title Cannot be Empty")
      return 0
    }
    if(!currentItem.type){
      alert("Please Select Input Type")
      return 0
    }
    if(currentItem.isInputEnable){
      if(!currentItem.input.objId || !currentItem.input.objId){
        alert("If input enable ObjID or FieldId Cannot be empty ")
        return 0
      }
    }
    if(currentItem.isOutPutEnable){
      if(!currentItem.output.objId || !currentItem.output.objId){
        alert("If output enable ObjID or FieldId Cannot be empty ")
        return 0
      }
    }
    return 1
  }

  const handleAddItem = () => {
    if(!validate()){
      return
    }
    // Add current item to bodyItems
    if(currentItem.position === "Bottom"){
      const newJson = {...getJson(),id:(bodyItems.length+1)}
      setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,body:[...bodyItems, newJson]}})
      setBodyItems([...bodyItems, newJson])
    }else if(currentItem.position === "Top"){
      const newJson = {...getJson(),id:(headItems.length+1)}
      // setHeadItems([...headItems, newJson])
      setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,head:[...headItems, newJson]}})
      setHeadItems([...headItems, newJson])

    }else{
      alert("Please Select Item Position")
      return
    }
    // Clear currentItem
    resetItems()

  };

  const handleUpdateItem = () => {
    // Find index of currentItem in bodyItems
    if(!validate()){
      return
    }
    if(currentItem.position === "Bottom"){
      const index = bodyItems.findIndex((item) => item.id === currentItem.id);
      if (index !== -1) {
        // Update item at index with currentItem
        const updatedBodyItems = [...bodyItems];
        updatedBodyItems[index] = {...getJson()};
        setBodyItems(updatedBodyItems);
        setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,body:updatedBodyItems}})
      }else{
        alert("Please select valid item for update")
      }
    }else if(currentItem.position === "Top"){
      // setHeadItems([...headItems, newJson])
      const index = headItems.findIndex((item) => item.id === currentItem.id);
      if (index !== -1) {
        // Update item at index with currentItem
        const updatedHeadItems = [...headItems];
        updatedHeadItems[index] = {...getJson()};
        setHeadItems(updatedHeadItems);
        setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,head:updatedHeadItems}})
      }else{
        alert("Please select valid item for update")
      }
    }else{
      alert("Please Select Item Position")
      return
    }
    
    resetItems()

  };

  const handleDeleteItem = () => {
    
    // Filter out currentItem from bodyItems
    
    if(currentItem.position === "Bottom"){
      const updatedBodyItems = bodyItems.filter(
        (item) => item.id !== currentItem.id
      );
      setBodyItems(updatedBodyItems)
      setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,body:updatedBodyItems}})
    }else if(currentItem.position === "Top"){
      const updatedHeadItems = headItems.filter(
        (item) => item.id !== currentItem.id
      );
      setHeadItems(updatedHeadItems)
      setSelectedConfig({...selectedConfig,configJson:{...selectedConfig.configJson,head:updatedHeadItems}})

    }
    // Clear currentItem
    resetItems()
    
  };

  const resetItems = () => {
    setCurrentItem({
      id: 0,
      title: "",
      type: "",
      isEditable: false,
      isInputEnable: false,
      isMandatory: false,
      isOutPutEnable: false,
      input: {
        objId: "",
        fieldId: "",
      },
      output: {
        objId: "",
        fieldId: "",
      },
      position: "",
    });
  }
  const handleOnItemClick = (item,position) =>{
    const newObj = {...item,position:position}
    setCurrentItem(newObj)
  }

  const renderOptions = ()=>{
    if(currentItem.position === "Top"){
      return(
        <>
          <option value="">Select</option>
          <option value="text">Text</option>
          <option value="calendar">CalendarText</option>
          <option value="button-text">Button Text</option>
        </>
      )
    }else if(currentItem.position === "Bottom"){
      return(
        <>
          <option value="">Select</option>
          <option value="text">Text</option>
          <option value="check-box">Check box</option>
          <option value="dropdown">Dropdown</option>
        </>
      )
    }
  }

  return (
    <div className="h-screen flex">
      <Sidenav from="select-repair-type" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
            Select Repair Type
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
                <h1 className="  text-xl py-5 text-center w-full mr-8">
                  Select Repair Type
                </h1>
              </div>
              <div className="bg-[#0E2859] w-full px-2 py-3">
                {headItems &&
                  headItems.map((items) => {
                    return <div key={items.id}>{renderHeadInput(items)}</div>;
                  })}
              </div>
              <div>
                {bodyItems &&
                  bodyItems.map((items) => {
                    return <div key={items.id}>{renderBodyInput(items)}</div>;
                  })}
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
            <h1 className="text-lg px-5 text-[#1F73B7] font-sans font-bold mb-5">
              Set Item Position
            </h1>
            <div className="w-full my-4 px-5">
              <h1 className="font-light my-2 text-xl  text-gray-600">
                Select Item Position
              </h1>
              <select
                className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                value={currentItem.position}
                onChange={(e)=>{setCurrentItem({...currentItem,position:e.target.value})}}
              >
                <option value="">Select</option>
                <option value="Top">Add Item at Top</option>
                <option value="Bottom">Add Item at Bottom</option>
              </select>
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
                  placeholder="Enter Key"
                  value={currentItem.title}
                  onChange={(e) => {
                    setCurrentItem({ ...currentItem, title: e.target.value });
                  }}
                />
              </div>
              <div className=" w-[50%] my-3 px-5">
                <h1 className="font-light my-2 text-xl  text-gray-600">Type</h1>
                <select
                  className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                  placeholder="Enter Value"
                  value={currentItem.type}
                  onChange={(e) => {
                    setCurrentItem({ ...currentItem, type: e.target.value });
                  }}
                >
                  {renderOptions()}
                </select>
                {(!currentItem.position)&&(
                  <h1 className=" text-red-600 text-sm">Please select position</h1>
                )}
              </div>
            </div>
            <div className="flex flex-wrap pb-5 px-4">
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentItem.isEditable}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          isEditable: e.target.checked,
                        });
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        currentItem.isEditable ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        currentItem.isEditable ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className="ml-3">Is Editable</h1>
              </div>
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={currentItem.isMandatory}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          isMandatory: e.target.checked,
                        });
                      }}
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        currentItem.isMandatory
                          ? "bg-[#1F73B7]"
                          : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        currentItem.isMandatory ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className=" ml-3">Is Mandatory Field </h1>
              </div>
            </div>
            <div className="pb-5 px-4 border-dashed border-gray-500 border-b-2">
              <div>
                <div className="flex mx-5 my-2">
                  <label className="flex cursor-pointer select-none items-center ">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={currentItem.isInputEnable}
                        onChange={(e) => {
                          setCurrentItem({
                            ...currentItem,
                            isInputEnable: e.target.checked,
                          });
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`block h-6 w-10 rounded-full ${
                          currentItem.isInputEnable
                            ? "bg-[#1F73B7]"
                            : " bg-slate-600"
                        } `}
                      ></div>
                      <div
                        className={`dot absolute left-1 ${
                          currentItem.isInputEnable ? "translate-x-full" : "1"
                        } top-1 h-4 w-4 rounded-full bg-white transition`}
                      ></div>
                    </div>
                  </label>
                  <h1 className="ml-3">Is Input Enable</h1>
                </div>
                {currentItem.isInputEnable && (
                  <div className="flex">
                    <div className="mx-5 my-3">
                      <h1 className="font-light my-2 text-lg  text-gray-600">
                        Input Object Id
                      </h1>
                      <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl " 
                      value={currentItem.input.objId}
                      onChange={(e)=>{setCurrentItem({...currentItem,input:{...currentItem.input,objId:e.target.value}})}}
                      />
                    </div>
                    <div className="mx-5 my-3">
                      <h1 className="font-light my-2 text-lg  text-gray-600">
                        Input Field Id
                      </h1>
                      <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                      value={currentItem.input.fieldId}
                      onChange={(e)=>{setCurrentItem({...currentItem,input:{...currentItem.input,fieldId:e.target.value}})}}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="flex mx-5 my-2">
                  <label className="flex cursor-pointer select-none items-center ">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={currentItem.isOutPutEnable}
                        onChange={(e) => {
                          setCurrentItem({
                            ...currentItem,
                            isOutPutEnable: e.target.checked,
                          });
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`block h-6 w-10 rounded-full ${
                          currentItem.isOutPutEnable
                            ? "bg-[#1F73B7]"
                            : " bg-slate-600"
                        } `}
                      ></div>
                      <div
                        className={`dot absolute left-1 ${
                          currentItem.isOutPutEnable ? "translate-x-full" : "1"
                        } top-1 h-4 w-4 rounded-full bg-white transition`}
                      ></div>
                    </div>
                  </label>
                  <h1 className="ml-3">Is Output Enable</h1>
                </div>
                {currentItem.isOutPutEnable && (
                  <div className="flex">
                    <div className="mx-5 my-3">
                      <h1 className="font-light my-2 text-lg  text-gray-600">
                        Output Object Id
                      </h1>
                      <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl " 
                      value={currentItem.output.objId}
                      onChange={(e)=>{setCurrentItem({...currentItem,output:{...currentItem.output,objId:e.target.value}})}}
                      />
                    </div>
                    <div className="mx-5 my-3">
                      <h1 className="font-light my-2 text-lg  text-gray-600">
                        Output Field Id
                      </h1>
                      <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl " 
                      value={currentItem.output.fieldId}
                      onChange={(e)=>{setCurrentItem({...currentItem,output:{...currentItem.output,fieldId:e.target.value}})}}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="px-2 flex flex-wrap justify-center items-center gap-2 py-5">
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={handleUpdateItem}>
                Update
              </button>
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={resetItems}>
                Reset
              </button>
              <button className="border-[#D32F2F] border-solid border  rounded-lg px-5 py-2 text-[#D32F2F] hover:text-white hover:font-bold hover:bg-[#D32F2F] text-base" onClick={handleDeleteItem}>
                Remove item
              </button>
              {(currentItem.id === 0)&&(<button className="bg-[#082F49] rounded-lg py-2 px-10 text-white font-bold text-base hover:bg-[#1F73B7]" onClick={handleAddItem}>
                Add New item
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRepairType;
