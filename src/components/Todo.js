import React,{useState, useEffect} from 'react'

function Todo() {
    const [task, setTask] = useState('');

    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("localTasks")){
            const storedList = JSON.parse(localStorage.getItem("localTasks"));
            setTasks(storedList);
        }
    },[])

    const handleClear = () => {
        setTasks([]);
        localStorage.removeItem('localTasks');
    }
    const handleDelete = (task)=>{
        const deleted = tasks.filter((t)=>t.id !== task.id);
        setTasks(deleted);
        localStorage.setItem('localTasks', JSON.stringify(deleted))
    }
    const addTask = (e) => {
        if (task) {
          const newTask = { id: new Date().getTime().toString(), title: task };
          setTasks([...tasks, newTask]);
          localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
          setTask("");
        }
      };
  return (
    <div className='container row'>
        <h1 className='mt-3'>Todo App</h1>
        <div className='col-8'>
            <input
            name='task' 
            placeholder='Add your new todo'
            type='text'
            value={task}
            className='form-control'
            onChange={(e)=> setTask(e.target.value)}
            />
        </div>
        <div className='col-4'>
            <button className='btn btn-primary form-control material-icons'
            style={{width:'50px', backgroundColor: '#8b4ce5', border:'none'}}
            onClick={addTask}
            >add</button>
        </div>
        
        {tasks.map((task) => (
        <React.Fragment key={task.id}>
            <div className="col-11" style={{}}>
                <span className = "form-control bg-white btn mt-2"
                style={{textAlign: "left", fontWeight: "bold",backgroundColor: "#f3f1f4"}}>
                    {task.title}
                </span>
            </div>

            <div className="col-1" >
                <button
                className =" mt-2 btn btn-danger material-icons"
                onClick ={()=> handleDelete(task)}
                style={{backgroundColor: '#e84b46'}}
                >delete</button>
            </div>
        </React.Fragment>
      ))}
      <div className="badge text-black" style={{fontSize:'20px', fontWeight: 'normal'}}>
      You have
        {!tasks.length
          ? " no pending tasks "
          : tasks.length === 1
          ? " 1 pending task "
          : tasks.length > 1
          ? ` ${tasks.length} pending tasks `
          : null}
        {!tasks.length ? null:(
          
              <button className= "btn btn-secondary  mt-4 mb-4" 
              style={{backgroundColor: '#8b4ce5',border:'none'}}
              onClick={()=>handleClear()}>
                  Clear All
              </button>
          
      )}
        </div>
    </div>
  )
}

export default Todo