import { formatTimeCodeText, formatTimeCodeSeconds, formatTimeCodeSmpte } from '@vidispine/vdt-js';

import { TEXT_TIME, SMPTE_TIME, SECONDS_TIME } from '../const/Time';

function formatTimeRepresentation({ to, from, value, toOptions, fromOptions, conform }) {
  if (to === from) return value;
  let timeCode;

  switch (from) {
    case TEXT_TIME:
      timeCode = formatTimeCodeText(value, fromOptions);
      break;
    case SECONDS_TIME:
      timeCode = formatTimeCodeSeconds(value, fromOptions);
      break;
    case SMPTE_TIME:
      timeCode = formatTimeCodeSmpte(value, fromOptions);
      break;
    default:
      return value;
  }
  if (conform) {
    timeCode = timeCode.conformTimeBase(conform);
  }

  switch (to) {
    case TEXT_TIME:
      return timeCode.toText(toOptions);
    case SECONDS_TIME:
      return timeCode.toSeconds(toOptions);
    case SMPTE_TIME:
      return timeCode.toSmpte(toOptions);
    default:
      return value;
  }
}

export default formatTimeRepresentation;
