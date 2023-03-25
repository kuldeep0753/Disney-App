import React, { useState, useEffect } from "react";
// import axios from "axios";
import "../styles/Disney.css";

const Disney = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setfilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetch("https://api.disneyapi.dev/characters")
      .then((response) => {
        setCharacters(response.data);
        setfilteredCharacters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = characters.filter((character) => {
      character.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setfilteredCharacters(filtered);
  }, [searchTerm, characters]);

  useEffect(() => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeComapre(b.name);
      } else {
        return a.id - b.id;
      }
    });
    setfilteredCharacters(sorted);
  }, [sortBy, filteredCharacters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <h1>Disney </h1>
      <div className="controls">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <select onChange={handleSort}>
          <option value="name">Sort By name</option>
          <option value="id">Sort By Id</option>
        </select>
      </div>
      <div className="character-grid">
        {filteredCharacters.map((character) => {
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <div className="character-details">
              <h2>{character.name}</h2>
              <p>{character.url}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Disney;
