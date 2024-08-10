const sortKeysAlphabetically = (groupedData: any) => {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const sortedData: any = {};
  alphabet.forEach((letter: string) => {
    sortedData[letter] = groupedData[letter] || []; // Assign the sorted keys to the new object
  });

  return sortedData;
};

const groupByCountry = (data: any) => {
  const result: any = {};

  // Iterate over each section in the data
  Object.values(data).forEach((items: any) => {
    items.forEach((item: { country: string }): any => {
      const firstLetter = item?.country[0]?.toUpperCase();
      if (!firstLetter) return;
      // If the country doesn't exist in the result, create one entry (remove duplicate)
      if (!result[firstLetter]) {
        result[firstLetter] = [];
      }
      if (
        result[firstLetter] &&
        !result[firstLetter].find(
          (currentItem: any) => item.country === currentItem.country,
        )
      ) {
        result[firstLetter].push(item);
      }
      result[firstLetter];
    });
  });

  return result;
};

export { groupByCountry, sortKeysAlphabetically };
