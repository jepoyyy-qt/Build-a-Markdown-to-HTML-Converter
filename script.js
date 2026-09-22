const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  const markdown = markdownInput.value;

  const html = markdown
    // Headings (H3, H2, H1) - must be at start of string or new line
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    // Blockquotes - must be at start of string or new line
    .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
    // Images: ![alt-text](image-source)
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img alt="$1" src="$2">')
    // Links: [link text](URL)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Bold: **text** or __text__
    .replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>")
    // Italics: *text* or _text_
    .replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  return html;
}

markdownInput.addEventListener("input", () => {
  const convertedHtml = convertMarkdown();
  htmlOutput.textContent = convertedHtml;
  preview.innerHTML = convertedHtml;
});