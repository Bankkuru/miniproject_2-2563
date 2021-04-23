import Link from 'next/link'
import styles from "../styles/Index.module.css";

const Navbar = () => (
    <div className = {styles.Navbar}>
        <Link href="/"><a > <b>Home</b></a></Link> |
        <Link href="/review"><a > <b>Review</b></a></Link> |
        <Link href="/profile"><a> <b>Profile</b> </a></Link> | 
        <Link href="/foo"><a> <b>Foo </b></a></Link> |
        <Link href="/studentedit"><a> <b>Student Edit</b> </a></Link> |
        <Link href="/getConfig"><a><b> Config</b> </a></Link> | 
        <Link href="/login"><a> <b>Login</b> </a></Link> | 
        <Link href="/logout"><a> <b>Logout</b> </a></Link> 
        
    </div>
)

export default Navbar