import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <h1 className="typography-main-title">To Do List</h1>
    </header>
  );
}

export default Header;
