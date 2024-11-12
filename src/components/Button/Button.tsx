import styles from "./Button.module.css";
import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { IconProps } from "iconsax-react";

export enum VARIANT {
  OUTLINE = "outline",
  FILL = "fill",
}

export enum RADIUS {
  Regular = "regular",
  Round = "round",
}

type props = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    variant: VARIANT;
    icon?: ReactElement<IconProps>;
    radius?: RADIUS;
  };

function Button({
  variant,
  icon,
  radius = RADIUS.Regular,
  children,
  ...rest
}: props) {
  return (
    <button
      className={`${styles["component-button"]} ${styles[variant]} ${styles[radius]}`}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export default Button;
