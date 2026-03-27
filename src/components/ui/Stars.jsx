export default function Stars({ count }) {
  return <span>{Array(count).fill("⭐").join("")}</span>;
}
