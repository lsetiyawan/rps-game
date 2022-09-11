import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const GameId = () => {
  const router = useRouter();
  const [gameDetail, setGameDetail] = useState(null);
  const [choice, setChoice] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      router.push("/dashboard");
    }
    _fetchGameDetail();
  }, []);

  const _fetchGameDetail = () => {
    axios
      .get(`https://rps-game-be.herokuapp.com/game/${id}`, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      })
      .then((res) => {
        setGameDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://rps-game-be.herokuapp.com/game/fight/${gameDetail.id}/${choice}`,
        {},
        { headers: { Authorization: "Bearer " + cookies.accessToken } }
      )
      .then((res) => {
        alert("Response submitted!");
        router.push("/dashboard");
      })
      .catch((err) => alert(err.response.data.message));
  };

  return gameDetail ? (
    <div>
      <div>{gameDetail.room}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="choice" onChange={(e) => setChoice(e.target.value)} />{" "}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default GameId;
