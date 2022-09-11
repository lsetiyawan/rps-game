import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const CreateGame = () => {
  const [dataForm, setDataForm] = useState({ room: "" });
  const [cookies] = useCookies(["accessToken"]);
  const router = useRouter();
  const handleOnchange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://rps-game-be.herokuapp.com/game", dataForm, {
        headers: { Authorization: "Bearer " + cookies.accessToken },
      })
      .then((res) => {
        alert("Create room success!");
        router.push("/game/" + res.data.id);
      })
      .catch((err) => {
        alert("Create room failed!");
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Room Name</label>
        <input name="room" onChange={handleOnchange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateGame;
