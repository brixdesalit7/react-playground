import React, { useState } from 'react'

const Object = () => {
    const initialRecords = [
        { id: 1, name: "Bryxx", age: 22 },
        { id: 2, name: "Andder", age: 25 },
        { id: 3, name: "Tate", age: 15 },
    ]

    const [data, setData] = useState(initialRecords);
    const [message, setMessage] = useState("");
    const [disable, setDisable] = useState(false)

    const [input, setInput] = useState({
        id : data.length + 1,
        name : "",
        age : ""
    })

    // input name
    function handleName(e) {
        const checkName = data.find(v => v.name === e.target.value);
    
        if(checkName) {
            setMessage("Name is not available!");
            setDisable(true);
        } else {
            setInput({
                ...input,
                name : e.target.value
            });
            setMessage(""); 
            setDisable(false);
        }
    }

    // input age
    function handleAge (e) {
        setInput({
            ...input,
            age : e.target.value
        })
    }

    // add record
    function handleAddRecord(e) {
        e.preventDefault();

        if(input.name.length === 0 && input.age.length === 0) {
            setMessage("Please fill the form!");
            return
        }
        
        const newRecord = {
            id: data.length + 1,
            name: input.name,
            age: input.age
        }

        setData([
            ...data,
            newRecord
        ]);
    }

    function handleDelete(postID) {
        setData(data.filter(v => v.id !== postID))
    }
    return (
        <>
            <h2>Object</h2>

            <form onSubmit={handleAddRecord}>
                <input type="text" placeholder="Name" onChange={handleName}/> <br />
                <input type="text" placeholder="Age" onChange={handleAge}/> <br />
                <button type="submit" disabled={disable}>Submit</button>
            </form>
            {message && <h3 style={{color : "red"}}>{message}</h3>}
            <ul>
                {data.map((value, index) => {
                    return (
                        <li key={value.id}>
                            Name : {value.name} <br />
                            Age : {value.age} <br />
                            <button onClick={() => handleDelete(value.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Object