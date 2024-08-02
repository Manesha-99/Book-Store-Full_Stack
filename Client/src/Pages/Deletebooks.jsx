import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Deletebooks = () => {
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = ()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:3001/books/${id}`)
    .then((response)=>{
      setLoading(false);
      alert("Book has been deleted....");
      navigate("/");
    })
    .catch((error)=>{
      setLoading(false);
      alert("Something went wrong..Check the console log..");
      console.log(error);
    })
  }
  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="my-4 text-3xl">Delete Book</h1>
      {loading ? <Spinner/> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure want to delete this book?</h3>
        <button className="w-[200px] p-4 m-8 text-white bg-red-600 rounded-xl" onClick={handleDeleteBook}>
          Delete It..
        </button>
      </div>

    </div>
  )
}

export default Deletebooks