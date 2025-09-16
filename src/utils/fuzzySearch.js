/**
 *
 * @param {string} pattern - Search term
 * @param {string} str - Target string
 * @returns {number} - Score (higher = better match, 0 = no match)
 */
function fuzzyMatchScore(pattern, str) {
  if (!pattern) return 0;

  const lowerPattern = pattern.toLowerCase();
  const lowerStr = str.toLowerCase();

  let score = 0;
  let patternIndex = 0;
  let consecutiveBonus = 0;

  for (let i = 0; i < str.length; i += 1) {
    if (patternIndex >= pattern.length) break;

    if (lowerStr[i] === lowerPattern[patternIndex]) {
      // Base points
      score += 10;

      // Bonus for consecutive characters
      score += consecutiveBonus * 5;
      consecutiveBonus += 1;

      // Bonus for word boundary (start of string or after space/underscore/dash)
      if (i === 0 || [' ', '_', '-'].includes(str[i - 1])) {
        score += 15;
      }

      // Bonus for exact case match
      if (str[i] === pattern[patternIndex]) {
        score += 2;
      }

      patternIndex += 1;
    } else {
      // Reset consecutive bonus if break
      consecutiveBonus = 0;

      // Small penalty for skipping characters
      score -= 1;
    }
  }

  // Pattern must be fully matched
  if (patternIndex < pattern.length) return 0;

  // Slight penalty for matches later in the string
  score -= str.length - patternIndex;

  return Math.max(score, 0);
}

/**
 * Performs a fuzzy search on a list of items and returns the items that match the pattern above a minimum score.
 *
 * @param {string} pattern - The search pattern to match against the items.
 * @param {Array} items - The array of items to search.
 * @param {number} [minScore=0.5] - The minimum score threshold for matches to be included in the results.
 * @param {string|string[]} [key] - The property name(s) of each item to match against. If an array is provided, the highest score among the keys is used. If omitted, items themselves are matched.
 * @returns {Array} The filtered and sorted array of items that match the pattern above the minimum score.
 */
function fuzzySearch(pattern, items, minScore = 0.5, key = undefined) {
  return items
    .map((item) => {
      if (Array.isArray(key)) {
        const highScore = Math.max(
          ...key.map((thisKey) => fuzzyMatchScore(pattern, item[thisKey])),
        );
        return {
          item,
          score: highScore,
        };
      }
      const str = key ? item[key] : item;
      return {
        item,
        score: fuzzyMatchScore(pattern, str),
      };
    })
    .filter((entry) => entry.score > minScore)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

export default fuzzySearch;
