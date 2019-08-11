const regExp = /time=(?<duration>(?<hours>\d\d):(?<minutes>\d\d):(?<seconds>\d\d)\.(?<centisecond>\d\d))/;
module.exports = {
  getTime(input) {
    const {
      groups: { duration, hours, minutes, seconds, centisecond }
    } = regExp.exec(input) || { groups: {} };
    if (!duration) {
      return null;
    }
    return (
      centisecond * 10 +
      seconds * 1000 +
      minutes * 1000 * 60 +
      hours * 60 * 60 * 1000
    );
  }
};
