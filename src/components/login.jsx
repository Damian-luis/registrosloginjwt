import React from "react";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Login(){

    const nav = useNavigate();
//Login con logica Simple

const [user,setUser]=useState({name:"",password:"",})
const [useractive,setUseractive]=useState()

//Handler de estado
function nameHandler(e){
    setUser({...user,name:e.target.value})
    }
function passwordHandler(e){
    setUser({...user,password:e.target.value})
    }

//Handler de envio
async function handlerSend(e){
    e.preventDefault()
    console.log(user.name,user.password)
    
    try{
        await axios.get(`http://localhost:3001/user/${user.name}/${user.password}`).then(e=>{setUseractive(e.data)})
    }
    catch(e){console.log(e)}
    }




//PETICIONES CON JWT



const [token,setToken]=useState("")
const [estado,setEstado] =useState({
    user:"",
    password:"",
    })
//Handler de envio
async function mandar(e){
    e.preventDefault()
    await axios.post(`http://localhost:3001/login/${estado.user}/${estado.password}`,estado).then(e=>{if (e){nav("/home")}})
    setEstado({ user:"",
    password:""})
    }
//Handler de estado
function usuar(e){
    const value=e.target.value;
    setEstado({...estado,user:value})
    }
function pass(e){
    const pass=e.target.value;
    setEstado({...estado,password:pass})
    }









//Registro
const [register,setRegister]=useState({
    user:"",
    password:"",
    name:"",
    lastname:"",
    age:"",
    gender:""
})
async function handlerRegister(e){
    e.preventDefault()
    await axios.post("http://localhost:3001/add",register).then(e=>{console.log(e)})
    setRegister({
        user:"",
    password:"",
    name:"",
    lastname:"",
    age:"",
    gender:""
    })
}
function regUser(e){
    setRegister({...register,user:e.target.value})
}
function regPassword(e){
    setRegister({...register,password:e.target.value})
}
function regName(e){
    setRegister({...register,name:e.target.value})
}
function regLastname(e){
    setRegister({...register,lastname:e.target.value})
}
function regGender(e){
    setRegister({...register,gender:e.target.value})
}
function regAge(e){
    setRegister({...register,age:e.target.value})
}







//Aqui Estados y metodo de Compras

const [compra,setCompra]=useState({
    product:"",
    price:"",
    description:""
})
async function handlerCompra(e){
    e.preventDefault();
    const config={headers:{Authorization: `Bearer ${token}`}}
    await axios.post("http://localhost:3001/login/verify",compra,config)
    setCompra({
        product:"",
    price:"",
    description:""
    })
}
function productCompra(e){
    setCompra({...compra,product:e.target.value})
}
function priceCompra(e){
    setCompra({...compra,price:e.target.value})
}
function descriptionCompra(e){
    setCompra({...compra,description:e.target.value})
}
return <div>
    <form onSubmit={handlerSend}>
        <input type="text" placeholder="ingrese usuario" onChange={nameHandler}/>
        <input type="text" placeholder="ingrese contraseña" onChange={passwordHandler}/>
        <button type="submit" >Iniciar sesion</button>
     </form>

     {useractive==null? <h4>Por favor inicie sesion</h4>:<h2>Bienvenido {useractive[0].user}</h2>}
     <hr/>








     <h1>Login con JWT</h1>
     <form onSubmit={mandar}>
        <input type="text" placeholder="ingrese usuario" onChange={usuar} value={estado.user}/>
        <input type="text" placeholder="ingrese contraseña" onChange={pass}  value={estado.password}/>
        <button type="submit" >Iniciar sesion</button>
     </form>

     {useractive==null? <h4>Por favor inicie sesion</h4>:<h2>Bienvenido {useractive[0].user}</h2>}



     <hr/>
     <hr/>
     <h1>Registro de Usuario</h1>


     <form onSubmit={handlerRegister}>
        <input type="text" placeholder="ingrese usuario" onChange={regUser} value={register.user}/>
        <input type="text" placeholder="ingrese contraseña" onChange={regPassword}  value={register.password}/>
        <input type="text" placeholder="ingrese su nombre" onChange={regName}  value={register.name}/>
        <input type="text" placeholder="ingrese su apellido" onChange={regLastname}  value={register.lastname}/>
        <input type="text" placeholder="ingrese su edad" onChange={regAge}  value={register.age}/>
        <input type="text" placeholder="ingrese su genero" onChange={regGender}  value={register.gender}/>
        <button type="submit" >Registrarse</button>
     </form>


     <hr/>
     <h1>Hacer post mandando y autorizando con el token</h1>
     
        <form onSubmit={handlerCompra}>
            <input type="text" placeholder="ingrese nombre producto" onChange={productCompra} value={compra.product}></input>
            <input type="text" placeholder="ingrese precio del producto" onChange={priceCompra} value={compra.price}></input>
            <input type="text" placeholder="ingrese descripcion producto" onChange={descriptionCompra} value={compra.description}></input>
            <button type="submit">Registrar compra</button>
        </form>
</div>
}