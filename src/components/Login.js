import React ,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/URL';
import 'react-toastify/dist/ReactToastify.css';
//npm install --save react-toastify
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import '../style/login.css'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let id;
  let pswd;
  const navigate = useNavigate();

  useEffect(()=>{
    sessionStorage.clear()
  },[])
  const ProceedLogin = (e) => {
    e.preventDefault();
    //call vaildate function
    if (validate()) {
      //console.log('procces')
      axios.get(`https://65138daa8e505cebc2e9f26a.mockapi.io/user`)
      // .then((res) => {
      //   console.log(res.data)
      //   return res.json();
      // })
      .then((resp) => {
        let res=resp.data
        console.log(res)
        res.map((items)=>{
          if (username === items.username)
          {
            id=items.username
            pswd=items.password
          }
        })
        console.log(id)
          if (username === id){
            if (password === pswd)
            {
              sessionStorage.setItem('username', username);
              toast.success("Success", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigate('/home')
              // alert('hi');
            }
            else{
              toast.error('Enter the password is incorrect', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
              })
            }
           
          }
          else {
            toast.error('username invaild')
          }
          
         
      
      }).catch((err) => {
        toast.error('login failed due to ' + err)
      });
    }
  }

  //validation
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning(" please enter the username")
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning(" please enter the password")
    }
    return result;
  }
  return (
    <div className="conatiner logincontainer p-1">

    
    <div className="row-xl-10 ">
      <div className="offset-lg-4  col-lg-4 mt-5">
        <form action="" className='container form' onSubmit={ProceedLogin}>
          <div className="card p-5">
              <h2 className='text-center '>User Login</h2>
            

            <div className="card-body">
              <div className="form-group mt-2">
                <label htmlFor="">User name</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                 name="" id=""  className='form-control'/>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                 name="" id="" className='form-control'/>
              </div>

              
            </div>
            <div className="align-items-center">
              <button type="submit" className='btn btn-primary me-3'>Login</button>
              <Link to={'/register'} className="btn btn-success">New user</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login