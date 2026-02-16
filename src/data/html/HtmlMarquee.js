const htmlMarquee = {
  id: 'html-marquee',
  title: 'HTML Marquee - Scrolling Text (Deprecated)',
  description: 'Learn about the marquee tag for scrolling text, though it is deprecated and CSS alternatives are recommended',
  content: `
# HTML Marquee — Scrolling Text (Deprecated)

The \`<marquee>\` tag creates scrolling text or images. **Note: This tag is deprecated** and should not be used in modern web development. However, it's still supported by browsers for legacy reasons.

---

## ⚠️ Important: Marquee is Deprecated

**The \`<marquee>\` tag is deprecated** (removed from HTML5 specification). Use CSS animations or JavaScript instead for modern websites.

**Why it's deprecated:**
- Poor accessibility
- Can't be paused by users
- Not semantic
- Better alternatives exist

---

## Basic Marquee Syntax

\`\`\`html
<marquee>This text scrolls</marquee>
\`\`\`

**Result:** Text scrolls horizontally from right to left

---

## Marquee Attributes

### Direction

\`\`\`html
<marquee direction="left">Scrolls left</marquee>
<marquee direction="right">Scrolls right</marquee>
<marquee direction="up">Scrolls up</marquee>
<marquee direction="down">Scrolls down</marquee>
\`\`\`

### Behavior

\`\`\`html
<marquee behavior="scroll">Continuous scroll</marquee>
<marquee behavior="slide">Slides in and stops</marquee>
<marquee behavior="alternate">Bounces back and forth</marquee>
\`\`\`

### Speed

\`\`\`html
<marquee scrollamount="10">Fast scroll</marquee>
<marquee scrollamount="2">Slow scroll</marquee>
\`\`\`

**\`scrollamount\`** - Pixels per scroll (higher = faster)

### Loop

\`\`\`html
<marquee loop="3">Scrolls 3 times then stops</marquee>
<marquee loop="infinite">Scrolls forever</marquee>
\`\`\`

### Width and Height

\`\`\`html
<marquee width="500" height="100">Scrolling text</marquee>
\`\`\`

---

## Complete Examples

### Horizontal Scrolling Text

\`\`\`html
<marquee direction="left" behavior="scroll" scrollamount="5">
    Welcome to our website! Special offers available now.
</marquee>
\`\`\`

### Vertical Scrolling Text

\`\`\`html
<marquee direction="up" height="100" behavior="scroll">
    <p>News Item 1</p>
    <p>News Item 2</p>
    <p>News Item 3</p>
</marquee>
\`\`\`

### Bouncing Text

\`\`\`html
<marquee behavior="alternate" direction="left">
    This text bounces back and forth
</marquee>
\`\`\`

### Scrolling Images

\`\`\`html
<marquee direction="left" scrollamount="3">
    <img src="image1.jpg" alt="Image 1">
    <img src="image2.jpg" alt="Image 2">
    <img src="image3.jpg" alt="Image 3">
</marquee>
\`\`\`

---

## Modern CSS Alternative (Recommended)

Instead of \`<marquee>\`, use CSS animations:

\`\`\`html
<style>
    .scrolling-text {
        white-space: nowrap;
        overflow: hidden;
        animation: scroll 10s linear infinite;
    }
    
    @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
</style>

<div class="scrolling-text">
    This text scrolls using CSS animation
</div>
\`\`\`

**Benefits:**
- ✅ Modern standard
- ✅ Better performance
- ✅ Can be paused with CSS
- ✅ More control
- ✅ Accessible

---

## JavaScript Alternative

\`\`\`html
<div id="scrolling-text">Scrolling text content</div>

<script>
    function scrollText() {
        const element = document.getElementById('scrolling-text');
        element.style.transform = 'translateX(-100%)';
    }
    // Add animation logic
</script>
\`\`\`

---

## When Marquee Was Used (Historical Context)

**Old websites (1990s-2000s) used marquee for:**
- News tickers
- Announcements
- Stock prices
- Breaking news
- Advertisements

**Modern websites avoid it because:**
- Poor user experience
- Accessibility issues
- Not professional
- Better alternatives exist

---

## Best Practices (If You Must Use It)

1. **Don't use it** - Use CSS/JavaScript instead
2. **If legacy support needed:**
   - Keep it simple
   - Don't use for important content
   - Provide alternative static version
   - Test accessibility

---

## Summary

**Marquee Tag:**
- ⚠️ **Deprecated** - Don't use in new projects
- ✅ Still works in browsers (legacy support)
- ❌ Poor accessibility
- ❌ Not semantic

**Attributes:**
- ✅ \`direction\` - left, right, up, down
- ✅ \`behavior\` - scroll, slide, alternate
- ✅ \`scrollamount\` - Speed
- ✅ \`loop\` - Number of times

**Modern Alternatives:**
- ✅ CSS animations
- ✅ JavaScript
- ✅ Better UX and accessibility

**Recommendation:** Use CSS animations or JavaScript instead of marquee!
`,
  code: `// HTML Marquee (Deprecated)

/*
 * MARQUEE IS DEPRECATED
 * =====================
 * 
 * Use CSS animations or JavaScript instead
 */

// ============================================
// 1. BASIC MARQUEE
// ============================================
/*
<marquee>Scrolling text</marquee>
  ⚠️ DEPRECATED - Don't use in new projects
*/

// ============================================
// 2. MARQUEE ATTRIBUTES
// ============================================
/*
DIRECTION:
  <marquee direction="left">Left</marquee>
  <marquee direction="right">Right</marquee>
  <marquee direction="up">Up</marquee>
  <marquee direction="down">Down</marquee>

BEHAVIOR:
  <marquee behavior="scroll">Continuous</marquee>
  <marquee behavior="slide">Slides and stops</marquee>
  <marquee behavior="alternate">Bounces</marquee>

SPEED:
  <marquee scrollamount="10">Fast</marquee>
  <marquee scrollamount="2">Slow</marquee>

LOOP:
  <marquee loop="3">3 times</marquee>
  <marquee loop="infinite">Forever</marquee>
*/

// ============================================
// 3. MODERN CSS ALTERNATIVE
// ============================================
/*
<style>
    .scrolling {
        animation: scroll 10s linear infinite;
    }
    @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
</style>
<div class="scrolling">Text</div>
  ✅ Use this instead of marquee
*/

// ============================================
// 4. WHY DEPRECATED
// ============================================
/*
❌ Poor accessibility
❌ Can't be paused
❌ Not semantic
❌ Better alternatives exist (CSS/JS)
*/
`
};

export default htmlMarquee;


