import moment from 'moment';

function fromNow(value) {
  const startMoment = moment(value);
  const nowMoment = moment();
  const durationMoment = moment.duration(nowMoment.diff(startMoment));
  return `${parseInt(durationMoment.asMinutes(), 10)} minutes`;
}

export default fromNow;
