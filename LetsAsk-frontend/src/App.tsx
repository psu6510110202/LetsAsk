import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Loginpage from "./pages/Loginpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Articlepage from "./pages/Articlepage";
import { ScrollToTop } from "./Helper";


function App() {

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path='/article/:id' element={<Articlepage/>}/>
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
