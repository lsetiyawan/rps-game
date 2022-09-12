import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [cookies, setCookies] = useCookies(["accessToken", "userId", "email"]);
  const router = useRouter();
  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://rps-game-be.herokuapp.com/login", loginForm)
      .then((res) => {
        console.log(res);
        const { accessToken, id, email } = res.data;

        setCookies("accessToken", accessToken, { maxAge: 60000 });
        setCookies("userId", id, { maxAge: 60000 });
        setCookies("email", email, { maxAge: 60000 });
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed, pelase try again");
      });
  };

  return (
    <div>
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>email</label>
            <input name="email" onChange={handleChange} />
          </div>
          <div>
            <label>password</label>
            <input name="password" type="password" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
