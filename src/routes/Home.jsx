import { useState } from "react";

import Search from "../components/Search";

import Error from "../components/Error";

import Loader from "../components/Loader";

import User from "../components/User";

const Home = () => {
  const [user, setUser] = useState(null);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loadUser = async (userName) => {
    try {
      setIsLoading(true);

      setError(false);

      setUser(null);

      const res = await fetch(`https://api.github.com/users/${userName}`);

      const data = await res.json();

      setIsLoading(false);

      if (res.status === 404) {
        setError(true);
        return;
      }

      const { avatar_url, login, location, followers, following } = data;

      const userData = {
        avatar_url,
        login,
        location,
        followers,
        following,
      };

      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Search loadUser={loadUser} />
      {isLoading && <Loader />}
      {error && <Error />}
      {user && <User {...user} />}
    </div>
  );
};

export default Home;
