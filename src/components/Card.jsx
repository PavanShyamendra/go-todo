import { buildQueries } from '@testing-library/react'
import { React, useState } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';





const Card = (props) => {
  return (
    <div class="card border border-5 m-2">
        <div class= "card-header text-center">
            {props.title}
        </div>
        <div class = "card-body">
        <button type="button" class="btn btn-secondary"  value = {props.value} onClick={deleteIt}>Delete</button>
        </div>
    </div>
  )
}

const deleteIt = (event) =>{
    console.log("Delete Function")
    //console.log(event.target.value)
    axios.delete("http://localhost:8080/jobs/"+event.target.value,).then((res)=>{
      console.log(res)
    });
  };



  

const heading = {
    color : 'red'
}

export default Card