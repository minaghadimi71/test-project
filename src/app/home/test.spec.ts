import {Test} from './test';
describe('Test', () => {
  let test: Test;
  beforeEach(() => {
    test = new Test();
  });
  afterAll(() => {});
  afterEach(() => {});
  beforeAll(() => {});
  it('new test', () => {
  test.upper();
  expect(test.toggle).toBe(1);
});
  it('new test2', () => {
    test.unner();
    expect(test.toggle).toBe(-1);
  });
});
