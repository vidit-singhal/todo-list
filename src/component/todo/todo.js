import React, { useEffect, useState } from 'react'
import "./style.css"


// get the local storage data 

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if(lists){
        return JSON.parse(lists)
    }else {
        return[]
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, satIsEditItem] = useState("")
    const [toggleButton , setToggleButton] = useState(false)

    // add the item function 
    const addItem = () => {
        if(!inputData){
            alert('plzz fill the data')
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=> {
                    if (curElem.id === isEditItem){
                        return {...curElem, name:inputData}
                    }
                    return curElem
                })
            )
            setInputData([])
            satIsEditItem(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([ ...items , myNewInputData ] )
            setInputData("")
        }
    }

    // edit the items 
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })
        setInputData(item_todo_edited.name)
        satIsEditItem(index)
        setToggleButton(true)
    }


    // delete items 

    const deleteItem =(index) =>{
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems)
    }

    // remove all the items 

    const removeAll = () => {
        setItems([])
    }



    // adding local storage 

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    },[items])

  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todo logo" />
                <figcaption>Add Your List Here ✌️!!</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍️ Add Item' className='form-control' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                {!toggleButton ? <i class="fa fa-plus add-btn" onClick={addItem}></i> : <i class="far fa-edit add-btn" onClick={addItem}></i> }
                
            </div>
            <div>
                {/* item show  */}

                <div className="showItems">
                    {items.map((curElem,index) => {
                        return(
                            <div className="eachItem" key={index}>
                        <h3>{curElem.name}</h3>
                        <div className="todo-btn"></div>
                        <i class="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                        <i class="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>

                    </div>
                        )
                    })}
                    
                </div>

                {/* delete all item button  */}

                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo