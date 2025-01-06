import "./styles.scss";

const Chip = ({
  color,
  value,
  onClick,
}: {
  value: number;
  color: string;
  onClick: () => void;
}) => {
  return (
    <div className="chip-container">
      <div
        className="chip-outer-ring"
        style={{ border: `6px dashed ${color}` }}
        onClick={onClick}
      >
        <div className="chip" style={{ background: color }}>
          <div>
            <span>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chip;
