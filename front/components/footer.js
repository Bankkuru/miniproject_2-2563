import Link from 'next/link'
import styles from "../styles/footer.module.css";

const footer = () =>{

    return(
       
   <div className={styles.footer}>
       <a className = {styles.text_left}>
    Copyright &copy;2021     นายวิทวัส เซี่ยวภู่</a>
   </div >
      
    )
}
export default footer