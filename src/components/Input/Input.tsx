import { ReactNode, forwardRef, ComponentProps } from "react";

import clsx from "clsx";

import styles from "./Input.module.css";

type Props = Omit<ComponentProps<"input">, "ref" | "type"> & {
  suffixIcon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>(function (
  { suffixIcon, className, ...otherProps },
  ref,
) {
  return (
    <div className={clsx(styles["input"], className)}>
      <input ref={ref} type="text" {...otherProps} />
      {suffixIcon}
    </div>
  );
});

export default Input;
