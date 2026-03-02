import type { ReactNode } from "react";

export interface LogoLoopLogo {
  src: string;
  alt?: string;
  href?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  title?: string;
  node?: ReactNode;
  ariaLabel?: string;
}

export interface LogoLoopProps {
  logos: LogoLoopLogo[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopLogo, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoLoop: React.FC<LogoLoopProps>;
export default LogoLoop;
