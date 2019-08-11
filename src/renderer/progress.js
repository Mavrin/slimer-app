const { getPercent } = require("./getPercent");
const { getDuration } = require("./getDuration");
const { getTime } = require("./getTime");
module.exports = {
  initProgress() {
    let duration = null;
    let time = null;
    return {
      update(data) {
        if (!duration) {
          duration = getDuration(data);
        }
        const currentTime = getTime(data);
        if (currentTime) {
          time = currentTime;
        }
      },
      getCurrentProgress() {
        return getPercent(duration, time);
      }
    };
  }
};
