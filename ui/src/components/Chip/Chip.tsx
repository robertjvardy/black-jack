import classNames from "classnames";
import styles from "./styles.module.scss";

const Chip = ({
  color,
  value,
  onClick,
  size = 4,
  isClickable = false,
}: {
  value: number;
  color: string;
  onClick?: () => void;
  size?: number;
  isClickable?: boolean;
}) => {
  const sizeCssProperty = `${size}em`;
  const fontSizeCssProperty = `${size * 0.5}em`;
  return (
    <div
      className={styles["chip-container"]}
      style={{ height: sizeCssProperty, width: sizeCssProperty }}
    >
      <div
        className={classNames(styles["chip-outer-ring"], {
          [styles.clickable]: isClickable,
        })}
        style={{ border: `6px dashed ${color}` }}
        onClick={onClick}
      >
        <div
          className={styles.chip}
          style={{
            background: color,
            height: sizeCssProperty,
            width: sizeCssProperty,
          }}
        >
          <div
            className={styles["text-container"]}
            style={{ fontSize: fontSizeCssProperty }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chip;
