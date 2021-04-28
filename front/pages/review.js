import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/footer";
// import 'bootstrap/dist/css/bootstrap.css'

const URL = "http://localhost/api/movies";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const review = () =>{
    const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
    if (error) return <div>failed to load</div>;
    if (!data) return <div>Loading...</div>;
    console.log("data", data);
    
    const selStu = async (id) => {
      let result = await axios.post(`${URL_SEL}/${id}`)
      mutate(URL, data);
    }
  
    const showMovies = () => {
      if (data.list && data.list.length) {
        return data.list.map((item, index) => {
          return (
            <Col className="col-lg-12 col-12">
            <div className={styles.listItem} key={index}>
              <div><b>Name:</b> {item.name}</div>
              <div><b>Genre:</b> {item.genre}</div>
              <div> <b>Rate:</b> {item.rate} </div>
              <div><b>Min:</b> {item.min} hr</div>
              <div><b>Date:</b> {item.date} </div>
              <div><b>detail:</b> {item.detail} </div>
              <div>
              <button
                className={styles.btn}
                onClick={() => selStu(item.id)}
              >
                Select
              </button></div>
            </div>
            </Col>
          );
        });
      } else {
        return <p>Loading...</p>;
      }
    };
    return(<div>
       <Layout>
       <Head>
        <title>Home Page</title>
    </Head>
    <div className={styles.container}><div className = {styles.Navbar}><Navbar /></div>
      <div className={styles.list}>
       <Row>{showMovies()}</Row> 
      </div>
      
    </div>
    <Footer />
    </Layout>
</div>
);


};
    export default review;

