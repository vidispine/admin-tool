// https://github.com/xavi/miss-plete
// Copyright (c) 2015 Xavi Caballé

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export function jaroDistance(s1, s2) {
  const [longer, shorter] = s1.length > s2.length ? [s1, s2] : [s2, s1];

  const matchingWindow = Math.floor(longer.length / 2) - 1;
  const shorterMatches = [];
  const longerMatches = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < shorter.length; i++) {
    const ch = shorter[i];
    const windowStart = Math.max(0, i - matchingWindow);
    const windowEnd = Math.min(i + matchingWindow + 1, longer.length);
    // eslint-disable-next-line no-plusplus
    for (let j = windowStart; j < windowEnd; j++) {
      if (longerMatches[j] === undefined && ch === longer[j]) {
        // eslint-disable-next-line no-multi-assign
        shorterMatches[i] = longerMatches[j] = ch;
        break;
      }
    }
  }

  const shorterMatchesString = shorterMatches.join('');
  const longerMatchesString = longerMatches.join('');
  const numMatches = shorterMatchesString.length;

  let transpositions = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < shorterMatchesString.length; i++) {
    if (shorterMatchesString[i] !== longerMatchesString[i]) {
      transpositions += 1;
    }
  }

  return numMatches > 0
    ? (numMatches / shorter.length +
        numMatches / longer.length +
        (numMatches - Math.floor(transpositions / 2)) / numMatches) /
        3.0
    : 0;
}

export function jaroToSimilarity(s1, s2, prefixScalingFactor = 0.2) {
  const jaroSimilarity = jaroDistance(s1, s2);

  let commonPrefixLength = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === s2[i]) {
      commonPrefixLength += 1;
    } else {
      break;
    }
  }

  return (
    jaroSimilarity + Math.min(commonPrefixLength, 4) * prefixScalingFactor * (1 - jaroSimilarity)
  );
}

export function optionToScore(inputValue, option) {
  const { synonyms = [] } = option;
  let closestSynonym = null;
  synonyms.every((synonym) => {
    const similarity = jaroToSimilarity(
      synonym.trim().toLowerCase(),
      inputValue.trim().toLowerCase(),
    );
    if (closestSynonym === null || similarity > closestSynonym.similarity) {
      closestSynonym = { similarity, value: synonym };
      if (similarity === 1) {
        return false;
      }
    }
    return true;
  });
  return {
    score: closestSynonym.similarity,
    closestSynonym: closestSynonym.value,
    option,
  };
}

export function optionListToScore(input, options, minScore = 0) {
  const scoredOptions = options
    .map((option) => optionToScore(input, option))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score);
  return scoredOptions;
}
