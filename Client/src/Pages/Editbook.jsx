import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Editbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong check the console..");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3001/books/${id}`, data)
      .then((response) => {
        setLoading(false);
        alert("Book has been updated....");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong.. Check the console..");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 rounded border-rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(event) => {
              setPublishYear(event.target.value);
            }}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button
          className="p-2 rounded-lg jusp-2 bg-sky-300"
          onClick={handleEditBook}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Editbook;
