const sortKeyCaseInsensitive = (key) => (a = {}, b = {}) => a[key].localeCompare(b[key], undefined, { sensitivity: 'base' });

export default sortKeyCaseInsensitive;
