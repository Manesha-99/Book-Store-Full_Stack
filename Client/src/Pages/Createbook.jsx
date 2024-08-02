import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Createbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:3001/books", data)
      .then((response) => {
        setLoading(false);
        alert("Book has been added to database....")
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
      <h1 className="my-4 text-3xl">Create Book</h1>
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
        <button className="p-2 rounded-lg jusp-2 bg-sky-300" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Createbook;
