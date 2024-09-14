import React from "react"

type BoxIconType = "regular" | "solid" | "logo"
type BoxIconSize = "xs" | "sm" | "md" | "lg" | string
type BoxIconRotate = "90" | "180" | "270"
type BoxIconFlip = "horizontal" | "vertical"
type BoxIconBorder = "square" | "circle"
type BoxIconAnimation =
  | "spin"
  | "tada"
  | "flashing"
  | "burst"
  | "fade-left"
  | "fade-right"
  | "spin-hover"
  | "tada-hover"
  | "flashing-hover"
  | "burst-hover"
  | "fade-left-hover"
  | "fade-right-hover"
type BoxIconPull = "left" | "right"

interface BoxIconProps {
  type?: BoxIconType
  name: string
  color?: string
  size?: BoxIconSize
  rotate?: BoxIconRotate
  flip?: BoxIconFlip
  border?: BoxIconBorder
  animation?: BoxIconAnimation
  pull?: BoxIconPull
  className?: string
}

const BoxIcons: React.FC<BoxIconProps> = ({
  type = "regular",
  name,
  color,
  size,
  rotate,
  flip,
  border,
  animation,
  pull,
  className
}) => {
  const classes = [
    "bx",
    `bx-${type}`,
    `bxl-${name}`,
    size && size !== "md" ? `bx-${size}` : "",
    rotate ? `bx-rotate-${rotate}` : "",
    flip ? `bx-flip-${flip}` : "",
    border ? `bx-border-${border}` : "",
    animation ? `bx-${animation}` : "",
    pull ? `bx-pull-${pull}` : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  return <i className={classes} style={{ color: color }} />
}

export default BoxIcons
