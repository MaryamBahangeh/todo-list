import { ComponentProps, ReactElement } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";

export enum Variant {
  SOLID = "solid",
  OUTLINE = "outline",
}

type Props = Omit<ComponentProps<"button">, "className"> & {
  className?: string;
  variant?: Variant;
};

export default function Button({
  children,
  className,
  variant = Variant.SOLID,
  ...rest
}: Props): ReactElement {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
