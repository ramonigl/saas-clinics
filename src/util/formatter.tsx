const nameFormatter = (name: string): string => {
  const exceptions: string[] = [
    "da",
    "das",
    "de",
    "des",
    "di",
    "dis",
    "do",
    "dos",
    "du",
    "dus",
  ];
  name = name.replace(/\s+/g, " ");
  return name
    .trim()
    .split(" ")
    .map((parts) =>
      exceptions.includes(parts.toLowerCase())
        ? parts.toLowerCase()
        : parts.charAt(0).toUpperCase() + parts.slice(1).toLowerCase(),
    )
    .join(" ");
};

export default nameFormatter;
