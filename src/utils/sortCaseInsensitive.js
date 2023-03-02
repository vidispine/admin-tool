const sortCaseInsensitive = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });

export default sortCaseInsensitive;
