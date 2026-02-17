const gitWorkflow = {
  id: 'git-workflow',
  title: 'Git Workflow - Best Practices',
  description: 'Learn professional Git workflows including feature branch workflow, Git Flow, and collaboration best practices.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Git Workflow - Best Practices

A good Git workflow helps teams work together smoothly. Let's learn the most common workflows used in professional development.

---

## Feature Branch Workflow

This is the most common workflow. Perfect for small to medium teams.

### How It Works:

1. **Main branch** = Production-ready code
2. **Feature branches** = New features being developed
3. **Pull Requests** = Code review before merging

### Workflow Steps:

\`\`\`bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature-user-profile

# 3. Work on feature
# ... make changes ...
git add .
git commit -m "Add user profile page"

# 4. Push branch
git push -u origin feature-user-profile

# 5. Create Pull Request on GitHub
# 6. Get code review
# 7. Address feedback
git add .
git commit -m "Fix PR feedback"
git push

# 8. After approval, merge on GitHub
# 9. Update local main
git checkout main
git pull origin main
git branch -d feature-user-profile
\`\`\`

**Benefits:**
- Simple and easy to understand
- Good for most projects
- Clear separation of features

---

## Git Flow Workflow

More structured workflow for larger projects with releases.

### Branch Types:

- **main**: Production code
- **develop**: Integration branch
- **feature/**: New features
- **release/**: Preparing releases
- **hotfix/**: Urgent production fixes

### Workflow:

\`\`\`bash
# Feature development
git checkout develop
git checkout -b feature/shopping-cart
# ... work on feature ...
git checkout develop
git merge feature/shopping-cart

# Release preparation
git checkout -b release/1.0.0
# ... fix bugs, update version ...
git checkout main
git merge release/1.0.0
git tag v1.0.0

# Hotfix (urgent production fix)
git checkout main
git checkout -b hotfix/payment-bug
# ... fix bug ...
git checkout main
git merge hotfix/payment-bug
git checkout develop
git merge hotfix/payment-bug
\`\`\`

**When to use:**
- Large projects
- Regular releases
- Need for versioning

---

## Forking Workflow

Common for open source projects.

### How It Works:

1. **Fork** the original repository (creates your copy)
2. **Clone** your fork
3. **Work** on your fork
4. **Pull Request** to original repository

### Workflow:

\`\`\`bash
# 1. Fork repository on GitHub (click Fork button)

# 2. Clone your fork
git clone https://github.com/yourusername/project.git

# 3. Add original as upstream
git remote add upstream https://github.com/originalowner/project.git

# 4. Create feature branch
git checkout -b feature-new-feature

# 5. Work and commit
git add .
git commit -m "Add new feature"

# 6. Push to your fork
git push -u origin feature-new-feature

# 7. Create PR to original repository

# 8. Keep your fork updated
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
\`\`\`

**When to use:**
- Contributing to open source
- You don't have write access
- Want to experiment freely

---

## Daily Workflow Example

Here's what a typical day looks like:

### Morning: Start Work

\`\`\`bash
# Get latest code
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-product-search
\`\`\`

### During Day: Make Changes

\`\`\`bash
# Make changes
# ... write code ...

# Commit frequently
git add .
git commit -m "Add search input field"

# More changes
git add .
git commit -m "Implement search functionality"

# Push to backup
git push
\`\`\`

### End of Day: Wrap Up

\`\`\`bash
# Push final changes
git push

# Create Pull Request on GitHub
# (Or continue tomorrow)
\`\`\`

---

## Commit Message Best Practices

Good commit messages help everyone understand changes:

### Format:

\`\`\`bash
git commit -m "Type: Short description

Longer explanation if needed
- What changed
- Why it changed
- Any breaking changes"
\`\`\`

### Types:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code restructuring
- **test**: Adding tests
- **chore**: Maintenance

### Examples:

**Good commit messages:**
\`\`\`bash
git commit -m "feat: Add user login functionality

- Implement LoginService class
- Add authentication endpoint
- Include unit tests"
\`\`\`

**Bad commit messages (avoid these):**
\`\`\`bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
\`\`\`

---

## Handling Merge Conflicts

When two people change the same code:

### Step 1: Pull Latest Changes

\`\`\`bash
git checkout main
git pull origin main
\`\`\`

### Step 2: Merge into Your Branch

\`\`\`bash
git checkout feature-your-branch
git merge main
\`\`\`

### Step 3: Resolve Conflicts

Git will show conflicts:
\`\`\`
<<<<<<< HEAD
Your code
=======
Their code
>>>>>>> main
\`\`\`

Edit the file to resolve:
- Keep your code?
- Keep their code?
- Combine both?
- Write new code?

### Step 4: Mark as Resolved

\`\`\`bash
git add conflicted-file.java
git commit -m "Resolve merge conflicts"
\`\`\`

---

## Real-World Java Project Example

Let's see a complete workflow for a Java web application:

\`\`\`bash
# Project: E-Commerce Application

# Day 1: Setup
git clone https://github.com/team/ecommerce.git
cd ecommerce
git checkout -b feature/product-catalog

# Day 2: Add Product Model
echo 'public class Product { }' > Product.java
git add Product.java
git commit -m "feat: Add Product model class"

# Day 3: Add Product Service
echo 'public class ProductService { }' > ProductService.java
git add ProductService.java
git commit -m "feat: Add ProductService for business logic"

# Day 4: Add Product Servlet
echo 'public class ProductServlet extends HttpServlet { }' > ProductServlet.java
git add ProductServlet.java
git commit -m "feat: Add ProductServlet for handling requests"

# Day 5: Push and Create PR
git push -u origin feature/product-catalog
# Create PR on GitHub

# Day 6: Address Review Feedback
# ... make changes ...
git add .
git commit -m "fix: Address PR feedback - improve error handling"
git push

# Day 7: After Merge
git checkout main
git pull origin main
git branch -d feature/product-catalog
\`\`\`

---

## Best Practices Summary

### 1. Commit Often
- Small, logical commits
- Easier to understand
- Easier to revert if needed

### 2. Write Good Messages
- Clear and descriptive
- Explain what and why
- Use conventional format

### 3. Use Branches
- One feature per branch
- Keep main stable
- Easy to experiment

### 4. Pull Before Push
- Get latest changes
- Avoid conflicts
- Stay in sync

### 5. Review Before Merging
- Use Pull Requests
- Get feedback
- Maintain quality

### 6. Keep Branches Clean
- Delete merged branches
- Regular cleanup
- Clear branch names

---

## Common Mistakes to Avoid

**Don't commit directly to main**
Instead, use feature branches

**Don't make large, infrequent commits**
Instead, make small, frequent commits

**Don't write vague commit messages**
Instead, write clear, descriptive messages

**Don't forget to pull before pushing**
Always pull first to get the latest changes

**Don't mix multiple features in one branch**
Keep one feature per branch

---

## Summary

You've learned:
- Feature Branch Workflow
- Git Flow Workflow
- Forking Workflow
- Daily workflow practices
- Commit message best practices
- Handling merge conflicts
- Common mistakes to avoid

**Next Steps:**
- Practice these workflows
- Find what works for your team
- Establish team conventions

A good workflow makes development smoother and more professional!
`
};

export default gitWorkflow;

