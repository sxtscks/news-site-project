type Mods = Record<string, boolean | string>

export const classnames = (className: string, mods?: Mods, additional?: string[]): string => {
  const modsForResult = Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className);

  return [
    className,
    ...additional.filter((value) => Boolean(value)),
    ...modsForResult,
  ]
    .join(' ');
};
