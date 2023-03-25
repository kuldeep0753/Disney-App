
import React, { useState, useEffect } from "react"; 
import "App.css";

function App() {
  const [characters, setCharacters] = useState([]); 

  useEffect(() => { 
    fetch("https://api.disneyapi.dev/characters")
      .then((response) => (response.json()))
      .then((res)=>{
        setCharacters(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 


  return (
    <div className="App">
      <h1>Disney Characters</h1>
      <div className="controls">
        <input type="text" placeholder="Search"  />
        <select >
          <option value="name">Sort By name</option>
          <option value="id">Sort By Id</option>
        </select>
      </div>
      {
        characters.map((item)=>
          <div style={{marginBottom:"50px"}}>
          <img src={item.imageUrl}/>
          <p>Name: {item.name}</p>
          <p>Films: </p>
          <div>
            {item.films.length>0? item["films"].map((film)=>
            <li>{film}</li>
            ) : null}
          </div>
          </div>
        )
      }
    </div>
  );
}
export default App;
