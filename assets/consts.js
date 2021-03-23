
const WIKI_URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=';
const SERVER_URL = "http://localhost:3001/wikiProxy?titles"
const ERROR_MESSAGES = {
  EMPTY_CONTENT : 'Empty or remarked',
}
module.exports = {
  WIKI_URL,
  SERVER_URL,
  ERROR_MESSAGES
};