# Apollo Theme Markdown Test

This is a comprehensive **Markdown** test file to verify syntax highlighting for the Apollo theme.

## Headers and Text Formatting

### Level 3 Header
#### Level 4 Header
##### Level 5 Header
###### Level 6 Header

This paragraph contains **bold text**, *italic text*, and ***bold italic text***.

You can also use __alternative bold__ and _alternative italic_ syntax.

Here's some `inline code` within a paragraph.

~~Strikethrough text~~ is also supported.

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Third item

* Alternative bullet style
* Another item
  * Nested with asterisk

### Ordered Lists

1. First numbered item
2. Second numbered item
   1. Nested numbered item
   2. Another nested item
3. Third numbered item

## Links and Images

Here's a [link to Apollo Theme](https://apollo-theme.com) with descriptive text.

You can also use reference-style links like [this one][apollo-ref].

[apollo-ref]: https://apollo-theme.com "Apollo Theme Homepage"

Auto-links work too: https://github.com/apollo/vscode-theme

Email links: developer@apollo-theme.com

![Apollo Logo](https://apollo-theme.com/logo.png "Apollo Theme Logo")

## Code Blocks

### Inline Code

Use `console.log()` to output to the console.

### Fenced Code Blocks

```javascript
// JavaScript code block
function greetUser(name) {
  const greeting = `Hello, ${name}!`;
  console.log(greeting);
  return greeting;
}

const user = 'Apollo Developer';
greetUser(user);
```

```typescript
// TypeScript code block
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
```

```css
/* CSS code block */
.apollo-theme {
  background-color: #090a14;
  color: #ebede9;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
}

.syntax-highlight {
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
}
```

```json
{
  "name": "apollo-theme",
  "version": "1.0.0",
  "description": "A retro pixel art theme for VS Code",
  "keywords": ["theme", "vscode", "apollo"],
  "author": "Apollo Developer"
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Apollo Theme</title>
</head>
<body>
    <h1>Welcome to Apollo Theme</h1>
    <p>A beautiful retro-inspired color scheme.</p>
</body>
</html>
```

### Indented Code Blocks

    // This is an indented code block
    function example() {
        return "This uses 4-space indentation";
    }

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > This is a nested blockquote.
> > It provides additional context.

> **Note:** Blockquotes can contain other Markdown elements.
> 
> - Lists
> - `Code`
> - [Links](https://example.com)

## Tables

| Feature | Apollo Dark | Apollo Light | Status |
|---------|-------------|--------------|--------|
| Syntax Highlighting | ✅ | ✅ | Complete |
| Workbench Colors | ✅ | ✅ | Complete |
| Terminal Colors | ✅ | ✅ | Complete |
| Semantic Tokens | ✅ | ⏳ | In Progress |

| Language | Support Level | Notes |
|:---------|:-------------:|------:|
| JavaScript | Full | All features supported |
| TypeScript | Full | Including type annotations |
| HTML | Full | Tags, attributes, values |
| CSS | Full | Selectors, properties, values |
| JSON | Full | Keys, values, structure |
| Markdown | Full | All standard elements |

## Horizontal Rules

---

***

___

## Task Lists

- [x] Implement Apollo Dark theme
- [x] Add comprehensive syntax highlighting
- [x] Create workbench color scheme
- [ ] Implement Apollo Light theme
- [ ] Add semantic token support
- [ ] Create extension documentation
- [ ] Publish to VS Code Marketplace

## Emphasis and Strong

*This text is emphasized*

**This text is strong**

***This text is both emphasized and strong***

## Escape Characters

You can escape special characters with backslashes:

\*This won't be italic\*

\`This won't be code\`

\[This won't be a link\]

## Line Breaks

This line ends with two spaces  
And this line starts on a new line.

This paragraph has a hard line break.

This paragraph is separated by a blank line.

## Footnotes

Here's a sentence with a footnote[^1].

Here's another footnote[^note].

[^1]: This is the first footnote.
[^note]: This is a named footnote with more detailed information.

## Definition Lists

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

## Math (if supported)

Inline math: $E = mc^2$

Block math:

$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## Conclusion

This Markdown file tests various syntax highlighting features for the Apollo theme. The theme should provide distinct colors for:

- **Headers** (different levels)
- **Text formatting** (bold, italic, strikethrough)
- **Code** (inline and blocks)
- **Links** (various styles)
- **Lists** (ordered and unordered)
- **Blockquotes** (including nested)
- **Tables** (headers, cells, alignment)
- **Task lists** (checked and unchecked)
- **Special characters** and escape sequences

The Apollo color palette provides a rich set of colors that create a visually appealing and functional syntax highlighting experience.