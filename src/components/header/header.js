import React from "react"
import { Logo } from "./logo"
import styles from "./header.module.css"
import { Menu } from "./menu"

export const Header = () => {
  return (
    <div className={styles.header}>
      <Logo></Logo>
      <Menu />
    </div>
  )
}
