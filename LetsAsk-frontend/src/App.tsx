import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import Signuppage from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Articlepage from "./pages/Articlepage";
import { ScrollToTop } from "./Helper";
import { Toaster } from "react-hot-toast";
// import { Sign } from "crypto";



function App() {

  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/article/:id' element={<Articlepage/>}/>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/profile/:id" element={<Profilepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
