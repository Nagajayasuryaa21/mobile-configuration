import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Sidenav from "../Sidenav";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import pageData from "../../constants/data";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const TotalCharges = (props) => {
  const [isFOCEnable, setIsFOCEnable] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [bodyItems, setBodyItems] = useState([]);
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
  });

  useEffect(() => {
    // Filter configJson based on groupType="JD" and pageName="Select Repair Type"
    const filteredConfig = pageData.configJson.filter(
      (item) => item.groupType === "JD" && item.pageName === "Total Charges"
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
    setBodyItems(selectedConfigJson.configJson.body);
    setIsFOCEnable(selectedConfigJson.configJson.isFOCEnable);
  }, []);

  console.log("Select Config", selectedConfig);
  console.log(bodyItems);
  console.log(isFOCEnable);

  const renderBodyInput = (item) => {
    switch (item.type) {
      case "text":
        return (
          <div className="flex justify-between items-center my-2 cursor-pointer" onClick={()=>{handleOnItemClick(item)}}>
            <h1 className="text-sm ">{item.title}</h1>
            <input
              type="text"
              className="bg-gray-200 w-[150px] rounded-md px-2 text-sm py-1 text-center"
              value="0.0"
            />
          </div>
        );
      case "dropdown-sm":
        return (
          <div className="flex justify-between items-center my-2 cursor-pointer" onClick={()=>{handleOnItemClick(item)}}>
            <h1 className="text-sm ">{item.title}</h1>
            <select className="border-gray-200 w-[150px] rounded-md px-2 text-sm py-1 text-center" ></select>
          </div>
        );
      case "dropdown-lg":
        return (
          <div className="bg-gray-300  rounded-lg px-2 py-2 my-2 cursor-pointer" onClick={()=>{handleOnItemClick(item)}}>
            <h1 className="w-full py-1 text-center text-sm rounded-lg">
              {item.title}
            </h1>
            <select className="w-full bg-white text-sm rounded-lg py-3 px-3">
              <option>Select</option>
            </select>
          </div>
        );
      case "toggle":
        return (
          <div className="flex justify-between items-center my-2 cursor-pointer" onClick={()=>{handleOnItemClick(item)}}>
            <h1 className="text-sm ">{item.title}</h1>
            <label className="flex cursor-pointer select-none mx-3 items-center ">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div
                  className={`block h-3 w-8 rounded-full bg-slate-500`}
                ></div>
                <div
                  className={`dot absolute left-[-1px] top-[-3px] h-5 w-5 rounded-full bg-gray-300 transition`}
                ></div>
              </div>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  const validate = () => {
    if (!currentItem.title) {
      alert("Title Cannot be Empty");
      return 0;
    }
    if (!currentItem.type) {
      alert("Please Select Input Type");
      return 0;
    }
    if (currentItem.isInputEnable) {
      if (!currentItem.input.objId || !currentItem.input.objId) {
        alert("If input enable ObjID or FieldId Cannot be empty ");
        return 0;
      }
    }
    if (currentItem.isOutPutEnable) {
      if (!currentItem.output.objId || !currentItem.output.objId) {
        alert("If output enable ObjID or FieldId Cannot be empty ");
        return 0;
      }
    }
    return 1;
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
    });
  };
  const handleOnItemClick = (item) => {
    const newObj = { ...item };
    setCurrentItem(newObj);
  };

  const getJson = () => {
    return currentItem;
  };

  const handleAddItem = () => {
    if (!validate()) {
      return;
    }
    const newJson = { ...getJson(), id: bodyItems.length + 1 };
    setSelectedConfig({
      ...selectedConfig,
      configJson: {
        ...selectedConfig.configJson,
        body: [...bodyItems, newJson],
      },
    });
    setBodyItems([...bodyItems, newJson]);

    // Clear currentItem
    resetItems();
  };

  const handleUpdateItem = () => {
    // Find index of currentItem in bodyItems
    if (!validate()) {
      return;
    }
    const index = bodyItems.findIndex((item) => item.id === currentItem.id);
    if (index !== -1) {
      // Update item at index with currentItem
      const updatedBodyItems = [...bodyItems];
      updatedBodyItems[index] = { ...getJson() };
      setBodyItems(updatedBodyItems);
      setSelectedConfig({
        ...selectedConfig,
        configJson: { ...selectedConfig.configJson, body: updatedBodyItems },
      });
    } else {
      alert("Please select valid item for update");
    }

    resetItems();
  };

  const handleDeleteItem = () => {
    const updatedBodyItems = bodyItems.filter(
      (item) => item.id !== currentItem.id
    );
    setBodyItems(updatedBodyItems);
    setSelectedConfig({
      ...selectedConfig,
      configJson: { ...selectedConfig.configJson, body: updatedBodyItems },
    });
    // Clear currentItem
    resetItems();
  };

  return (
    <div className="h-screen flex">
      <Sidenav from="total-charges" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
            Total Charges
          </h1>
          <button className="mx-5 bg-[#1F73B7] text-white px-4 py-1 rounded-lg shadow-xl hover:bg-[#1E88E5]">
            SAVE UPDATES
          </button>
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-[65%] overflow-auto h-full bg-[#F1F1F1] border-r-2 flex px-20 py-20 items-center justify-center border-gray-300">
            <div className="w-[400px] h-[800px] bg-[#0E2859] rounded-3xl border border-solid border-2 border-black">
              <div className="flex h-[30px] rounded-t-3xl bg-[#5AA9E1] justify-between items-center py-8 w-full ">
                <KeyboardBackspaceIcon
                  fontSize="small"
                  sx={{ color: "black", fontSize: 40 }}
                  className="ml-2"
                />
                <h1 className="  text-xl py-5 text-center w-full  mr-10">
                  Charges Applicable
                </h1>
              </div>
              <div className="h-[85%] overflow-auto py-2 px-5">
                <div className="bg-gray-200 flex flex-col justify-center items-center py-1 w-full rounded-xl my-3">
                  <ConfirmationNumberIcon />
                  <h1 className=" text-red-600 font-bold">
                    Ticket Number : 1235468468
                  </h1>
                </div>
                <div className=" bg-gray-200 rounded-xl px-2 py-2 ">
                  <div className="w-full flex">
                    <div className="w-[50%]"></div>
                    <div className="flex w-[50%]">
                      <h1 className="text-[10px] w-full text-center px-5 py-1">
                        Quantity
                      </h1>
                      <h1 className="text-[10px] w-full text-center px-5 py-1">
                        Rate
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[50%] h-8 rounded-lg bg-[#0E2859] px-1 py-1 text-sm text-white">
                      MAT
                    </div>
                    <div className="w-[50%]">
                      <div className="flex justify-center items-center">
                        <div className=" bg-white w-full mx-1 px-5 py-1 text-center rounded-lg">
                          1
                        </div>
                        <div className=" bg-white w-full mx-1 px-5 py-1 text-center rounded-lg">
                          1
                        </div>
                      </div>
                    </div>
                  </div>
                  {isFOCEnable && (
                    <div className="flex px-1 py-1">
                      <input type="checkbox" className="bg-[#44b6ca]" />
                      <h1 className="text-sm px-2"> FOC Product</h1>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className=" text-[#44b6ca] my-3 text-center font-bold">
                    Payment Summary
                  </h1>
                  <div className="bg-white  px-2 py-3 rounded-xl">
                    {bodyItems &&
                      bodyItems.map((items) => {
                        return (
                          <div key={items.id}>{renderBodyInput(items)}</div>
                        );
                      })}
                    <div className="h-0.5 w-full bg-red-700 my-3"></div>
                    <div className="w-full flex shadow-bg-gray-600 shadow-xl py-2  border items-center  justify-between">
                      <h1 className="text-sm mx-3">Total Applicable Charges</h1>
                      <CurrencyRupeeIcon
                        sx={{ color: "black", fontSize: 18 }}
                      />
                      <h1 className=" text-red-700 mx-5 px-5">0</h1>
                    </div>
                    <h1 className="px-2 text-center text-sm py-1 bg-[#1F73B7] my-2 mx-5 rounded-lg text-white">
                      Calculate
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-center  items-center h-[6%]">
                <h1 className="text-center rounded-md py-i bg-green-400 w-full mx-10 flex justify-center items-center text-xl ">
                  Save And Continue
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
            <div className="flex flex-wrap pb-5 px-4">
              <div className="flex mx-5 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isFOCEnable}
                      onChange={() => {
                        setIsFOCEnable(!isFOCEnable);
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        isFOCEnable ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        isFOCEnable ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className="ml-3">Enable FOC Products</h1>
              </div>
            </div>
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
                  <option value="">Select</option>
                  <option value="text">Text</option>
                  <option value="dropdown-sm">Dropdown Small</option>
                  <option value="dropdown-lg">Dropdown Medium</option>
                  <option value="toggle">Toggle</option>
                </select>
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
                        currentItem.isEditable
                          ? "bg-[#1F73B7]"
                          : " bg-slate-600"
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
            <div className="pb-5 px-4 ">
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
                <div className="flex">
                  <div className="mx-5 my-3">
                    <h1 className="font-light my-2 text-lg  text-gray-600">
                      Input Object Id
                    </h1>
                    <input
                      className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                      value={currentItem.input.objId}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          input: {
                            ...currentItem.input,
                            objId: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="mx-5 my-3">
                    <h1 className="font-light my-2 text-lg  text-gray-600">
                      Input Field Id
                    </h1>
                    <input
                      className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                      value={currentItem.input.fieldId}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          input: {
                            ...currentItem.input,
                            fieldId: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
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
                <div className="flex">
                  <div className="mx-5 my-3">
                    <h1 className="font-light my-2 text-lg  text-gray-600">
                      Output Object Id
                    </h1>
                    <input
                      className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                      value={currentItem.output.objId}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          output: {
                            ...currentItem.output,
                            objId: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="mx-5 my-3">
                    <h1 className="font-light my-2 text-lg  text-gray-600">
                      Output Field Id
                    </h1>
                    <input
                      className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                      value={currentItem.output.fieldId}
                      onChange={(e) => {
                        setCurrentItem({
                          ...currentItem,
                          output: {
                            ...currentItem.output,
                            fieldId: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-5 px-4 border-dashed border-gray-500 border-b-2"></div>
            <div className="px-2 flex flex-wrap justify-center items-center gap-2 py-5">
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={handleUpdateItem}>
                Update
              </button>
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={resetItems}>
                Reset
              </button>
              <button className="border-[#D32F2F] border-solid border  rounded-lg px-5 py-2 text-[#D32F2F] hover:text-white hover:font-bold hover:bg-[#D32F2F] text-base" onClick={handleDeleteItem}>
                Remove Item
              </button>
              {(currentItem.id === 0)&&(<button className="bg-[#082F49] rounded-lg py-2 px-10 text-white font-bold text-base hover:bg-[#1F73B7]" onClick={handleAddItem}>
                Add New Item
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCharges;
