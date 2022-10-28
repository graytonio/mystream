export function getRandomColor(): string {
  const colors = [
    "red-600",
    "orange-600",
    "green-500",
    "teal-500",
    "yellow-500",
    "violet-500",
    "white",
  ];
  return colors[Math.floor(Math.random() * colors.length)] || "white";
}
