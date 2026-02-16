const htmlIframe = {
  id: 'html-iframe',
  title: 'HTML iframe - Embedding Content',
  description: 'Learn how to embed external content like videos, maps, and other web pages using iframe',
  content: `
# HTML iframe — Embedding External Content

The \`<iframe>\` (inline frame) element allows you to embed another HTML page within the current page. It's commonly used for videos, maps, and external content.

---

## Basic iframe Syntax

\`\`\`html
<iframe src="https://example.com"></iframe>
\`\`\`

**Components:**
- \`<iframe>\` - Inline frame element
- \`src\` - Source URL of content to embed

---

## iframe Attributes

### Width and Height

\`\`\`html
<iframe src="https://example.com" width="800" height="600"></iframe>

<!-- Better: Use CSS -->
<iframe src="https://example.com" style="width: 100%; height: 500px;"></iframe>
\`\`\`

### Name Attribute

\`\`\`html
<iframe src="page.html" name="myFrame"></iframe>
<a href="other.html" target="myFrame">Load in iframe</a>
\`\`\`

**Purpose:** Allows links to load content in the iframe

---

### Sandbox Attribute (Security)

\`\`\`html
<iframe src="external.html" sandbox></iframe>
\`\`\`

**Restrictions:**
- Blocks scripts
- Blocks forms
- Blocks popups
- More secure

**Allow specific features:**
\`\`\`html
<iframe src="external.html" 
        sandbox="allow-scripts allow-forms">
</iframe>
\`\`\`

---

### Loading Attribute

\`\`\`html
<iframe src="page.html" loading="lazy"></iframe>
\`\`\`

**Options:**
- \`lazy\` - Load when near viewport
- \`eager\` - Load immediately (default)

---

## Real-Time Scenarios

### Scenario 1: Embed YouTube Video

\`\`\`html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
\`\`\`

### Scenario 2: Embed Google Maps

\`\`\`html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022..." 
    width="600" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
\`\`\`

### Scenario 3: Embed PDF Document

\`\`\`html
<iframe src="document.pdf" width="100%" height="600px"></iframe>
\`\`\`

### Scenario 4: Embed Another Website

\`\`\`html
<iframe src="https://example.com" width="800" height="600"></iframe>
\`\`\`

**Note:** Many websites block embedding for security (X-Frame-Options header)

---

## Responsive iframe

\`\`\`html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0">
    </iframe>
</div>
\`\`\`

**Purpose:** Makes iframe responsive (16:9 aspect ratio)

---

## Best Practices

1. **Use sandbox for untrusted content**
2. **Set explicit dimensions**
3. **Use loading="lazy" for performance**
4. **Handle cases where embedding is blocked**
5. **Consider security implications**

---

## Summary

**iframe Attributes:**
- ✅ \`src\` - Source URL
- ✅ \`width\` / \`height\` - Dimensions
- ✅ \`name\` - Target name
- ✅ \`sandbox\` - Security restrictions
- ✅ \`loading\` - Lazy loading

**Common Uses:**
- ✅ Embed videos (YouTube, Vimeo)
- ✅ Embed maps (Google Maps)
- ✅ Embed documents (PDFs)
- ✅ Embed external content

iframes are powerful but use them carefully for security!
`,
  code: `// HTML iframe

/*
 * IFRAME EMBEDS EXTERNAL CONTENT
 * ==============================
 */

// ============================================
// 1. BASIC SYNTAX
// ============================================
/*
<iframe src="https://example.com"></iframe>
*/

// ============================================
// 2. ATTRIBUTES
// ============================================
/*
WIDTH & HEIGHT:
  <iframe src="page.html" width="800" height="600"></iframe>

NAME:
  <iframe src="page.html" name="myFrame"></iframe>
  <a href="other.html" target="myFrame">Load</a>

SANDBOX (Security):
  <iframe src="external.html" sandbox></iframe>
  <iframe src="external.html" sandbox="allow-scripts"></iframe>

LOADING:
  <iframe src="page.html" loading="lazy"></iframe>
*/

// ============================================
// 3. COMMON USES
// ============================================
/*
YOUTUBE VIDEO:
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>

GOOGLE MAPS:
  <iframe src="https://www.google.com/maps/embed?..."></iframe>

PDF DOCUMENT:
  <iframe src="document.pdf"></iframe>
*/
`
};

export default htmlIframe;


