const { getDuration } = require(`./getDuration`);

describe(`getDuration`, () => {
  it(`should return null if string doesn't contain duration`, () => {
    expect(getDuration(`some string 00:00:00.01`)).toEqual(null);
  });

  it(`should return milliseconds`, () => {
    expect(getDuration(`Duration: 00:01:10.01, tes`)).toEqual(70010);
  });
});
