function sampleAdd(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

// one describe bloc = 1 test suite
// it can have multiple it block (==tests)
describe('sample test 101', () => {
  it('Test 1: works as expected', () => {
    // we run the expect statement, to see if test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });

  it('Test 2: Runs the function properly', () => {
    expect(sampleAdd(1, 3)).toBeGreaterThanOrEqual(4);
  });
  it('Test 3: sampleAdd function can add strings of numbers', () => {
    expect(sampleAdd('1', '3')).toBeGreaterThanOrEqual(4);
  });
});
