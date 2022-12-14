import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const router = useRouter();
  const [cookies] = useCookies(["accessToken"]);
  const [loaded, setLoaded] = useState(false);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push("/login");
    }
    _getAllGames();
  }, []);

  const _getAllGames = () => {
    axios
      .get("https://rps-game-be.herokuapp.com/game", {
        headers: { Authorization: "Bearer " + cookies.accessToken },
      })
      .then((res) => {
        setGameList(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return loaded ? (
    <div>
      <div>
        <button>
          <Link href="/game/create">Create Game Room</Link>
        </button>
      </div>
      <div style={{ display: "flex" }}>
        {gameList.map((game) => {
          return (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  backgroundColor: "lightyellow",
                  color: "black",
                  margin: "10px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    textAlign: "center",
                  }}
                >
                  {game.room}
                </div>
                <div>
                  {game.end
                    ? game.theWinner?.name
                      ? `The winner is ${game.theWinner?.name}`
                      : `It's a draw!`
                    : "The fight is ongoing"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default Dashboard;
