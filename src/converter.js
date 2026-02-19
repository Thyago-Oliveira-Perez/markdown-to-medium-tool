import { marked } from 'marked';

marked.use({
  gfm: true,
  breaks: false,
  pedantic: false,
});

function converter(input) {
  return marked.parse(input.content);
}

export default converter;
