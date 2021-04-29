import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/movies.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Container, Row, Col } from "react-bootstrap";
import config from '../config/config';

const API_URL = "http://localhost/api/movies";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState({});
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rate, setRate] = useState("");
  const [min, setMin] = useState(0);
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [imgurl, setImgurl] = useState( );
  const [movie, setMovie] = useState({});

  const handleChangeImage = e =>{
    const file = e.target.files[0];
    const imgurl = URL.createObjectURL(file);
    setImgurl(imgurl);
  }


  useEffect(() => {
    getMovies();
    setImgurl();
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
    const result = await axios.get(`${API_URL}/${id}`)
    console.log('movie id: ', result.data)
    setMovie(result.data)
}
 
  const getMovies = async () => {
    let result = await axios.get(API_URL);
    setMovies(result.data.list);
  };

  const addMovie = async () => {
    let result = await axios.post(API_URL, {
      name,
      genre,
      rate,
      min,
      date,
      detail,
      imgurl
    });
    console.log(result);
    getMovies();
  };

  const deleteMovie = async (id) => {
    let result = await axios.delete(`${API_URL}/${id}`);
    getMovies();
  };

  const updateMovie = async (id) => {
    let result = await axios.put(`${API_URL}/${id}`, {
      name,
      genre,
      rate,
      min,
      date,
      detail,
      imgurl
    });
    console.log(result);
    getMovies();
  };


  const showMovies = () => {
    if (movies && movies.length) {
      return movies.map((item, index) => {
        return (
          <Col className="col-lg-12 col-12">
          <div className={styles.listItem} key={index}>
          <div><img src={item.imgurl } style={{ width: "690px", height: "400px" }} /></div>
            <b>Name:</b> {item.name} <br />
            <b>Genre:</b> {item.genre} <br />
            <b>Rate:</b> {item.rate} <br />
            <b>Min:</b> {item.min} hr<br />
            <b>Date:</b> {item.date}
            <b>Detail:</b> <div className = {styles.textarea}>{item.detail}</div>
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
          </Col>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.hh}><ins>Movie Data Edit </ins></h1>
      <div className={styles.form_add}>
        <div className={styles.c} > 
        <h2 className={styles.hh}>Add Movies</h2>
        <div className={styles.hh} >Pic:</div>  
        <label >
          <img className='image' src={imgurl} />
          <input className='input-file' type='file' onChange={handleChangeImage} />
        </label>
      <div className={styles.hh} >Name:</div>  
        <input
          type="text"
          name="name"
          
          onChange={(e) => setName(e.target.value)}
        ></input >
       <div className={styles.hh}>Genre:</div> 
        <input
          type="text"
          name="genre"
          
          onChange={(e) => setGenre(e.target.value)}
        ></input>
       <div className={styles.hh}>Rate:</div> 
        <input
          type="text"
          name="rate"
          
          onChange={(e) => setRate(e.target.value)}
        ></input>
       <div className={styles.hh}>min:</div>
        <input
          type="number"
          name="min"
         
          onChange={(e) => setMin(e.target.value)}
        ></input>
        <div className={styles.hh}>Date:</div>
        <input
          type="text"
          name="date"
          
          onChange={(e) => setDate(e.target.value)}
        ></input>
      <div className={styles.hh}>Detail:</div>  
        <textarea
          type="text"
          name="detail"
          rows="10" cols="60"
          onChange={(e) => setDetail(e.target.value)}
        ></textarea><br/>
        <button
          className={styles.button_add}
          onClick={() => addMovie(imgurl,name, genre, rate, min, date, detail)}
        >
          Add
        </button>
      </div>
      <div className={styles.list1}><Row><b><i><ins>(selected movie)</ins></i></b> <b>  Name:</b>{movie.name}<b>  Genre:</b>{movie.genre} <b>  Rate:</b>{movie.rate}  <b>Min:</b>{movie.min}<b>  Date:</b>{movie.date}<b>  Detail:</b>{movie.detail}</Row></div>
      <div className={styles.list}><Row>{showMovies()}</Row></div>
     
    </div> <Footer /></div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
