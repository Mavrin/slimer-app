const { getPercent } = require(`./getPercent`);

describe(`getPercent`, () => {
  it(`should return 0 for nullable value`, () => {
    expect(getPercent(null, null)).toEqual(0);
    expect(getPercent(10, null)).toEqual(0);
  });

  it(`should return percent`, () => {
    expect(getPercent(50, 25)).toEqual(50);
    expect(getPercent(1000, 21)).toEqual(2);
  });
});
