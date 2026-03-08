import mongoose from "mongoose";
//here we are creating the schema how our one note wil looklike
const noteSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            require:true,
        },
        content:
        {
            type:String,
            require:true,
        }, 
    },
    {
        timestamps:true  //mogodb will defaultly add ceated at and updated at fields 
    }
);//this is the schema
//now we will screate actual model

const Note=mongoose.model("Note",noteSchema); //this will do the creation thing 
export default Note;