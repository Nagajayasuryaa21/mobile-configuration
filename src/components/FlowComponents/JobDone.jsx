import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidenav from "../Sidenav";
import pageData from "../../constants/data";

const PageTree2 = ({ pages, currentPage, depth ,pageClick, plusClick, editPage}) => {
  // Find the current page objects
  let currentPageObj;
  const currentPageObjs = pages.filter((page) => page.pageName === currentPage);
  const checkNextPageObj = currentPageObjs.find(
    (page) => page.nextPage === "Condition"
  );
  if (checkNextPageObj) {
    currentPageObj = checkNextPageObj;
  } else {
    currentPageObj = currentPageObjs[0];
  }
  // Base case: if current page object is not found or it's a dispose page, return null
  if (!currentPageObjs.length || currentPage == "Condition") {
    return null;
  }
  const nextPageObjects = pages.filter((page) => page.pageName === currentPageObj.nextPage);
  

  return (
    <div className="items-center">
      <div className="flex items-center my-2">
        <div className="hover:bg-[#0972D3] text-[#0972D3] hover:text-white border-solid border-2 border-[#0972D3] w-10 h-10 rounded-full mx-4 flex justify-center items-center cursor-pointer" onClick={(e)=>{pageClick(currentPageObj)}} >
          <h1 className="text-lg font-bold ">{depth + 1}</h1>
        </div>
        <button className="px-5 py-3 bg-[#082F49] hover:bg-[#0972D3] text-lg text-white font-bold rounded-lg" onClick={(e)=>{editPage(currentPageObj)}}>
          {currentPage}
        </button>
      </div>
      {!currentPageObj.isDisposePage && currentPageObj.nextPage != "Dispose" ? (
        <div className="flex flex-col">
          <div className="bg-[#0972D3] h-10 w-1 ml-8"></div>
          {(!nextPageObjects.length) && (
            <button className="hover:bg-[#0972D3] text-[#0972D3] hover:text-white border-solid border-2 border-[#0972D3] h-10 w-10 rounded-full ml-4 my-2  flex justify-center items-center text-xl font-bold" onClick={(e)=>{plusClick(currentPageObj)}}>+</button>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-[#0972D3] h-10 w-1 ml-8"></div>
          <button className="px-3 py-1 my-2 bg-[#0972D3] text-white border-solid border-2 border-[#0972D3] text-sm font-bold rounded-lg">
            Dispose
          </button>
        </div>
      )}
      <div
        className={`flex ${
          currentPageObjs.length > 1
            ? "border-t-4  border-solid border-[#0972D3]"
            : ""
        }`}
      >
        {currentPageObjs.map((page, index) => (
          (page.nextPage === "Condition")?(<></>):
          (<div className="" key={index}>
            {currentPageObjs.length > 1 &&
            page.conditionJson.key &&
            page.conditionJson.value ? (
              <div>
                <button className="px-3  my-2 hover:bg-[#D32F2F] text-[#D32F2F] hover:text-white border-solid border-2 border-[#D32F2F] font-bold rounded-xl" onClick={(e)=>{pageClick(page)}}>
                  Condition
                </button>
                {(!findPages(page,pages)) && (
                  <button className="hover:bg-[#0972D3] text-[#0972D3] hover:text-white border-solid border-2 border-[#0972D3] h-10 w-10 rounded-full ml-4 my-2  flex justify-center items-center text-xl  font-bold" onClick={(e)=>{plusClick(page)}}>+</button>
                )}
              </div>
            ) : currentPageObj.isDisposePage || currentPageObjs.length == 1 ? (
              <></>
            ) : (
              <div>
                <button className="px-3 my-2 hover:bg-[#0972D3] text-[#0972D3] hover:text-white border-solid border-2 border-[#0972D3] font-bold rounded-xl" onClick={(e)=>{pageClick(page)}}>
                  Default
                </button>
                {(!findPages(page,pages)) && (
                  <button className="bg-[#36823A] h-10 w-10 rounded-full ml-4 my-2  flex justify-center items-center text-xl text-white font-bold" onClick={(e)=>{plusClick(page)}}>+</button>
                )}
              </div>
            )}
            <div>
              {
                (page.nextPage != "Condition")&&(
                  <PageTree2
                    pages={pages}
                    currentPage={page.nextPage}
                    depth={depth + 1}
                    pageClick={pageClick}
                    plusClick={plusClick}
                    editPage={editPage}
                  />
                )
              }
              
            </div>
          </div>
          )
        ))}
      </div>
    </div>
  );
};

const findPages = (page,pages)=>{
  const arr = pages.filter((e)=> e.pageName==page.nextPage)
  return arr.length
}

const handleEditPage = (page) => {
  if(page.pageName === "Select Repair Type"){
    window.location.href = "/select-repair-type";
  }else if(page.pageName === "Add Order"){
    window.location.href = "/add-order"; 
  }else if(page.pageName === "Image Selection"){
    window.location.href = "/image-selection"; 
  }else if(page.pageName === "Total Charges"){
    window.location.href = "/total-charges"; 
  }else if(page.pageName === "Technician Signature"){
    window.location.href = "/technician-signature"; 
  }else if(page.pageName === "Customer Signature"){
    window.location.href = "/customer-signature"; 
  }else if(page.pageName === "Customer review"){
    window.location.href = "/customer-review"; 
  }else if(page.pageName === "OTP Verification"){
    window.location.href = "/otp-verification"; 
  }

} 



const JobDone = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [configJson,setConfigJson] = useState(pageData.configJson);
  const [enableAdd,setEnableAdd] = useState(false);
  // const [configJson,setConfigJson] = useState([]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [currentPage, setCurrentPage] = useState({
    id:0,
    groupType: "JD",
    userType: "mobile",
    isStartPage: false,
    pageName: "",
    isDisposePage: false,
    nextPage: "",
    configJson: {},
    conditionJson: {
      key:"",
      value:""
    },
  });

  const handlePageClick = (page)=>{
    setCurrentPage(page)
  }

  const onSelectNextPage = (nextPage) => {
    // Check if selecting this next page will create a circular graph
    const hasCircularReference = willCreateCircularGraph([currentPage.pageName,nextPage]);
    if (hasCircularReference) {
      setCurrentPage({...currentPage,nextPage:""})
      alert("Selecting this next page will create a circular graph. Please choose another page.");
      return;
    }

    // Update the nextPage for the current page in the configJson
    // const updatedConfigJson = configJson.map((page) =>
    //   page.pageName === currentPage ? { ...page, nextPage } : page
    // );
    // setConfigJson(updatedConfigJson);
    setCurrentPage({...currentPage,nextPage:nextPage})

  };

  // Function to add a new entry to configJson
  const addEntry = () => {
    const page = configJson.find((page) => page.pageName === currentPage.pageName && page.nextPage === "Condition" )?.pageName || "";
    if(page && !currentPage.conditionJson.key && !currentPage.conditionJson.value){
      const jsons = configJson.filter((page) => page.pageName == currentPage.pageName && page.nextPage!="Condition")
      let hasEmptyCondition = false;
      // Check if any page within jsons has empty conditionJson.key or conditionJson.value
      for (const json of jsons) {
          if (!json.conditionJson.key || !json.conditionJson.value) {
              hasEmptyCondition = true;
              break;
          }
      }
      // Display alert if any page has empty conditionJson
      if (hasEmptyCondition) {
          alert("There can only be one default flow. Please add both key and value.");
          return
      }
    }
    const newEntry = { ...currentPage ,id:configJson.length+1}; // Assuming currentPage holds the data for the new entry
    console.log("CP",currentPage)
    setConfigJson([...configJson, newEntry]);
    console.log(configJson)
    setEnableAdd(false)
    resetEntity()
  };

  // Function to update an existing entry in configJson
  const updateEntry = () => {
    const updatedConfigJson = configJson.map((entry) => {
      if (entry.id === currentPage.id) {
        return { ...entry, ...currentPage }; // Update the existing entry with the data from currentPage
      }
      return entry;
    });
    setConfigJson(updatedConfigJson);
    resetEntity()
  };

  // Function to delete an entry from configJson
  const deleteEntry = () => {
    if(currentPage.nextPage != "Condition"){
      if(findPages(currentPage,configJson)){
        alert("Please Remove Pages From Bottom");
        return
      }
    }else{
      const arr = configJson.filter((e)=> e.pageName === currentPage.pageName && e.nextPage != "Condition")
      if(arr.length){
        alert("Please Remove Pages From Bottom");
        return
      }
    }
    const updatedConfigJson = configJson.filter((entry) => entry.id !== currentPage.id);
    console.log("delete",updatedConfigJson)
    console.log("id",currentPage)
    setConfigJson(updatedConfigJson);
    resetEntity();
  };

  const resetEntity = () => {
    setCurrentPage({
      id:0,
      groupType: "JD",
      userType: "mobile",
      isStartPage: false,
      pageName: "",
      isDisposePage: false,
      nextPage: "",
      configJson: {},
      conditionJson: {
        key:"",
        value:""
      },
    });
    setEnableAdd(false);
  }

  const handleOnPlusClick = (page) => {
    resetEntity()
    console.log("plus",page);
    if(page.nextPage === "Condition"){
      setCurrentPage({...currentPage,pageName:page.pageName})
    }else{
      setCurrentPage({...currentPage,pageName:page.nextPage})

    }
    setEnableAdd(true);
  }

  const graph = configJson.map((page) => [page.pageName, page.nextPage]);


  const willCreateCircularGraph = (newNode) => {
    // Add the new node temporarily
    graph.push(newNode);
  
    // Perform a DFS from the new node
    const visited = new Set();
    const dfs = (node) => {
      if (visited.has(node)) return false;
      visited.add(node);
      const neighbors = graph.filter((edge) => edge[0] === node).map((edge) => edge[1]);
      for (const neighbor of neighbors) {
        if (!dfs(neighbor)) return false;
      }
      visited.delete(node);
      return true;
    };
  
    // Check if DFS from the new node encounters any visited node
    const hasCycle = !dfs(startPage);
  
    // Remove the new node
    graph.pop();
  
    return hasCycle;
  };

  const startPage =
    configJson.find((page) => page.isStartPage)?.pageName || "";
    
  // if(!startPage){
  //   setEnableAdd(true);
  // }

    
  return (
    <div className="h-screen flex">
      <Sidenav from="job-done" />
      <div className="w-[90%] flex flex-col h-screen">
        <div className="border-b-1 border border-solid px-5 py-5">
          <h1 className="text-3xl font-sans text-[#111C43] font-bold">
            Job Done
          </h1>
        </div>
        <div className="flex flex-1 overflow-y-auto w-full">
          <div className="w-[85%] overflow-auto h-full bg-[#F1F1F1] border-r-2 flex justify-center px-20 py-20 border-gray-300">
            <div>
              <PageTree2
                pages={configJson}
                currentPage={startPage}
                depth={0}
                pageClick={handlePageClick}
                plusClick={handleOnPlusClick}
                editPage={handleEditPage}
              />
            </div>
          </div>
          <div className="w-[25%]  py-5">
            <h1 className="text-lg px-5 text-[#1F73B7] font-sans font-bold mb-5">
              Edit page flow
            </h1>
            <div className="w-full my-4 px-5">
              <h1 className="font-light my-2 text-xl  text-gray-600">
                Group Type
              </h1>
              <input
                className=" w-full text-sm px-3 py-2 bg-gray-200 rounded-xl text-gray-600  "
                value="Job Done"
              />
            </div>
            <div className="w-full my-4 px-5 ">
              <h1 className="font-light my-2 text-xl  text-gray-600">
                Select Page Name
              </h1>
              <select className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                value={currentPage.pageName}
                onChange={(e)=>{setCurrentPage({...currentPage,pageName:e.target.value})}}
              >
                <option value="">Select</option>
                <option value = "Select Repair Type"> Select Repair Type</option>
                <option value= "Add Order">Add Order</option>
                <option value= "Customer Signature">Customer Signature</option>
                <option value= "Image Selection">Image Selection</option>
                <option value= "OTP Verification">OTP Verification</option>
                <option value= "Customer review">Customer review</option>
                <option value= "Technician Signature">Technician Signature</option>
                <option value= "Technician Signature Type B">Technician Signature Type B</option>
                <option value= "Total Charges">Total Charges</option>

              </select>
            </div>

            <div className="w-full my-4 px-5">
              <h1 className="font-light my-2 text-xl  text-gray-600">
                Select Next Page{" "}
              </h1>
              <select className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl "
                value={currentPage.nextPage}
                onChange={(e)=>{onSelectNextPage(e.target.value)}}
              >
                <option value="">Select</option>
                <option value = "Select Repair Type"> Select Repair Type</option>
                <option value= "Add Order">Add Order</option>
                <option value= "Customer Signature">Customer Signature</option>
                <option value= "Image Selection">Image Selection</option>
                <option value= "OTP Verification">OTP Verification</option>
                <option value= "Customer review">Customer review</option>
                <option value= "Technician Signature">Technician Signature</option>
                <option value= "Technician Signature Type B">Technician Signature Type B</option>
                <option value= "Total Charges">Total Charges</option>
                <option value= "Dispose">Dispose</option>
                <option value= "Condition">Condition</option>
              </select>
            </div>

            <div className="flex flex-wrap mt-3 pb-5 px-4 border-dashed border-gray-500 border-b-2">
              <div className="flex mx-2 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        isChecked ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        isChecked ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className="ml-3">Enable Page</h1>
              </div>
              <div className="flex mx-2 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentPage.isStartPage}
                      onChange={(e)=>{
                        setCurrentPage({ ...currentPage, isStartPage: e.target.checked })
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        currentPage.isStartPage ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        currentPage.isStartPage ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className=" ml-3">Is Start Page</h1>
              </div>
              <div className="flex mx-2 my-2">
                <label className="flex cursor-pointer select-none items-center ">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentPage.isDisposePage}
                      onChange={(e)=>{
                        setCurrentPage({ ...currentPage, isDisposePage: e.target.checked })
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        currentPage.isDisposePage ? "bg-[#1F73B7]" : " bg-slate-600"
                      } `}
                    ></div>
                    <div
                      className={`dot absolute left-1 ${
                        currentPage.isDisposePage ? "translate-x-full" : "1"
                      } top-1 h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                  </div>
                </label>
                <h1 className=" ml-3">Is Dispose Page</h1>
              </div>
            </div>
            <h1 className="text-lg px-5 text-[#1F73B7] font-sans font-bold mt-4 mb-5">
              Set page condition
            </h1>

            <div className="border-b pb-4  border-black">
              <div className="w-full my-3 px-5">
                <h1 className="font-light my-2 text-xl  text-gray-600">Key</h1>
                {/* <select className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl ">
                  <option value="">Select</option>
                </select> */}
                <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl " placeholder="Enter Key" value={(currentPage.conditionJson.key)?currentPage.conditionJson.key:""} 
                onChange={(e)=>{setCurrentPage({...currentPage,conditionJson:{...currentPage.conditionJson,key:e.target.value}})}} />
              </div>
              <div className="w-full my-3 px-5">
                <h1 className="font-light my-2 text-xl  text-gray-600">
                  Value
                </h1>
                <input className="bg-white w-full text-sm px-3 py-2 border-gray-300  border-2 rounded-xl " placeholder="Enter Value" value={(currentPage.conditionJson.value)?currentPage.conditionJson.value:""}
                  onChange={(e)=>{setCurrentPage({...currentPage,conditionJson:{...currentPage.conditionJson,value:e.target.value}})}}
                />
              </div>
            </div>
            <div className="px-2 flex flex-wrap justify-between py-5">
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={updateEntry}>
                Update
              </button>
              <button className="border-[#1F73B7] border-solid border  rounded-lg px-5 py-2 text-[#1F73B7] hover:text-white hover:font-bold hover:bg-[#1F73B7] text-base" onClick={resetEntity}>
                Reset
              </button>
              <button className="border-[#D32F2F] border-solid border  rounded-lg px-5 py-2 text-[#D32F2F] hover:text-white hover:font-bold hover:bg-[#D32F2F] text-base" onClick={deleteEntry}>
                Remove Page
              </button>
            </div>
            <div className="w-full px-2">
              {(enableAdd || !startPage)&&(<button className="bg-[#082F49] rounded-lg w-full py-2  text-white font-bold text-base hover:bg-[#1F73B7]" onClick={addEntry}>
                Add New page
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDone;
