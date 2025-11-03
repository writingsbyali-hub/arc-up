# Content Editing Guide

A practical guide for editing content on the arc^ website using Astro's content collections system.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding Content Collections](#understanding-content-collections)
3. [Adding New Projects](#adding-new-projects)
4. [Editing Existing Content](#editing-existing-content)
5. [Frontmatter Reference](#frontmatter-reference)
6. [File Organization](#file-organization)
7. [Local Preview Workflow](#local-preview-workflow)
8. [Common Tasks](#common-tasks)

---

## Quick Start

**To add a new project:**

1. Navigate to `src/content/projects/`
2. Choose the appropriate pillar folder: `lab/`, `framework/`, or `commons/`
3. Create a new `.md` file (or copy `_template.md`)
4. Fill in the frontmatter fields
5. Write your content
6. Preview locally with `npm run dev`

**Example:**
```bash
# Create a new lab project
src/content/projects/lab/water/new-project.md
```

---

## Understanding Content Collections

Astro uses **content collections** to organize markdown files with type-safe frontmatter schemas.

### What is a Content Collection?

- A folder in `src/content/` that contains markdown files
- Each collection has a **schema** defined in `src/content/config.ts`
- The schema validates that all required fields are present
- Makes content type-safe and easier to query

### Our Collections

Currently, we have **one collection**:

- **`projects`**: Research projects organized by pillar and stream

---

## Adding New Projects

### Step 1: Choose Location

Projects are organized by **pillar** and **research stream**:

```
src/content/projects/
├── lab/              # Lab pillar projects
│   ├── physical/     # Physical plasma systems
│   ├── water/        # Plasma-water interface
│   └── ecosystem/    # Ecosystem sensing
├── framework/        # Framework pillar projects
│   ├── protocols/    # Protocols & standards
│   ├── governance/   # Governance models
│   └── validation/   # Validation & replication
└── commons/          # Commons pillar projects
    ├── data/         # Data infrastructure
    ├── visualization/ # Visualization tools
    └── modeling/     # Ecosystem modeling
```

### Step 2: Copy the Template

1. Open `src/content/projects/_template.md`
2. Copy the entire file
3. Create a new file in the appropriate location:
   ```
   src/content/projects/[pillar]/[stream]/your-project-name.md
   ```
4. Paste the template content

### Step 3: Fill in Frontmatter

The frontmatter is the section between `---` at the top of the file:

```markdown
---
title: "Your Project Title"
stream: "water"
pillar: "lab"
status: "forming"
tags: ["plasma", "water", "agriculture"]
skills: ["electrical engineering", "data analysis"]
updated: "2025-11"
lookingFor: "Electronics engineer with experience in high-voltage systems"
---
```

**Required fields:**
- `title`: Project name (string)
- `stream`: Research stream (must match one from schema)
- `pillar`: Which pillar (`lab`, `framework`, or `commons`)
- `status`: Project status (`active`, `forming`, `early-idea`, `concept`)
- `tags`: Array of keywords for filtering
- `skills`: Array of skills needed/used
- `updated`: Last update date (YYYY-MM or YYYY-MM-DD)

**Optional fields:**
- `lookingFor`: One sentence describing who you're looking for to help

### Step 4: Write Content

After the frontmatter, write your project description using markdown:

```markdown
---
# frontmatter here
---

## Overview

Brief description of the project...

## Current Status

What's happening now...

## Get Involved

How people can contribute...
```

### Step 5: Preview

Start the dev server to see your changes:

```bash
npm run dev
# Visit http://localhost:4321
```

Navigate to the projects page to see your new project listed.

---

## Editing Existing Content

1. **Find the file**: Navigate to `src/content/projects/[pillar]/[stream]/`
2. **Open the markdown file** in your editor
3. **Edit frontmatter or content**
4. **Save the file**
5. **Preview changes** with `npm run dev`

The dev server auto-reloads when you save changes.

---

## Frontmatter Reference

### Complete Field List

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | string | ✅ | Project name | `"Plasma-Activated Saltwater"` |
| `stream` | enum | ✅ | Research stream | `"water"` |
| `pillar` | enum | ✅ | Which pillar | `"lab"` |
| `status` | enum | ✅ | Project maturity | `"forming"` |
| `tags` | string[] | ✅ | Keywords for filtering | `["plasma", "water"]` |
| `skills` | string[] | ✅ | Skills needed/used | `["chemistry", "coding"]` |
| `updated` | string | ✅ | Last update date | `"2025-11"` or `"2025-11-03"` |
| `lookingFor` | string | ❌ | Who we're seeking | `"Chemist with soil analysis experience"` |

### Valid Stream Values

Must match one of these exactly:

- `physical` - Physical Plasma Systems
- `water` - Plasma-Water Interface
- `ecosystem` - Ecosystem Sensing
- `protocols` - Protocols & Standards
- `governance` - Governance Models
- `validation` - Validation & Replication
- `data` - Data Infrastructure
- `visualization` - Visualization Tools
- `modeling` - Ecosystem Modeling

### Valid Pillar Values

- `lab` - Lab pillar
- `framework` - Framework pillar
- `commons` - Commons pillar

### Valid Status Values

- `active` - Currently being worked on
- `forming` - Actively recruiting collaborators
- `early-idea` - Initial concept stage
- `concept` - Theoretical exploration

---

## File Organization

### Naming Conventions

**Use lowercase with hyphens:**
- ✅ `plasma-water-treatment.md`
- ✅ `soil-sensor-network.md`
- ❌ `Plasma Water Treatment.md`
- ❌ `soil_sensor_network.md`

**Be descriptive but concise:**
- ✅ `saltwater-irrigation.md`
- ❌ `project-1.md`
- ❌ `plasma-activated-water-for-agricultural-irrigation-systems.md`

### Folder Structure

Projects must be placed in the correct pillar and stream folders:

```
src/content/projects/
├── _template.md          # Template for new projects
├── _archive/             # Archived projects (not displayed)
├── lab/
│   ├── physical/
│   ├── water/
│   └── ecosystem/
├── framework/
│   ├── protocols/
│   ├── governance/
│   └── validation/
└── commons/
    ├── data/
    ├── visualization/
    └── modeling/
```

If a folder for your stream doesn't exist yet, create it!

---

## Local Preview Workflow

### 1. Start Dev Server

```bash
npm run dev
```

This starts a local server at `http://localhost:4321` with hot-reloading.

### 2. Make Changes

Edit any file in `src/content/projects/` and save.

### 3. Check Browser

Changes appear automatically in the browser (no refresh needed).

### 4. Check Console

Watch the terminal for any errors:

```bash
# Good - no errors
✓ Content collections built

# Bad - missing required field
✗ Error: Missing required field "stream" in project.md
```

### 5. Build for Production

Before pushing to GitHub:

```bash
npm run build
```

This validates all content and creates a production build.

---

## Common Tasks

### Task: Add a New Lab Project

```bash
# 1. Navigate to projects folder
cd src/content/projects/lab/water/

# 2. Create new file
touch my-new-project.md

# 3. Copy template content
# (open _template.md and copy)

# 4. Edit frontmatter
# Set pillar: "lab"
# Set stream: "water"
# Fill other fields

# 5. Write content below frontmatter

# 6. Preview
npm run dev
```

### Task: Update Project Status

1. Find the project file: `src/content/projects/lab/water/my-project.md`
2. Open in editor
3. Change `status: "forming"` to `status: "active"`
4. Update `updated: "2025-11"`
5. Save and preview

### Task: Archive a Project

1. Move file to `src/content/projects/_archive/`:
   ```bash
   mv src/content/projects/lab/water/old-project.md \
      src/content/projects/_archive/old-project.md
   ```
2. The project will no longer appear on the website

### Task: Add Tags to Existing Project

1. Open project file
2. Find the `tags` field:
   ```yaml
   tags: ["plasma", "water"]
   ```
3. Add new tags:
   ```yaml
   tags: ["plasma", "water", "agriculture", "open-hardware"]
   ```
4. Save and preview

### Task: Change Research Stream

If you need to move a project to a different stream:

1. Update the frontmatter `stream` field
2. Move the file to the new stream folder
3. Example:
   ```bash
   # Move from water to ecosystem stream
   mv src/content/projects/lab/water/sensors.md \
      src/content/projects/lab/ecosystem/sensors.md
   ```
4. Update frontmatter:
   ```yaml
   stream: "ecosystem"  # was "water"
   ```

---

## Markdown Formatting Tips

### Headings

```markdown
## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
```

Use `##` for main sections in your project content.

### Lists

**Unordered:**
```markdown
- Item one
- Item two
  - Nested item
```

**Ordered:**
```markdown
1. First step
2. Second step
3. Third step
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/about)
```

### Emphasis

```markdown
**Bold text**
*Italic text*
`Code or technical term`
```

### Code Blocks

````markdown
```python
def hello():
    print("Hello, arc^!")
```
````

### Images

Images should be placed in `src/assets/images/` first:

```markdown
![Alt text](~/assets/images/project-diagram.png)
```

---

## Schema Reference

The content schema is defined in `src/content/config.ts`:

```typescript
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    stream: z.enum([
      'physical', 'water', 'ecosystem',
      'protocols', 'governance', 'validation',
      'data', 'visualization', 'modeling',
    ]),
    pillar: z.enum(['lab', 'framework', 'commons']),
    status: z.enum(['active', 'forming', 'early-idea', 'concept']),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
    updated: z.string(),
    lookingFor: z.string().optional(),
  }),
});
```

This schema:
- **Validates** all frontmatter fields
- **Enforces** required fields
- **Restricts** stream/pillar/status to specific values
- **Ensures** type safety when querying content

If you violate the schema, Astro will show an error during build.

---

## Troubleshooting

### Error: "Missing required field"

**Problem:** You forgot to include a required frontmatter field.

**Solution:** Check the frontmatter reference and add the missing field.

### Error: "Invalid stream value"

**Problem:** The `stream` value doesn't match one from the schema.

**Solution:** Use one of the valid stream values listed in the schema reference.

### Content not showing up

**Problem:** Project isn't appearing on the website.

**Checklist:**
1. Is the file in the correct folder? (Not in `_archive`)
2. Does it have the `.md` extension?
3. Is the frontmatter valid?
4. Did you save the file?
5. Did you refresh the browser?

### Dev server not reloading

**Problem:** Changes aren't appearing automatically.

**Solution:**
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## Getting Help

- **Discord**: Ask in [community server](https://discord.com/invite/DA8BPA3VsN)
- **GitHub Issues**: Report bugs or suggest improvements
- **Documentation**: Check [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)

---

**Happy editing!** 🚀

This guide will evolve as the project grows. Feel free to suggest improvements.
