import React from 'react';

const Notes = (props) => {
    const {additem,deleteNote,updateNote}=props;
    
    return (
        <>
        {additem.length!==0?
          additem.map((val)=>{
               return(
                <div className='item'>
                   
                        <span>{val.itemName}</span>
                        <button style={{marginLeft:"10px"}} onClick={()=>deleteNote(val.id)}>Delete</button>
                        <button style={{marginLeft:"10px"}} onClick={()=>updateNote(val.id)}>UpdateItem</button>
                </div>
               )
          }):"Please Create Your First Notes"}  
        </>
    );
}

export default Notes;
