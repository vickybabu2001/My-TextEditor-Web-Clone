 import { message } from 'antd';
import React, { useEffect, useState } from 'react';
 import uuid from 'react-uuid';
 import Notes from './Notes';
 import "./index.css";

 const getlocal=()=>{
  const lt=localStorage.getItem('list');
  if(lt){
    return JSON.parse(localStorage.getItem('list'));
  }
  else{
    return [];
  }
}

 const App = () => {


  const[btnt,toggle]=useState(false);
     const[item,setItem]=useState("");
  const[additem,addSetItem]=useState(getlocal());
  const[itemId,setItemId]=useState();
  const handleChange=(e)=>{
    setItem(e.target.value);
  }
  const addItem=()=>{
    if(btnt===true){
      const newList=additem.map((todo)=>{
        if(todo.id === itemId){
          return {...todo,itemName:item}
        }
        return todo;
      })
      addSetItem(newList);
      setItem("");
      setItemId();
      toggle(false);
      message.success("Item Updated Successfully");
    }
    else{
    const itemobj={id:uuid(),itemName:item}
    addSetItem((previtem)=>[...previtem,itemobj]);
    setItem("");
    message.success("Item Added Successfully");
    }
  }
 const deleteNote=(id)=>{
  const filters=additem.filter((value)=>{
    return value.id !==id;
  })
  addSetItem(filters);
  message.success("Item Deleted Successfully");
 }
 const DeleteAllItem=()=>{
  addSetItem([]);
  message.success("All Items Deleted Successfully");
 }
 const updateNote=(id)=>{
  
  const filter=additem.find((todo)=>{
    return todo.id===id;
  })
   //console.log("filter",filter);
   setItem(filter.itemName);
   toggle(true);
   setItemId(id); 
 }
  
 useEffect(()=>{
  localStorage.setItem('list',
 JSON.stringify(additem))
 },[additem]);
 
  return (
     <div className='container'>
          
          <div className='note'>
          <input placeholder='write here'style={{textAlign:"center",marginTop:"30px",height:"20px"}}  
          onChange={handleChange}  value={item}
          ></input>
          <button  style={{marginLeft:"10px"}}
          onClick={addItem} disabled={item.length<=2?true:false}>{btnt ?"Update":"AddItem"}</button>
          <button style={{marginLeft:"10px"}} onClick={DeleteAllItem}>DeleteAll</button>
           </div>
           <div className='textprop'>
          <Notes additem={additem} deleteNote={deleteNote} updateNote={updateNote}></Notes>
         </div>
         </div>
  );
 }
 
 export default App;
 