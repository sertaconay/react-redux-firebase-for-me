/* eslint-disable no-alert, no-undef */

export const customConfirm = (string) => {
  const confirming = confirm(string);
  return confirming;
};

export const removeByKey = ((object, deleteKey) =>
  Object.keys(object)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      const newResult = result;
      newResult[current] = object[current];
      return newResult;
    }, {})
);

export const getFirstParagraph = ((text, type) =>
  (type ? text.match('<p>(.*?)</p>')[0] : text.match('<p>(.*?)</p>')[1])
);
