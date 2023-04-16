/*Navyasree Putluri */
/*import './App.css';*/
import React, { useState } from 'react';
import axios from "axios"

const headerStyles = {
  header: {
    backgroundColor: '#eee',
    padding: '1rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    marginRight: '1rem',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
  },
  hover: {
    backgroundColor: '#333',
    color: '#fff',
  },
};

const jokesStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '4px',
    margin: '1rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  data: {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '1rem',
    margin: '1rem 0',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  h1: {
    fontSize: '2rem',
    margin: '1rem',
  },
};


const Header = () => {
  return (
    <header style={headerStyles.header}>
      <nav style={headerStyles.nav}>
        <ul style={headerStyles.list}>
          <li><a href="#" style={{ ...headerStyles.link, ...headerStyles.hover }}>Home</a></li>
          <li style={headerStyles.item}><a href="#" style={headerStyles.link}>Logout</a></li>
        </ul>
      </nav>
    </header>
  );
}

const Joke = () => {
  const [joke, setJokes] = useState([]);

  const apiLink = "https://icanhazdadjoke.com/";

  const fetchData = async () => {
    const res = await axios.get(`${apiLink}`, { headers: { Accept: "application/json" } });
    console.log(res.data.joke);
    setJokes([res.data.joke]);
  }
  return (
    <div >
      <Header />
      <div style={jokesStyles.container}>

        <h1 style={jokesStyles.h1}>Dad's Jokes</h1>
        <button style={jokesStyles.button} onClick={fetchData}>Load jokes</button>
        {joke && joke.map((j, index) => (
          <div style={jokesStyles.data} key={index}>
            {j}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Joke;