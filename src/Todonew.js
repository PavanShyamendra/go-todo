import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import Card from "./components/Card";

import {  Header, Form, Input, Icon } from "semantic-ui-react";

const Todo = () => {
  

  const [todos, setTodos] = useState([]);

  const [todoName, setTodoName] = useState({});

  

  const [formValue,setFormValue] = useState({});


  

  const onSubmit = (event) => {
    //setFormValue({name:todoName})
    setFormValue({name:todoName})
    console.log(todoName,formValue);
    axios.post("http://localhost:8080/jobs", formValue).then((res) => {
      console.log(res,"in the post")
    }); 
  };

  useEffect(() => {
    setFormValue({name:todoName});
  }, [todoName]);

useEffect(() => {
  async function fetchTodos() {
    const result = await axios('http://localhost:8080/jobs')
    //console.log(result.data,"Result of fetch")
    setTodos(result.data)
  }
  fetchTodos()
})

  const deleteIt = (event) =>{
        console.log("Delete Function")
        console.log(event.target.value)
        axios.delete("http://localhost:8080/jobs/"+event.target.value,).then((res)=>{
        console.log(res)
    });
  };

  

  

  
  const getTask = () => {
    console.log("Get Task Function is started 2");
    axios.get("http://localhost:8080/jobs").then((res) => {
      setTodos(res.data);
      console.log(res,"get task")
    });
  };

  const onChange = (event) => {
    setTodoName(event.target.value)
  };

 

  return (
    <div>
      <div>
        <div></div>
        <div>
          <div className="row">
            <Header className="header" as="h1">
              TO DO LIST
              
            </Header>
          </div>

          <div className="row">
            <Form onSubmit={onSubmit}>
              <Input
                type="text"
                name="name"
                onChange={onChange}

                fluid
                placeholder="Create Task"
              />
               <input type="submit" value="Submit" class="btn btn-primary btn-lg m-2" />
            </Form>
          </div>
          <div >
            {
                todos.length >0 &&
                todos.map((todo,index)=>{
                return(
                      <div class="card border border-5 m-2">
                        <div class= "card-header text-center">
                            {todo.name}
                        </div>
                        <div class = "card-body text-center">

                        <button type="button" class="btn btn-primary"  value = {todo.id} onClick={deleteIt}>Delete</button>

                        <button key = {todo.id} type="button" class="btn btn-primary m-2"  value = {todo.id} onClick={(event)=>{
                          const fame = prompt("Update Todo");
                          axios.put("http://localhost:8080/jobs/"+ todo.id, {
                            name : fame
                          }).then((res) => {
                            console.log(res,"in the Put")
                          });
                        }}>Update</button>

                        </div>
                      </div>
                )
            })
            }
        </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
