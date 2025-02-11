import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";

import Loader from "../components/Loader";

import Repo from "../components/Repo";

import "./Repos.css"

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://api.github.com/users/${username}/repos`
        );

        const data = await res.json();

        setIsLoading(false);

        let orderedRepos = data.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );

        orderedRepos = orderedRepos.slice(0, 5);

        setRepos(orderedRepos);
      } catch (error) {
        console.log(error);
      }
    };

    if (username) {
      loadRepos(username);
    }
  }, []);

  if (!repos && isLoading) return <Loader />;
  return (
    <div className="repos">
      <BackBtn />
      <h2>Explore os repositórios do usuário {username}</h2>
      {repos && repos.length === 0 && <p>Não há repositórios</p>}
      {repos && repos.length > 0 && (
        <div className="repos-container">
          {repos.map((repo) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;
