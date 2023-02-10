type Modes = Record<string, boolean | string>

export const classnames = (className: string, modes: Modes = {}, additional: string[] = []): string => {
  const modesForResult = Object.entries(modes ?? {})
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className);

  return [
    className,
    ...additional.filter((value) => Boolean(value)),
    ...modesForResult,
  ]
    .join(' ');
};
