import { useState } from "react";
import "./App.css";
import axios from "axios";
//const express = require("cors");

function App() {
  const [file, setFile] = useState();
  const [message, setMessage] = useState("");

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/upload", formData)
      .then((result) => {
        setMessage("file uploaded successfully");
        setFile(null);
      })
      .catch((err) => {
        setMessage("error uploading file");
        console.log(err);
      });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button type="button" onClick={upload}>
        Upload
      </button>
      {message && <p> {message} </p>}
    </div>
  );
}

export default App;
