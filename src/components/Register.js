import React, { useState } from 'react'
import { API_URL } from '../constants/URL';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../style/register.css'
import { ToastContainer, toast } from 'react-toastify';
//npm install react-hook-form yup
//npm i @hookform/resolvers
const schema = yup.object().shape({
  username:yup.string().required('username is manadatory'),
  email:yup.string().email('Invalid email address ').required('email address is manadatory'),
  password: yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmpassword: yup.string().oneOf([yup.ref("password"), null]).required('Confirm Password is required')
})
const Register = () => {

  // const [userName, setuserName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmpassword, setConfirmpassword] = useState('');
  
  const navigate = useNavigate();
  // const postData = async()=>{
  //   axios.post(API_URL, {userName,email,password,confirmpassword})
  //   alert(userName)
  //   console.log(userName);
  //   navigate('/login')
  // }
  const onSubmit =  async(data) =>{
    try{
      await axios.post(API_URL, data);
      // alert(userName)
      //console.log(userName);
      toast.success("Successfully created account", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/')
    }
    catch(error)
    {
      alert("ERROR : "+error)
    }

  }
 
  
  const {register, handleSubmit,watch,formState : {errors, isValid, isDirty }} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  }
  )
  // console.log(errors)
  // console.log(isValid);
  return (
    <div className='registercontainer p-1'>
      <div className="offset-lg-3 col-lg-5 mt-5 ">

      <form className=" container" onSubmit={handleSubmit(onSubmit)}>
          {/*  <form className=" container" onSubmit={handleSubmit((data) =>{
        console.log(data)
      })}> */}
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12 ">
                  <h1 className='text-center'>Create a account</h1>

                  <div class="form-group">
                    <label for="username">Username</label>
                    <input {...register('username')} 
                    //value={userName} onChange={event => setuserName(event.target.value)}
                    class="form-control" id="uername" />
                    <p >{errors.username?.message}</p>
                  </div>

                <div class="form-group">
                  <label for="email">Email address:</label>
                    <input {...register('email')} 
                    //value={email} onChange={event => setEmail(event.target.value)}
                   class="form-control" id="email" />
                    <p>{errors.email?.message}</p>
                </div>

                <div class="form-group">
                  <label for="pwd">Password:</label>
                    <input type="password" {...register('password')}
                   //value={password} onChange={event => setPassword(event.target.value)}
                  autoComplete="on" class="form-control" id="pwd" />
                    <p>{errors.password?.message}</p>
                </div>

                  <div class="form-group">
                    <label for="confirmpassword">confirm password</label>
                    <input type="password" {...register('confirmpassword')}
                    // value={confirmpassword} onChange={event => setConfirmpassword(event.target.value)}
                      autoComplete="on" class="form-control" id="confirmpassword" />
                    <p>{errors.confirmpassword?.message}</p>
                  </div>
                  <button className='btn btn-primary'>submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Register