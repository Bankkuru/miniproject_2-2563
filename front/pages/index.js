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
        <h1 className={styles.head}> Comming Soon...</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/giWIr7U1deA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Shang-Chi and the Legend of the Ten Rings</iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/E9DOgOGmlPg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/W7utAmfuHyg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/81_xdPvQGGg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br/>
        <h2 className={styles.de}>รีวิวหนังดัง บรรดาหนังที่มีความน่าดู หลากหลายเรื่อง หลากหลายสไตล์ มีลักษณะไหนไปดูกัน</h2>
        <br/>
        <br/>
        <p className={styles.de}>รีวิวหนังดัง สำหรับพวกคอหนัง ที่ชื่นชอบในการรับชม หนังที่หลากหลายสไตล์ แบบเรียกว่า</p>
        <p className={styles.de}> คอหนังตัวยง ที่ดูกันได้หลายแนว ไม่ว่าจะเป็น รีวิวหนังดราม่า ,หนังแอคชั่น ,หนังคอมเมดี้</p>
        <p className={styles.de}>หรือหนังผี ก็เข้ามาดู การรีวิวหนังต่างๆ กันได้เลยครับ การดูรีวิวนั้น มีข้อดีอย่างไรบ้าง</p>
        <p className={styles.de}>คืออย่างแรกเลยนั้น ดูรีวิวหนัง จะทำให้เรานั้น ได้รู้ถึงข้อมูลของหนัง ลักษณะแนวหนัง </p>
        <p className={styles.de}>และเรื่องย่อกันก่อนครับ</p>
        <br/>
      </div>
      <Footer />
    </div>
    </Layout>
  );
};
export default index;
