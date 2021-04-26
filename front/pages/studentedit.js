import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/student.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/movies";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState({});
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rate, setRate] = useState("");
  const [min, setMin] = useState(0);
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMovies();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getmovie = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('movie id: ', result.data)
    setMovie(result.data)
}
 
  const getMovies = async () => {
    let result = await axios.get(URL);
    setMovies(result.data.list);
  };

  const addMovie = async () => {
    let result = await axios.post(URL, {
      name,
      genre,
      rate,
      min,
      date,
      detail
    });
    console.log(result);
    getMovies();
  };

  const deleteMovie = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getMovies();
  };

  const updateMovie = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      genre,
      rate,
      min,
      date,
      detail
    });
    console.log(result);
    getMovies();
  };

  const showMovies = () => {
    if (movies && movies.length) {
      return movies.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>Name:</b> {item.name} <br />
            <b>Genre:</b> {item.genre} <br />
            <b>Rate:</b> {item.rate} <br />
            <b>Min:</b> {item.min} hr<br />
            <b>Date:</b> {item.date}
            <b>Detail:</b> {item.detail}
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getmovie(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateMovie(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteMovie(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <h1><ins>Movie Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Movies</h2>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        Genre:
        <input
          type="text"
          name="genre"
          onChange={(e) => setGenre(e.target.value)}
        ></input>
        Rate:
        <input
          type="text"
          name="rate"
          onChange={(e) => setRate(e.target.value)}
        ></input>
        min:
        <input
          type="number"
          name="min"
          onChange={(e) => setMin(e.target.value)}
        ></input>
        Date:
        <input
          type="text"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        Detail:
        <input
          type="text"
          name="detail"
          onChange={(e) => setDetail(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addMovie(name, genre, rate, min, date, detail)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showMovies()}</div>
      <div className={styles.list1}><b><i><ins>(selected movie)</ins></i></b> <b>  Name:</b>{movie.name}<b>  Genre:</b>{movie.genre} <b>  Rate:</b>{movie.rate}  <b>Min:</b>{movie.min}<b>  Date:</b>{movie.date}<b>  Detail:</b>{movie.detail}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
