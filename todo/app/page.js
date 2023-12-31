"use client"
import React ,{useState} from 'react'



const page = () => {

    const[tasks,setTasks]=useState([]);

    const[newTask,setNewTask]=useState("");

    const[loggedin,setLoggedin]=useState(false);

    const addtask = () =>
    {
        
      if(newTask.trim()!=="") 
      {
        setTasks([...tasks,{ id: Date.now(), text: newTask }])
        setNewTask('');
      }

    }

    const editTask = (taskId,newText) =>
    {
     const updatedTasks= tasks.map(task =>
       task.id ===taskId ? {...task,text: newText} :task);

        setTasks(updatedTasks);
    }

    const deleteTask = (taskId)=>   
    {
      const updatedTasks=tasks.filter((task)=>task.id!==taskId)
        setTasks(updatedTasks)
    }

    const toggleLogin= () =>
    {
      setLoggedin(!loggedin);
    }
  return (

    <>

<div 
            style={{ 
                fontFamily: 'Arial, sans-serif', 
                maxWidth: '600px', 
                margin: '0 auto', 
                padding: '20px', 
            }} 
        > 

<div style={{
    display: 'flex',
    justifyContent: 'flex-end',  // Use flex-end to align to the right
    alignItems: 'center',        // Optional, use if you want to align vertically
    }}>
    <button style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: 'green',
    }} onClick={toggleLogin} >
      {loggedin?'Logout':'Login'   }
    </button>
</div>

{loggedin ? 
(
            <><div
              style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: 'green',
              }}
            >
              CYSERCH
            </div><div
              style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
                TODO LIST
              </div><div style={{
                display: 'flex', alignitem: 'center'
              }}>

                <input style={{
                  fontSize: '1.2rem',
                  padding: '10px',
                  marginRight: '10px',
                  flexGrow: '1',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                  placeholder="Add item..."

                  type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />

                <button
                  style={{
                    fontSize: '1.2rem',
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={addtask}
                >
                  ADD Task
                </button>
              </div><div
                style={{
                  background: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '8px'
                }}
              >
                {tasks.length > 0 ? (
                  tasks.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <span style={{
                        fontSize: '1.2rem',
                        flexGrow: '1'
                      }}>
                        {item.text}
                      </span>
                      <span>
                        <button
                          style={{
                            padding: '10px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            marginRight: '10px',
                            cursor: 'pointer',
                          }}
                          onClick={() => deleteTask(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          style={{
                            padding: '10px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                          onClick={() => editTask(item.id, prompt('Edit task:', item.text))}
                        >
                          Edit
                        </button>
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      color: '#777'
                    }}
                  >
                    No items in the list
                  </div>
                )}
              </div></> 
) :( 
<div
  style={{
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
    color: 'blue',
  }}
>
  Please login to access the Todo List
</div> )
}

        </div>
    

    


    

    </>

  )
}

export default page