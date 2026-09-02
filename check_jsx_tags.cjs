const fs = require('fs');

const code = fs.readFileSync('src/components/BuilderEditor.tsx', 'utf8');

// Simple lexical scanner for JSX
let i = 0;
let tagsStack = [];

// Ignore comments
let cleanCode = code
  .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
  .replace(/\/\/.*$/gm, '');        // remove single-line comments

while (i < cleanCode.length) {
  // Ignore string literals
  if (cleanCode[i] === '"' || cleanCode[i] === "'" || cleanCode[i] === '`') {
    let quote = cleanCode[i];
    i++;
    while (i < cleanCode.length && cleanCode[i] !== quote) {
      if (cleanCode[i] === '\\') i++;
      i++;
    }
    i++;
    continue;
  }
  
  // Detect tags
  if (cleanCode[i] === '<') {
    // Check if it is a type cast, generic or comparison
    // In JSX, tags start with < followed by alphanumeric, optionally a closing slash, and end with > or />.
    // Let's grab the potential tag
    let tagContent = '';
    let j = i + 1;
    while (j < cleanCode.length && cleanCode[j] !== '>') {
      tagContent += cleanCode[j];
      j++;
    }
    
    if (j < cleanCode.length) {
      // We found <tagContent>
      let isTag = false;
      let tagName = '';
      let isClosing = false;
      let isSelfClosing = false;
      
      // Trim tagContent
      let trimmed = tagContent.trim();
      
      if (trimmed.startsWith('/')) {
        isClosing = true;
        tagName = trimmed.substring(1).trim().split(/\s+/)[0];
        // Must be a valid HTML tag or React component name
        if (/^[a-zA-Z][a-zA-Z0-9\-]*$/.test(tagName) || tagName === '') {
          isTag = true;
          if (tagName === '') tagName = 'fragment';
        }
      } else if (trimmed === '') {
        // Fragment shorthand <>
        isTag = true;
        tagName = 'fragment';
      } else {
        tagName = trimmed.split(/\s+/)[0];
        if (trimmed.endsWith('/')) {
          isSelfClosing = true;
          tagName = tagName.replace(/\/$/, '');
        }
        if (/^[a-zA-Z][a-zA-Z0-9\-]*$/.test(tagName)) {
          isTag = true;
        }
      }
      
      if (isTag) {
        let line = cleanCode.substring(0, i).split('\n').length;
        if (isSelfClosing) {
          // Self closing, do nothing
        } else if (isClosing) {
          if (tagsStack.length === 0) {
            console.log(`Unmatched closing tag </${tagName}> on line ${line}`);
          } else {
            let top = tagsStack.pop();
            if (top.name !== tagName) {
              console.log(`Tag mismatch: found </${tagName}> on line ${line} but expected matching tag for <${top.name}> from line ${top.line}`);
              tagsStack.push(top); // put it back
            }
          }
        } else {
          tagsStack.push({ name: tagName, line });
        }
        i = j + 1;
        continue;
      }
    }
  }
  i++;
}

if (tagsStack.length > 0) {
  console.log('Unclosed tags at end of file:');
  tagsStack.forEach(t => {
    console.log(`  <${t.name}> from line ${t.line}`);
  });
} else {
  console.log('All JSX tags matched perfectly!');
}
