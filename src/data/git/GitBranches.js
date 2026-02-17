const gitBranches = {
  id: 'git-branches',
  title: 'Git Branches - Working with Branches',
  description: 'Learn how to create, switch, merge, and delete branches. Understand branching strategy for collaborative development.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'Git Basics',
  content: `
# Git Branches - Working with Branches

Branches are one of Git's most powerful features. They let you work on different features or experiments without affecting your main code. Think of branches as parallel universes for your code.

## What is a Branch?

A **branch** is like a separate timeline for your code. You can create a branch to:
- Work on a new feature
- Fix a bug
- Experiment with new ideas
- Work on different versions

All without affecting your main code!

## Why Use Branches?

**Without branches:**
- You're afraid to experiment (might break working code)
- Can't work on multiple features at once
- Hard to collaborate with others
- Risky to make changes

**With branches:**
- Experiment safely
- Work on multiple features simultaneously
- Easy collaboration
- Isolated changes

---

## Understanding the Main Branch

When you initialize a Git repository, you automatically get a **main** branch (or **master** in older Git versions). This is your primary branch - usually where your stable, working code lives.

---

## Creating Your First Branch

Let's create a branch to work on a new feature:

\`\`\`bash
git branch feature-login
\`\`\`

This creates a new branch called \`feature-login\` but doesn't switch to it yet.

**List all branches:**
\`\`\`bash
git branch
\`\`\`

**Output:**
\`\`\`
  feature-login
* main
\`\`\`

The \`*\` shows you're currently on the \`main\` branch.

---

## Switching Between Branches

To switch to your new branch:

\`\`\`bash
git checkout feature-login
\`\`\`

**Or use the newer command:**
\`\`\`bash
git switch feature-login
\`\`\`

**Check which branch you're on:**
\`\`\`bash
git branch
\`\`\`

**Output:**
\`\`\`
* feature-login
  main
\`\`\`

Now you're on \`feature-login\`!

---

## Creating and Switching in One Command

You can create and switch to a branch at the same time:

\`\`\`bash
git checkout -b feature-login
\`\`\`

**Or:**
\`\`\`bash
git switch -c feature-login
\`\`\`

---

## Working on a Branch

Now you can make changes safely:

\`\`\`bash
# Create a new file for login feature
echo 'public class LoginService {
    public boolean authenticate(String username, String password) {
        // Login logic here
        return true;
    }
}' > LoginService.java

# Stage and commit
git add LoginService.java
git commit -m "Add LoginService class"
\`\`\`

These changes are **only on the feature-login branch**, not on main!

---

## Viewing Branch History

See commits on current branch:

\`\`\`bash
git log --oneline
\`\`\`

**See all branches:**
\`\`\`bash
git log --oneline --all --graph
\`\`\`

This shows a visual representation of all branches.

---

## Merging Branches

Once your feature is complete, you want to merge it back into main:

### Step 1: Switch to Main Branch

\`\`\`bash
git switch main
\`\`\`

### Step 2: Merge the Feature Branch

\`\`\`bash
git merge feature-login
\`\`\`

**Output:**
\`\`\`
Updating abc1234..def5678
Fast-forward
 LoginService.java | 5 +++++
 1 file changed, 5 insertions(+)
 create mode 100644 LoginService.java
\`\`\`

Your feature is now in main! 🎉

---

## Deleting Branches

After merging, you can delete the feature branch:

\`\`\`bash
git branch -d feature-login
\`\`\`

**Force delete (if not merged):**
\`\`\`bash
git branch -D feature-login
\`\`\`

---

## Common Branching Workflow

Here's a typical workflow:

\`\`\`bash
# Start on main
git checkout main

# Create feature branch
git checkout -b feature-user-profile

# Work on feature
# ... make changes ...
git add .
git commit -m "Add user profile page"

# More work
# ... make changes ...
git add .
git commit -m "Add profile picture upload"

# Switch back to main
git checkout main

# Merge feature
git merge feature-user-profile

# Delete feature branch
git branch -d feature-user-profile
\`\`\`

---

## Branch Naming Conventions

Good branch names are descriptive:

**Good examples:**
- \`feature-user-login\`
- \`bugfix-payment-error\`
- \`hotfix-security-patch\`
- \`experiment-new-algorithm\`

**Bad examples (avoid these):**
- \`branch1\`
- \`test\`
- \`new-feature\`
- \`fix\`

---

## Real-World Example: Java Web Application

Let's say you're building an e-commerce site:

\`\`\`bash
# Main branch has working code
git checkout main

# Create branch for shopping cart feature
git checkout -b feature-shopping-cart

# Work on shopping cart
# ... create Cart.java, CartServlet.java ...
git add .
git commit -m "Add shopping cart functionality"

# Create branch for payment (from main)
git checkout main
git checkout -b feature-payment

# Work on payment
# ... create PaymentService.java ...
git add .
git commit -m "Add payment processing"

# Merge shopping cart
git checkout main
git merge feature-shopping-cart

# Merge payment
git merge feature-payment

# Clean up
git branch -d feature-shopping-cart
git branch -d feature-payment
\`\`\`

---

## Branch Commands Summary

| Command | Purpose |
|---------|---------|
| \`git branch\` | List all branches |
| \`git branch <name>\` | Create a branch |
| \`git checkout <name>\` | Switch to branch |
| \`git switch <name>\` | Switch to branch (newer) |
| \`git checkout -b <name>\` | Create and switch |
| \`git switch -c <name>\` | Create and switch (newer) |
| \`git merge <name>\` | Merge branch into current |
| \`git branch -d <name>\` | Delete branch |
| \`git branch -D <name>\` | Force delete branch |

---

## Best Practices

1. **Keep main stable**: Only merge working, tested code
2. **Use descriptive names**: Know what each branch is for
3. **Delete merged branches**: Keep your branch list clean
4. **One feature per branch**: Don't mix multiple features
5. **Merge often**: Don't let branches get too far behind main

---

## Summary

You've learned:
- What branches are and why they're useful
- How to create and switch branches
- How to merge branches
- How to delete branches
- Best practices for branching

**Next Steps:**
- Learn about remote repositories (GitHub)
- Understand pull requests
- Learn advanced merging strategies

Branches are essential for professional development - master them!
`
};

export default gitBranches;

