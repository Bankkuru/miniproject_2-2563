import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";




const index = () => {

  return (
    <Layout>
       <Head>
        <title>Home Page</title>
    </Head>
    <div className={styles.container}><div className = {styles.Navbar}><Navbar /></div>
      <div className={styles.title}>
      <ins>Welcome to Movies Zone</ins></div>
      <div>
        <h1 >Comming Soon</h1>
      </div>
      <Footer />
    </div>
    </Layout>
  );
};
export default index;
