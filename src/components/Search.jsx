import { useState } from "react";

import { BsSearch } from "react-icons/bs";

import "./Search.css"

const Search = ({ loadUser }) => {
  const [userName, setUserName] = useState();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loadUser(userName);
    }
  };

  return (
    <div className="search">
      <h2>Busque por usuário</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
