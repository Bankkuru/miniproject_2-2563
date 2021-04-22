import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/student.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/students";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [major, setMajor] = useState("");
  const [min, setMin] = useState(0);
  const [movie, setStudent] = useState({});
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
    setStudent(result.data)
}
 
  const getMovies = async () => {
    let result = await axios.get(URL);
    setMovies(result.data.list);
  };

  const addStudent = async () => {
    let result = await axios.post(URL, {
      name,
      surname,
      major,
      min,
    });
    console.log(result);
    getMovies();
  };

  const deleteStudent = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getMovies();
  };

  const updateStudent = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      surname,
      major,
      min,
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
            <b>Surname:</b> {item.surname} <br />
            <b>Major:</b> {item.major} <br />
            <b>min:</b> {item.min}
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getmovie(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateStudent(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteStudent(item.id)}
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
      <h1><ins>Student Data Edit </ins></h1>
      <div className={styles.form_add}>
        <h2>Add Movies</h2>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        Surname:
        <input
          type="text"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        ></input>
        Major:
        <input
          type="text"
          name="major"
          onChange={(e) => setMajor(e.target.value)}
        ></input>
        min:
        <input
          type="number"
          name="min"
          onChange={(e) => setMin(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addStudent(name, surname, major, min)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showMovies()}</div>
      <div className={styles.list1}><b><i><ins>(selected movie)</ins></i></b> <b>  Name:</b>{movie.name}<b>  Surname:</b>{movie.surname} <b>  Major:</b>{movie.major}  <b>min:</b>{student.min}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
