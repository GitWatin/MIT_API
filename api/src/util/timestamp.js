//Changer le format timestant nodejs to timstamp linux

const unixTimestamp = () => Math.round(Date.now() / 1000);

module.exports = unixTimestamp;
