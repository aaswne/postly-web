import "./HamBurg.css";
import Link from "next/link";

function HamBurg() {
  return (
    <div className="hamburg">
      <ul className="hamburg-menu">
        <li><Link href="/SignUp">Sign Up</Link></li>
        <li><Link href="/Login">Sign In</Link></li>
        <li><Link href="/Progress">Documentation</Link></li>
        <li><Link href="/Progress">Contact</Link></li>
      </ul>
    </div>
  );
}

export default HamBurg;