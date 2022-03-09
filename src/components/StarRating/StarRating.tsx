import Star from "./Star/Star";
import { FC } from "react";

export interface Props {
  maxStars?: number;
  value?: number;
  onChange?: (newStar: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  size?: number | string;
  gap?: number | string;
  editable?: boolean;
  hideInactive?: boolean;
}

const StarRating: FC<Props> = ({
  maxStars = 5,
  value = 0,
  onChange,
  activeColor = '#FFED76',
  inactiveColor = '#121621',
  size = 36,
  editable = true,
  gap = 16,
  hideInactive = false
}) => (
  <ul
    style={{
      color: inactiveColor,
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex"
    }}
  >
    {Array(hideInactive ? value : maxStars)
      .fill(null)
      .map((_, i) => i + 1)
      .map(starNumber => (
        <li
          title={`${starNumber} star`}
          key={starNumber}
          onClick={() => {
            if (onChange && editable) onChange(starNumber);
          }}
          style={{
            cursor: "pointer",
            position: "relative",
            marginRight: starNumber !== maxStars ? gap : 0
          }}
        >
          <Star
            selected={starNumber <= value}
            size={size}
          />
        </li>
      ))}
  </ul>
);

export default StarRating;