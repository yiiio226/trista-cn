import React from "react"
import { Link } from "gatsby"
import styles from "./menu.module.css"

export const Menu = () => {
  return (
    <nav className={styles.menuNav}>
      <div className={styles.container}>
        <li>
          <Link to="/page-2/">关于我</Link>
        </li>
        <li>
          <Link to="/page-2/">我的工作</Link>
        </li>
        <li>
          <Link to="/page-2/">联系我</Link>
        </li>
      </div>
    </nav>
  )
}
