import {compure} from './compure';
import {mina} from './compure';
import {welcome} from './compure';
import {vahed} from './compure';

describe('compure', () => {
  it('mina', () => {
    const result = compure(-1);
    expect(result).toBe(0);
  });
  it('mina1', () => {
    const result = compure(1);
    expect(result).toBe(2);
  });
  it('mina2', () => {
    const result = compure(0);
    expect(result).toBe(1);
  });
});
describe('mina', () => {
  it('input is 1', () => {
    const result = mina(1);
    expect(result).toBe(2);
  });
  it('input is 2', () => {
    const result = mina(2);
    expect(result).toBe(3);
  });
  it('input is 4', () => {
    const result = mina(4);
    expect(result).toBe(0);
  });
});
describe('welcome', () => {
  it('input is mina jan', () => {
    expect(welcome('mina jan')).toContain('mina');
  });
});
describe('vahed', () => {
  it('shoult be all', () => {
    expect(vahed()).toContain('rial');
    expect(vahed()).toContain('toman');
    expect(vahed()).toContain('mony');
  });
});
