import { useState } from "react"
import {Link ,useNavigate} from "react-router-dom";
import {ArrowLeftIcon} from "lucide-react";
import toast from "react-hot-toast"
import api from "../lib/axios.js"
const CreatePage = () =>
{
  const[title,settitle]=useState("");
  const[content,setcontent]=useState("");
  const[loading,setloading]=useState(false);
  const navigate=useNavigate() // to navigat eto any pagr we want
   const handleSubmit= async (e)=>
   {
    e.preventDefault();
      if(!title.trim() || !content.trim())
      { 
        toast.error("all fields are required");
        return ;
      }
      setloading(true);
      try {
        await api.post("/notes",
          {
            title,
            content
          }
        )
        toast.success("note cretaed successfully!!");
        navigate("/");
      } 
      catch (error) 
      {
        console.log("error creating notes",error)
        toast.error("failed to create notes");
      }
      finally
      {
        setloading(false);
      }

   }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
       <div className="max-w-2xl mx-auto">
        <Link to={"/"}className="btn btn-ghost mb-6">
        <ArrowLeftIcon className="size-5"/>
        Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered"
                value={title}
                onChange={(e)=> settitle(e.target.value)}>
                </input>
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                className="textarea textarea-bordered h-32"
                type="text" placeholder="write your note here..."
                value={content}
                onChange={(e)=> setcontent(e.target.value)}>
                </textarea>
                 <div className="card-actions justify-end py-4">
                   <button  type="submit"className="btn btn-primary"disabled={loading}> 
                   {loading?"creating..." : "create note"}
                </button>
                 </div>
              </div>
            </form>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default CreatePage