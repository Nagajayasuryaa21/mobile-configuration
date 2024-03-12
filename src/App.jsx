import { BrowserRouter, Route, Routes } from "react-router-dom";
import {AddOrder, ComingSoon, CustomerReview, CustomerSignature, Home, ImageSelection, JobDone, OTPVerification, SelectRepairType, TechnicianSignature, TotalCharges} from "./components";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/mobile-config" element={<JobDone/>}/>
        <Route path="/job-done" element={<JobDone/>}/>
        <Route path="/select-repair-type" element={<SelectRepairType/>}/>
        <Route path="/add-order" element={<AddOrder/>}/>
        <Route path="/image-selection" element={<ImageSelection/>}/>
        <Route path="/total-charges" element={<TotalCharges/>}/>
        <Route path="/technician-signature" element={<TechnicianSignature/>}/>
        <Route path="/customer-signature" element={<CustomerSignature/>}/>
        <Route path="/customer-review" element={<CustomerReview/>}/>
        <Route path="/otp-verification" element={<OTPVerification/>}/>
        <Route path="/coming-soon" element={<ComingSoon/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
