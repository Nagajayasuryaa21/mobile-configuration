const data = {
  configJson: [
    {
      id:1,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Select Repair Type",
      isDisposePage: false,
      nextPage: "Add Order",
      configJson: {},
      conditionJson:{
        key: "Repair Type",
        value: "Part Replacement"
      }
      
    },
    {
      id:2,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Select Repair Type",
      isDisposePage: false,
      nextPage: "Image Selection",
      configJson: {},
      conditionJson:{}
    },
    {
      id:3,
      groupType: "JD",
      userType:"mobile",
      isStartPage: true,
      pageName: "Select Repair Type",
      isDisposePage: false,
      nextPage: "Condition",
      configJson: {
        head: [
          {
            id: 1,
            title: "Product Id",
            type: "button-text",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 2,
            title: "Serial Number",
            type: "text",
            isEditable: true,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 3,
            title: "Date of Purchase",
            type: "calendar",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
        ],
        body: [
          {
            id: 1,
            title: "Under Warenty",
            type: "check-box",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 2,
            title: "Defect Code",
            type: "dropdown",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 3,
            title: "Repair Type",
            type: "dropdown",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 4,
            title: "Remarks",
            type: "text",
            isEditable: false,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
        ],
      },
      conditionJson:{}
    },
    {
      id:4,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Add Order",
      isDisposePage: false,
      nextPage: "Image Selection",
      configJson: {
        isStockEnable:false,
        isPriceEnable:true,
        isQuantityEnable:false
      },
      conditionJson:{}
    },
    {
      id:5,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Image Selection",
      isDisposePage: false,
      nextPage: "Total Charges",
      configJson: {
        images:[
          {
            id:1,
            title:"Invoice Image",
            name:"Invoice_Image.png"
          }
        ]
      },
      conditionJson:{}
    },
    {
      id:6,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Total Charges",
      isDisposePage: false,
      nextPage: "Technician Signature",
      configJson: {
        isFOCEnable:true,
        body:[
          {
            id: 2,
            title: "Serial Number",
            type: "text",
            isEditable: true,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 1,
            title: "KM travelled",
            type: "dropdown-sm",
            isEditable: true,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 3,
            title: "Apply Toggle",
            type: "toggle",
            isEditable: true,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          },
          {
            id: 3,
            title: "Selection Dropdown",
            type: "dropdown-lg",
            isEditable: true,
            isInputEnable: true,
            isOutPutEnable: true,
            input: {
              objId: 2406,
              fieldId: 14578,
            },
            output: {
              objId: 2406,
              fieldId: 14578,
            },
          }
        ]
      },
      conditionJson:{}
    },
    {
      id:7,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Technician Signature",
      isDisposePage: false,
      nextPage: "Customer Signature",
      configJson: {},
      conditionJson:{}
    },
    {
      id:8,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Customer Signature",
      isDisposePage: false,
      nextPage: "OTP Verification",
      configJson: {},
      conditionJson:{}
    },
    {
      id:9,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "OTP Verification",
      isDisposePage: false,
      nextPage: "Customer review",
      configJson: {},
      conditionJson:{}
    },
    {
      id:10,
      groupType: "JD",
      userType:"mobile",
      isStartPage: false,
      pageName: "Customer review",
      isDisposePage: true,
      nextPage: "Dispose",
      configJson: {
        body:[{
          id: 3,
          name:"",
          title: "Repair Type",
          type: "dropdown",
          isEditable: false,
          isInputEnable: true,
          isOutPutEnable: true,
          input: {
            objId: 2406,
            fieldId: 14578,
          },
          output: {
            objId: 2406,
            fieldId: 14578,
          },
        },
        {
          id: 1,
          name:"Invoice_Image.png",
          title: "Select Invoice",
          type: "image",
          isEditable: false,
          isInputEnable: true,
          isOutPutEnable: true,
          input: {
            objId: 2406,
            fieldId: 14578,
          },
          output: {
            objId: 2406,
            fieldId: 14578,
          },
        },
        {
          id: 4,
          name:"",
          title: "Remarks",
          type: "text",
          isEditable: false,
          isInputEnable: true,
          isOutPutEnable: true,
          input: {
            objId: 2406,
            fieldId: 14578,
          },
          output: {
            objId: 2406,
            fieldId: 14578,
          },
        }
      ]
      },
      conditionJson:{}
    }
  ],
};

const sample2 =[{
  id: 3,
  title: "Repair Type",
  type: "dropdown",
  isEditable: false,
  isInputEnable: true,
  isOutPutEnable: true,
  input: {
    objId: 2406,
    fieldId: 14578,
  },
  output: {
    objId: 2406,
    fieldId: 14578,
  },
},
{
  id: 4,
  title: "Remarks",
  type: "text",
  isEditable: false,
  isInputEnable: true,
  isOutPutEnable: true,
  input: {
    objId: 2406,
    fieldId: 14578,
  },
  output: {
    objId: 2406,
    fieldId: 14578,
  },
}]

const sample = {
  head: [
    {
      id: 1,
      title: "Product Id",
      type: "button-text",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
    {
      id: 2,
      title: "Serial Number",
      type: "text",
      isEditable: true,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
    {
      id: 3,
      title: "Date of Purchase",
      type: "calendar",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
  ],
  body: [
    {
      id: 1,
      title: "Under Warenty",
      type: "check-box",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
    {
      id: 2,
      title: "Defect Code",
      type: "dropdown",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
    {
      id: 3,
      title: "Repair Type",
      type: "dropdown",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
    {
      id: 4,
      title: "Remarks",
      type: "text",
      isEditable: false,
      isInputEnable: true,
      isOutPutEnable: true,
      input: {
        objId: 2406,
        fieldId: 14578,
      },
      output: {
        objId: 2406,
        fieldId: 14578,
      },
    },
  ],
}

export default data;
