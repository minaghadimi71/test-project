export function compure(i: number) {
  if (i < 0) {
    return 0;
  } else if (i === 0) {
    return 1;
  } else {
    return i + 1;
  }
}
export function mina(i: number) {
  switch (i) {
    case 1 : return 2;
    case 2: return 3;
    case 3: return 4;
    default: return 0;
  }
}
export function welcome(name: string) {
  return 'welcome' + name;
}
export function vahed() {
  return ['rial', 'toman', 'mony'];
}
