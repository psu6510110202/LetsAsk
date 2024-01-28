import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
