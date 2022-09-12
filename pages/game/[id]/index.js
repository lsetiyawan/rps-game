import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const GameId = () => {
  const router = useRouter();
  const [gameDetail, setGameDetail] = useState(null);
  const [choice, setChoice] = useState("");
  const [firstPlayer, setFirstPlayer] = useState();
  const [secondPlayer, setSecondPlayer] = useState();
  const [cookies] = useCookies(["accessToken", "userId"]);
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
        const theGame = res.data;
        setGameDetail(theGame);
        setFirstPlayer(theGame.plays[0]);
        setSecondPlayer(theGame.plays[1]);
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
        _fetchGameDetail();
      })
      .catch((err) => alert(err.response.data.message));
  };

  return gameDetail ? (
    <center>
      <div>
        <h3>{gameDetail.room}</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="choice" onChange={(e) => setChoice(e.target.value)} />{" "}
          <button type="submit">Submit</button>
        </form>
      </div>
      {gameDetail.plays.length == 2 ? (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <div style={{ flex: 1 }}>
            <div>
              {firstPlayer.player_id == cookies.userId
                ? "Your choice"
                : "Player 1"}
            </div>
            <div>{firstPlayer.choice}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div>
              {secondPlayer.player_id == cookies.userId
                ? "Your choice"
                : "Player 2"}
            </div>
            <div>{secondPlayer.choice}</div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "20px" }}>Aawaiting submission</div>
      )}
    </center>
  ) : (
    <div>Loading</div>
  );
};

export default GameId;
