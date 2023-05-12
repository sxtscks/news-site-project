export type Modes = Record<string, boolean | string | undefined>;

export const classnames = (
  className: string,
  modes: Modes = {},
  additional: Array<string | undefined> = []
): string => {
  const modesForResult = Object.entries(modes ?? {})
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className);

  return [
    className,
    ...additional.filter((value) => Boolean(value)),
    ...modesForResult,
  ].join(' ');
};
