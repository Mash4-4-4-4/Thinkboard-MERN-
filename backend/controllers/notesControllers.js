import Note from "../models/Note.js";

export async function getAllNotes(req,res)
{
try {
    const notes=await Note.find().sort({createdAt:-1}) //latest note first (-1 fpr latest)
    res.json(notes);
} catch (error) 
{
    console.error("error in getallnotes",error);
    res.json({message:"internal server error"});
}
};

export async function getNoteById(req,res)
{
try {
    const note=await Note.findById(req.params.id)
    if(!note)return res.json({message:"note not found"});
    res.json(note);
} catch (error) 
{
    console.error("error in getallnotes",error);
    res.json({message:"internal server error"});
}
};

export async function createNote(req,res)
{
   try {
      const {title,content}=req.body //instead of req.body.title
      const newNote=new Note({title:title,content:content});
    await newNote.save();
      res.json("note created successfully");
     } 
catch (error) {
     console.error("error in createnotes",error);
    res.json({message:"internal server error"});
   }
};

export async function updateNote(req,res)
{try {
     const{title,content}=req.body;
     const updatednote=await Note.findByIdAndUpdate(req.params.id,{title,content});
     if(!updatednote)return res.json({message:"not found note"});

     res.json("updated succeshully");
} catch (error) {
    console.error("error in updatenotes",error);
    res.json({message:"internal server "});
}
};


export async function deleteNote(req,res)
{
    try {
       const deletedNote =await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote)return res.json({message:"note not found"})
            res.json("note delted successfully");
    } catch (error) {
        console.error("error in deletenotes",error);
    res.json({message:"internal server "});
    }
};



//mongodb+srv://maniska5740_db_user:Cj61uRAgreZt1Vkg@cluster0.nwi5b60.mongodb.net/?appName=Cluster0
//Cj61uRAgreZt1Vkg
//maniska5740_db_user