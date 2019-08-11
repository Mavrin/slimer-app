const { getTime } = require(`./getTime`);

describe(`getTime`, () => {
  it(`should return null if string doesn't contain time`, () => {
    expect(getTime(`Duration: 00:00:00.01`)).toEqual(null);
  });

  it(`should return milliseconds`, () => {
    expect(getTime(`time=00:01:10.01`)).toEqual(70010);
  });
});
