import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ViewDetails(){
    const {studentid}=useParams(); 
    const [studentData,setStudentData]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/api/student/get_info'+studentid)
        .then(res => {
            setStudentData(res.data);
        })
        .catch(err => {

        })
    },[]);
    return(
       <div className="container">
        <h1>Student Details</h1>
       { studentData && <div className="details">
            <p><strong>ID: </strong>{studentData.id}</p>
            <p><strong>Name: </strong>{studentData.name}</p>
            <p><strong>Birth: </strong>{studentData.birth}</p>
            <p><strong>Place: </strong>{studentData.place}</p>
            <p><strong>Phone: </strong>{studentData.phone}</p>
        </div>}
        <Link to="/" class="btn btn-back">Back</Link>
       </div>
    )
}