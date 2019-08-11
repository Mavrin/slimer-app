const { initProgress } = require("./progress");

describe(`progress`, () => {
  const progress = initProgress();

  it(`should return init value`, () => {
    expect(progress.getCurrentProgress()).toEqual(0);
  });

  it(`should return value after update`, () => {
    progress.update("some string");
    progress.update("Duration: 00:00:01.00");
    progress.update("some sting");
    progress.update("time=00:00:00.20");
    progress.update("some sting");
    expect(progress.getCurrentProgress()).toEqual(20);
    progress.update("time=00:00:00.60");
    expect(progress.getCurrentProgress()).toEqual(60);
  });
});
