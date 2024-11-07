import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { deleteTodo, readTodos, updateTodo } from "./api";
import { createTodo } from "./functions";


function App() {
  const [todo, setTodo] = useState({title:'', content:''})
  const [todos, setTodos] = useState(null)
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    let currentTodo = currentId!=0 ? todos.find(todo => todo._id===currentId) : {title:'',content:''};
    setTodo(currentTodo);
  }, [currentId]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      console.log(result)
      setTodos(result.data)
    };
    fetchData();
  }, [currentId]);

  

  const clear = ()=>{
    setCurrentId(0);
    setTodo({title:'', content: ''});
  };

  useEffect(() => {
    const clearField = (e) => {
      if(e.keyCode === 27) {
        clear();
      }
    }
    window.addEventListener('keydown ', clearField);
    return () => window.removeEventListener('keydown ', clearField)
  }, []);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    if(currentId === 0){
      const result = await createTodo(todo);
      console.log(result);
      setTodos([...todos, result]);
      clear();
    } else {
      const result = await updateTodo(currentId, todo);
      clear();
    }
   
  };

  const removeTodo = async(id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter(todo=>todo._id!==id);
    setTodos(todosCopy);
  }

  return (
    <div className="container">
      <div className="row">
        <pre>
          {JSON.stringify(todo)}
        </pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">mode_edit</i>
              <input id="icon_prefix2" 
                value={todo.title}
                onChange={e=>setTodo({...todo, title:e.target.value})} className="materialize-textarea" />
              <label htmlFor="icon_prefix2">Title</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" className="materialize-textarea" 
                value={todo.content}
                onChange={e=>setTodo({...todo, content:e.target.value})}
                 />
              <label htmlFor="description">content</label>
            </div>

          </div>

        <div className="row right-align">
          <button className="btn waves-effect waves-light">
            Submit
          </button>
        </div>

        </form>
         {
          !todos?<Preloader></Preloader> 
            : todos.length > 0 ?
              <ul className="collection">
                {
                  todos.map(todo =>
                    <li key={todo._id} onClick={()=>setCurrentId(todo._id)} className="collection-item">
                      <div><h5>{todo.title}</h5>
                        <p>{todo.content}
                          <a href="#!" className="secondary-content" onClick={() => removeTodo(todo._id)}><i className="material-icons">delete</i></a>
                        </p>
                        </div>
                    </li>
                  )
                }
              </ul> 
            :
              <div>no todos</div>
         }
        

      </div>
    </div>
  );
}

export default App;
