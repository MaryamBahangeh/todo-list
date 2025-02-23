import { ReactElement, SVGProps, ComponentProps } from "react";

import clsx from "clsx";

import styles from "./IconButton.module.css";

export enum Variant {
  SOLID = "solid",
  GHOST = "ghost",
}

export enum Shape {
  SQUARE = "square",
  CIRCLE = "circle",
}

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

type Props = Omit<ComponentProps<"button">, "children" | "className"> & {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
  variantIconButton?: Variant;
  shape?: Shape;
  size?: Size;
};

export default function IconButton({
  icon,
  className,
  variantIconButton = Variant.SOLID,
  shape = Shape.SQUARE,
  size = Size.MEDIUM,
  ...rest
}: Props): ReactElement {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variantIconButton],
        styles[shape],
        styles[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
