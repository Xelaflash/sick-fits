import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('1. Works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
    expect(formatMoney(150)).toEqual('$1.50');
  });

  it('2. Should not return cents when its a whole number', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(500000)).toEqual('$5,000');
  });

  it('3. Works with whole and fractional dollars', () => {
    expect(formatMoney(5099)).toEqual('$50.99');
    expect(formatMoney(5100)).toEqual('$51');
  });
});
