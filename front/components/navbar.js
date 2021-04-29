import Link from 'next/link'
import styles from "../styles/Index.module.css";

const Navbar = () => (
    <div className = {styles.Navbar}>
        <Link href="/"><a > <b>Home</b></a></Link> |
        <Link href="/review"><a > <b>Review</b></a></Link> |
        <Link href="/moviesedit"><a> <b>Reviewer</b> </a></Link> |
        <Link href="/register"><a><b> Register</b> </a></Link> |
        <Link href="/login"><a> <b>Login</b> </a></Link> | 
        <Link href="/logout"><a> <b>Logout</b> </a></Link> 
        
    </div>
)

export default Navbar