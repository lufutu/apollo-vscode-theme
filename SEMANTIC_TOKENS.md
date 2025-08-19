# Apollo Theme - Semantic Token Support

## Overview

Both Apollo Dark and Apollo Light themes include comprehensive semantic token support for enhanced TypeScript and JavaScript highlighting. Semantic tokens provide more accurate and context-aware syntax highlighting by leveraging language server information.

## What are Semantic Tokens?

Semantic tokens are an advanced VS Code feature that provides enhanced syntax highlighting by using information from language servers (like TypeScript Language Service). Unlike traditional TextMate-based syntax highlighting that relies on regex patterns, semantic tokens understand the actual meaning and context of code elements.

## Supported Token Types

Both Apollo Dark and Apollo Light themes define colors for the following semantic token types. The colors are carefully selected from the Apollo palette and adapted for optimal contrast on their respective backgrounds:

### Core Language Elements
| Token Type | Apollo Dark | Apollo Light | Description |
|------------|-------------|--------------|-------------|
| **namespace** | `#da863e` | `#884b2b` | Namespace declarations |
| **class** | `#da863e` | `#884b2b` | Class declarations and references |
| **interface** | `#c09473` | `#ad7757` | Interface declarations and references |
| **enum** | `#c09473` | `#ad7757` | Enum declarations |
| **struct** | `#da863e` | `#884b2b` | Struct declarations (for languages that support them) |
| **type** | `#d7b594` | `#7a4841` | Type aliases and references |
| **typeParameter** | `#d7b594` | `#7a4841` | Generic type parameters |

### Functions and Methods
| Token Type | Apollo Dark | Apollo Light | Description |
|------------|-------------|--------------|-------------|
| **function** | `#e8c170` | `#be772b` | Function declarations and calls |
| **method** | `#e8c170` | `#be772b` | Method declarations and calls |
| **event** | `#e8c170` | `#be772b` | Event handlers and declarations |
| **macro** | `#4f8fba` | `#253a5e` | Macro definitions (for applicable languages) |

### Variables and Properties
| Token Type | Apollo Dark | Apollo Light | Description |
|------------|-------------|--------------|-------------|
| **variable** | `#a4dddb` | `#3c5e8b` | Variable declarations and references |
| **parameter** | `#a4dddb` | `#3c5e8b` | Function/method parameters |
| **property** | `#73bed3` | `#253a5e` | Object properties and class fields |
| **enumMember** | `#df84a5` | `#a23e8c` | Enum member values |

### Language Keywords and Operators
| Token Type | Apollo Dark | Apollo Light | Description |
|------------|-------------|--------------|-------------|
| **keyword** | `#4f8fba` | `#253a5e` | Language keywords |
| **modifier** | `#4f8fba` | `#253a5e` | Access modifiers (public, private, etc.) |
| **operator** | `#a8b5b2` | `#394a50` | Operators (+, -, *, etc.) |
| **decorator** | `#de9e41` | `#884b2b` | Decorators (@decorator) |

### Literals and Comments
| Token Type | Apollo Dark | Apollo Light | Description |
|------------|-------------|--------------|-------------|
| **string** | `#a8ca58` | `#468232` | String literals |
| **number** | `#c65197` | `#7a367b` | Numeric literals |
| **regexp** | `#d0da91` | `#75a743` | Regular expressions |
| **comment** | `#577277` | `#577277` | Comments (same color for both themes) |
| **label** | `#73bed3` | `#4f8fba` | Labels (for goto statements, etc.) |

## Semantic Token Modifiers

The theme also supports semantic token modifiers that add additional styling:

### Font Style Modifiers
- **declaration**: Bold font style for declarations
- **definition**: Bold font style for definitions
- **readonly**: Italic font style for readonly elements
- **static**: Italic font style for static members
- **async**: Italic font style for async functions
- **deprecated**: Strikethrough with muted color for deprecated elements
- **modification**: Underline for modified elements

### Library and Built-in Elements
Special colors for built-in and library elements:
- **defaultLibrary**: Different shades for built-in types and functions
- Various `.defaultLibrary` combinations for standard library elements

### Declaration-specific Colors
Enhanced colors for specific declaration contexts:
- **parameter.declaration**: `#a4dddb`
- **variable.declaration**: `#a4dddb`
- **property.declaration**: `#73bed3`
- **function.declaration**: `#e8c170`
- **method.declaration**: `#e8c170`
- **class.declaration**: `#da863e`
- **interface.declaration**: `#c09473`
- **enum.declaration**: `#c09473`
- **enumMember.declaration**: `#df84a5`
- **type.declaration**: `#d7b594`
- **typeParameter.declaration**: `#d7b594`
- **namespace.declaration**: `#da863e`

## How to Enable Semantic Highlighting

Semantic highlighting is automatically enabled when you use either Apollo Dark or Apollo Light theme. However, you can control it with these VS Code settings:

```json
{
  "editor.semanticHighlighting.enabled": true,
  "editor.semanticTokenColorCustomizations": {
    "[Apollo Dark]": {
      // Custom overrides for dark theme can be added here if needed
    },
    "[Apollo Light]": {
      // Custom overrides for light theme can be added here if needed
    }
  }
}
```

## Testing Semantic Tokens

To test semantic token highlighting:

1. Open a TypeScript or JavaScript file
2. Ensure the TypeScript language server is running
3. Look for enhanced highlighting of:
   - Class names vs. interface names (different colors)
   - Method calls vs. function calls
   - Parameters vs. local variables
   - Built-in types vs. custom types
   - Deprecated elements (strikethrough)

## Language Server Integration

Semantic tokens work best with:
- **TypeScript Language Service** - Full support for TS/JS files
- **Python Language Server** - Enhanced Python highlighting
- **C# Language Server** - Improved C# syntax highlighting
- **Rust Analyzer** - Better Rust code highlighting
- **Java Language Server** - Enhanced Java highlighting

## Fallback Behavior

If semantic tokens are not available (e.g., language server not running), VS Code will fall back to traditional TextMate-based syntax highlighting using the theme's `tokenColors` rules.

## Color Palette Integration

All semantic token colors are carefully selected from the Apollo color palette to maintain visual consistency across both themes:

### Apollo Dark Theme
- Blues/Teals for keywords and properties
- Greens for strings and success states
- Warm tones for functions and important elements
- Purples/Magentas for numbers and special values
- Browns/Oranges for types and classes
- Grayscale for comments and muted elements

### Apollo Light Theme
- Darker blues for keywords and properties (better contrast on light background)
- Darker greens for strings (improved readability)
- Warmer browns for functions and classes (enhanced visibility)
- Deeper purples for numbers and special values
- Consistent grayscale for comments (same as dark theme)

Both themes ensure that semantic highlighting enhances the retro pixel art aesthetic while providing excellent code readability and distinction. The light theme uses darker shades from the Apollo palette to maintain proper contrast ratios for accessibility compliance.