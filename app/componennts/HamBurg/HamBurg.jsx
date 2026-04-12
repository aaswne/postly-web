import "./HamBurg.css";
import Link from "next/link";

function HamBurg({ menuLinks, className = "" }) {
  return (
    <div className={`hamburg ${className}`}>
      <ul className="hamburg-menu">
        {menuLinks.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HamBurg;