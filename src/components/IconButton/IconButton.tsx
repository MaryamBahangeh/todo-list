import { ReactElement, SVGProps, ComponentProps } from "react";

import clsx from "clsx";

import styles from "./IconButton.module.css";

export enum VariantIconButton {
  SOLID = "solid",
  GHOST = "ghost",
}

export enum Shape {
  SQUARE = "square",
  CIRCLE = "circle",
}

export enum Size {
  MEDIUM = "medium",
  LARGE = "large",
}

type Props = Omit<ComponentProps<"button">, "children" | "className"> & {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
  variantIconButton?: VariantIconButton;
  shape?: Shape;
  size?: Size;
};

export default function IconButton({
  icon,
  className,
  variantIconButton = VariantIconButton.SOLID,
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
