const htmlBestPractices = {
  id: 'html-best-practices',
  title: 'HTML Best Practices & Validation',
  description: 'Learn HTML best practices, validation, accessibility, and SEO optimization',
  content: `
# HTML Best Practices & Validation

Following best practices makes your HTML more maintainable, accessible, and SEO-friendly.

---

## Code Quality Best Practices

### 1. Always Close Tags

\`\`\`html
❌ <p>Text
✅ <p>Text</p>
\`\`\`

### 2. Use Lowercase

\`\`\`html
❌ <DIV>Content</DIV>
✅ <div>Content</div>
\`\`\`

### 3. Quote Attribute Values

\`\`\`html
❌ <input type=text name=username>
✅ <input type="text" name="username">
\`\`\`

### 4. Proper Nesting

\`\`\`html
❌ <div><p>Text</div></p>
✅ <div><p>Text</p></div>
\`\`\`

### 5. Use Semantic Elements

\`\`\`html
❌ <div id="header">...</div>
✅ <header>...</header>
\`\`\`

---

## Accessibility Best Practices

### 1. Always Include Alt Text for Images

\`\`\`html
❌ <img src="photo.jpg">
✅ <img src="photo.jpg" alt="Description of image">
\`\`\`

### 2. Use Labels for Form Inputs

\`\`\`html
❌ <input type="text" name="username">
✅ <label for="username">Username:</label>
    <input type="text" id="username" name="username">
\`\`\`

### 3. Use Proper Heading Hierarchy

\`\`\`html
❌ <h1>Title</h1>
   <h3>Subtitle</h3>  <!-- Skipped h2 -->
   
✅ <h1>Title</h1>
   <h2>Subtitle</h2>
\`\`\`

### 4. Add ARIA Labels When Needed

\`\`\`html
<button aria-label="Close dialog">X</button>
<nav aria-label="Main navigation">
\`\`\`

### 5. Use Semantic HTML

\`\`\`html
✅ <header>, <nav>, <main>, <article>, <section>, <footer>
\`\`\`

---

## SEO Best Practices

### 1. Use Descriptive Title Tags

\`\`\`html
❌ <title>Page 1</title>
✅ <title>Learn HTML - Complete Tutorial | LearnStackHub</title>
\`\`\`

### 2. Include Meta Description

\`\`\`html
<meta name="description" content="Learn HTML from scratch with step-by-step tutorials and examples">
\`\`\`

### 3. Use Proper Heading Structure

\`\`\`html
<h1>Main Title (One per page)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
\`\`\`

### 4. Add Alt Text to Images

\`\`\`html
<img src="tutorial.jpg" alt="HTML tutorial screenshot showing code examples">
\`\`\`

### 5. Use Semantic Elements

\`\`\`html
✅ <article>, <section>, <header>, <nav>
\`\`\`

---

## Performance Best Practices

### 1. Optimize Images

\`\`\`html
❌ <img src="5mb-photo.jpg">
✅ <img src="optimized-200kb-photo.jpg" loading="lazy">
\`\`\`

### 2. Use Lazy Loading

\`\`\`html
<img src="image.jpg" alt="Description" loading="lazy">
\`\`\`

### 3. Minimize HTML

- Remove unnecessary whitespace
- Remove comments in production
- Use minification tools

### 4. Use Appropriate Image Formats

\`\`\`html
✅ JPEG for photos
✅ PNG for graphics with transparency
✅ SVG for icons/logos
✅ WebP for modern browsers
\`\`\`

---

## HTML Validation

### Why Validate?

1. **Cross-browser compatibility**
2. **Better SEO**
3. **Accessibility**
4. **Professional code**

### W3C Validator

**Online:** https://validator.w3.org/

**How to use:**
1. Paste your HTML code
2. Click "Check"
3. Fix any errors

### Common Validation Errors

1. **Missing closing tags**
2. **Invalid nesting**
3. **Deprecated attributes**
4. **Missing alt text**

---

## Common Mistakes to Avoid

### Mistake 1: Using Tables for Layout

\`\`\`html
❌ <table>
     <tr>
       <td>Header</td>
     </tr>
   </table>

✅ <header>Header</header>
\`\`\`

### Mistake 2: Inline Styles Everywhere

\`\`\`html
❌ <p style="color: blue; font-size: 16px;">Text</p>

✅ <p class="intro-text">Text</p>
   <!-- CSS in separate file -->
\`\`\`

### Mistake 3: Missing DOCTYPE

\`\`\`html
❌ <html>
✅ <!DOCTYPE html>
   <html>
\`\`\`

### Mistake 4: Not Using Semantic Elements

\`\`\`html
❌ <div id="header">...</div>
   <div id="nav">...</div>
   
✅ <header>...</header>
   <nav>...</nav>
\`\`\`

---

## HTML5 Do's and Don'ts

### Do's ✅

- Use semantic HTML5 elements
- Validate your HTML
- Include alt text for images
- Use proper heading hierarchy
- Close all tags
- Use lowercase
- Quote all attributes

### Don'ts ❌

- Don't use deprecated tags (\`<font>\`, \`<center>\`)
- Don't use tables for layout
- Don't skip heading levels
- Don't forget DOCTYPE
- Don't use inline styles everywhere
- Don't forget to validate

---

## Summary

**Code Quality:**
- ✅ Close all tags
- ✅ Use lowercase
- ✅ Quote attributes
- ✅ Proper nesting

**Accessibility:**
- ✅ Alt text for images
- ✅ Labels for inputs
- ✅ Proper heading hierarchy
- ✅ Semantic HTML

**SEO:**
- ✅ Descriptive titles
- ✅ Meta descriptions
- ✅ Proper headings
- ✅ Semantic elements

**Performance:**
- ✅ Optimize images
- ✅ Lazy loading
- ✅ Appropriate formats

**Validation:**
- ✅ Use W3C validator
- ✅ Fix all errors
- ✅ Test in multiple browsers

Following best practices makes your HTML professional and maintainable!
`,
  code: `// HTML Best Practices & Validation

/*
 * BEST PRACTICES FOR QUALITY HTML
 * =================================
 */

// ============================================
// 1. CODE QUALITY
// ============================================
/*
✅ Always close tags: <p>Text</p>
✅ Use lowercase: <div> not <DIV>
✅ Quote attributes: type="text"
✅ Proper nesting: <div><p>Text</p></div>
✅ Use semantic elements: <header> not <div id="header">
*/

// ============================================
// 2. ACCESSIBILITY
// ============================================
/*
✅ Alt text for images: <img alt="description">
✅ Labels for inputs: <label for="id">
✅ Proper heading hierarchy: h1 → h2 → h3
✅ ARIA labels when needed
✅ Semantic HTML
*/

// ============================================
// 3. SEO
// ============================================
/*
✅ Descriptive title tags
✅ Meta descriptions
✅ Proper heading structure
✅ Alt text for images
✅ Semantic elements
*/

// ============================================
// 4. PERFORMANCE
// ============================================
/*
✅ Optimize images
✅ Lazy loading: loading="lazy"
✅ Appropriate formats (JPEG/PNG/SVG)
✅ Minimize HTML
*/

// ============================================
// 5. VALIDATION
// ============================================
/*
✅ Use W3C validator: validator.w3.org
✅ Fix all errors
✅ Test in multiple browsers
*/

// ============================================
// 6. COMMON MISTAKES TO AVOID
// ============================================
/*
❌ Using tables for layout
❌ Inline styles everywhere
❌ Missing DOCTYPE
❌ Not using semantic elements
❌ Deprecated tags (<font>, <center>)
*/
`
};

export default htmlBestPractices;


