module.exports = {
  getPercent(duration, time) {
    if (!duration || !time) {
      return 0;
    }
    return Math.round((time / duration) * 100);
  }
};
