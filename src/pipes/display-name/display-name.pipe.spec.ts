import { DisplayNamePipe } from './display-name.pipe';

describe('DisplayNamePipe', () => {
  let pipe: DisplayNamePipe;

  beforeEach(() => {
    pipe = new DisplayNamePipe();
  });

  it('should transform strings like "this-one-here" into "This One Here"', () => {
    const input = 'this-one-here';
    const output = pipe.transform(input);
    expect(output).toBe('This One Here');
  });
});
