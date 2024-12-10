import styles from "./Button.module.css";

export enum VARIANT {
  OUTLINE = "outline",
  FIL = "fill",
}

type props = {
  variant: VARIANT;
};
function Buttion({ variant }: props) {
  return <button className={styles}></button>;
}

export default Buttion;
