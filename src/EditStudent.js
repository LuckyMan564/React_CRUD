import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent(){
    const {studentid}=useParams();
    const [studentData,setStudentData]=useState({
        id:'',
        name:'',
        birth:'', 
        place:'', 
        phone:''
    });
    const [validation,setValidation]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/api/student/get_info'+studentid)
        .then(res => {
            setStudentData({
                id:res.data.id,
                name:res.data.name,
                birth:res.data.birth,
                place:res.data.place,
                phone:res.data.phone
            })
        })
        .catch(err => {

        })
    },[]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(studentData);
        axios.post('http://localhost:5000/api/student/update'+studentid, studentData)
        .then(res => {
            alert("Student Data Updated successfully");
            navigate("/");
        })
        .catch(err => {

        })
    }
    return(
        <div className="container">
        <h2>Edit Student Details</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id"  required value={studentData.id} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
             {studentData.id.length===0 && validation && <span className="errorMsg">Please Enter your id</span>}

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"  required value={studentData.name} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {studentData.name.length===0 && validation && <span className="errorMsg">Please Enter your name</span>}

            <label htmlFor="birth">Birth:</label>
            <input type="text" id="birth" name="birth"  required value={studentData.birth} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {studentData.birth.length===0 && validation && <span className="errorMsg">Please Enter your birth</span>}

            <label htmlFor="place">Place:</label>
            <input type="text" id="place" name="place" required  value={studentData.place} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {studentData.place.length===0 && validation && <span className="errorMsg">Please Enter your place</span>}

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone"  required value={studentData.phone} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {studentData.phone.length===0 && validation && <span className="errorMsg">Please Enter your mobile number</span>}
            <div>
            <button className="btn btn-save">Update</button>
            <Link to="/" className="btn btn-back">Back</Link>
            </div>
        </form>
       </div>
    )
}