import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
const HomePage = () => {

  const[isRateLimited,setisRateLimited]=useState(false);
  const[notes,setnotes]=useState([]);
  const [loading,setloading]=useState(false);
  
  useEffect(()=>{
  //function to fetch notes
    const fetchNotes=async()=>
    {
      try 
      {
        const res=await api.get("/notes")//using the apu we build
        setnotes(res.data);
        console.log(res.data);
        setisRateLimited(false);
      }
      catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Full error:", error);
        console.log("error fetching notes",error);
        if(error.response?.status==429)
        {
          setisRateLimited(true);
        }
        else{
          toast.error("failed to load notes");
        }
      }
      finally{
        setloading(false);
      }
    };
    fetchNotes();
  },[]);
  return (
    <div className="min-h-screen"> {/*this will take th eentire screen*/}
      <Navbar/>
     {isRateLimited && <RateLimitedUI/>}

     <div className='max-w-7xl mx-auto p-4 mt-6'> 
      {loading &&
       <div className='text-center text-primary py-10'>Loading notes...</div>
        }
     {notes.length===0 && !isRateLimited && <NotesNotFound/>}
        {notes.length>0 && !isRateLimited &&
        (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note=>
              (
                <NoteCard key={note._id}  note={note} setnotes={setnotes}/>
              )
              )}
          </div>
        )
        }
     </div>
    </div>
  )
}

export default HomePage