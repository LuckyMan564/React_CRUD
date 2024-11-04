import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateStudent(){
    const [formData, setFormData] = useState({
        id:'',
        name:'',
        birth:'', 
        place:'', 
        phone:''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [validation,setValidation]=useState(false);
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/student/create', formData);
            setSuccess('new student created successfully!');
            setFormData({ id:'', name: '', birth:'',place: '', phone: '' }); // Reset form
          } catch (err) {
            setError(err.response?.data?.message || 'Error creating user.');
          }

    }
    return(
       <div className="container">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id"  required value={formData.id} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {formData.id.length===0 && validation && <span className="errorMsg">Please Enter your id</span>}

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"  required value={formData.name} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {formData.name.length===0 && validation && <span className="errorMsg">Please Enter your name</span>}

            <label htmlFor="birth">Birth:</label>
            <input type="text" id="birth" name="birth"  required value={formData.birth} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {formData.birth.length===0 && validation && <span className="errorMsg">Please Enter your birthday</span>}

            <label htmlFor="place">Place:</label>
            <input type="text" id="place" name="place" required  value={formData.place} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {formData.place.length===0 && validation && <span className="errorMsg">Please Enter your place</span>}

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone"  required value={formData.phone} onChange={handleChange} onMouseDown={()=>setValidation(true)}/>
            {formData.phone.length===0 && validation && <span className="errorMsg">Please Enter your mobile number</span>}
            <div>
            <button className="btn btn-save">Save</button>
            <Link to="/" className="btn btn-back">Back</Link>
            </div>
        </form>
       </div>
    )
}