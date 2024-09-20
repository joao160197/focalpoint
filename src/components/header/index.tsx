import styles from "./styles.module.scss";
import Image from "next/image";
import LogoIMG from "../../../public/assets/logo.png";

export function Header() {
    return (
      <div>
        <header className={styles.header}>
          <Image className={styles.logo} alt="logo" src={LogoIMG} />
          <h1 className={styles.welcome}>Bem-vindo de volta, Marcus</h1> 
          <h2 className={styles.date}>Segunda, 01 de dezembro de 2025</h2> 
        </header>
        <div className={styles.borderLine}></div>
      </div>
    );
}
