export default function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "btn btn-sm rounded-pill me-2 mb-2 " +
        (selected ? "btn-primary" : "btn-outline-secondary")
      }
    >
      {label}
    </button>
  );
}
