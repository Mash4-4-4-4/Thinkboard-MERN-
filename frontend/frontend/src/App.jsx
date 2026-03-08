import { Route, Routes } from "react-router-dom";import "./index.css"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div data-theme="forest"> {/* daisy ui theme */}
    {/*//add this then only toaster notifications would work */}
    <Toaster position="top-center"/>
     <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/create" element={<CreatePage/>}/>
    <Route path="/note/:id" element={<NoteDetailPage/>}/>{/*//these are the routes that we are sing in our app/api*/}
    </Routes>
    </div>
  )
}

export default App