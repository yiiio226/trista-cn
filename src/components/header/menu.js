import React from "react"
import { Link } from "gatsby"
import styles from "./menu.module.css"

export const Menu = ({ menuLinks }) => {
  return (
    <nav className={styles.menuNav}>
      <ul className={styles.container}>
        {menuLinks.map(link => (
          <li
            key={link.name}
            style={{
              listStyleType: `none`,
              padding: `1rem`,
            }}
          >
            <Link to={link.link} activeClassName={styles.active}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
