import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import api from "../lib/axios"
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'  //link frmo here not from lucide react
const NoteCard = ({note,setnotes}) => { 
//took the prop note //this is for each notes that we have 
  
   const handleDelete= async(e,id)=>
   {
       e.preventDefault(); //to get rid of the navigation behavior

       if(!window.confirm("are you sure you want to delete this note?"))return ;

       try {
        await api.delete(`/notes/${id}`); 
        setnotes((prev)=> prev.filter(note=> note._id !==id)) //get rid of the deleted one 
        toast.success("Note deleted Successfully");
       } catch (error) {
         console.log("error in delete",error)
         toast.error("error in deleting the note!")
       }
   }
  return (
    <Link to={`/note/${note._id}`}
     className='card bg-base-100 hover:shadow-lg transition-all duration-200
     border-t-4 border-solid border-l-purple-200'
    >
     <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>{new Date(note.createdAt).toLocaleDateString()}</span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
                    <Trash2Icon className='size-4'></Trash2Icon>
                </button>
            </div>
        </div>
    </div>  
   </Link>
  )
}

export default NoteCard