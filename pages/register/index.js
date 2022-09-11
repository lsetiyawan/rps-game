import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://rps-game-be.herokuapp.com/register", formData)
      .then((res) => {
        alert("Registration success!");
        router.push("/login");
      })
      .catch((err) => alert("Registration failed, pelase try again"));
  };

  return (
    <div>
      <div>Registration</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" onChange={handleChangeInput} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" onChange={handleChangeInput} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" onChange={handleChangeInput} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
