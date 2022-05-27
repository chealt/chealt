const toggleItem = (needle, haystack) => {
  if (haystack.includes(needle)) {
    const keyIndex = haystack.indexOf(needle);

    return [...haystack.slice(0, keyIndex), ...haystack.slice(keyIndex + 1)];
  }

  return [...haystack, needle];
};

export { toggleItem };
