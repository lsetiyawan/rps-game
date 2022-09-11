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
            <div
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "lightyellow",
                color: "black",
                margin: "10px",
                padding: "10px",
              }}
            >
              <Link key={game.id} href={`/game/${game.id}`}>
                {game.room}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default Dashboard;
