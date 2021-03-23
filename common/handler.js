const { ERROR_MESSAGES } = require('../assets/consts');

function formatResponse(wikiAnParsedText) {
  const pagesData = wikiAnParsedText.query.pages;
  const index = Object.keys(pagesData)[0];
  let text = '';
  if (index == -1 || !pagesData[index].extract || !pagesData[index].extract.trim()) {
    text = 'Not found';
  } else {
    text = pagesData ? pagesData[index].extract : ERROR_MESSAGES.EMPTY_CONTENT;
    text = text.replace(/<[^>]*>?/gm, '');
    text = text.replace(/;/g, '');
  }
  return text ? text : 'Empty';
}
function calculateData(text){

}
function buildRateingMap(){
  const wordCount=100;
  const maxCount = 10;
}
module.exports = {
  formatResponse,
}