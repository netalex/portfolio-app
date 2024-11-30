## Data Model Relationships

### Project
- Each project can use multiple technologies
- Each project can have multiple screenshots
- Each project can have multiple links (github, live demo, etc.)
- Projects can be associated with one or more experiences

### Skill
- Skills belong to one or more skill groups
- Skills can have multiple certifications
- Skills are categorized (Frontend, Backend, etc.)
- Skills can be tagged as featured

### Experience
- Experiences can include multiple projects
- Experiences utilize multiple technologies
- Experiences can have achievements
- Experiences are typed (remote, onsite, hybrid)

## Constraints

### Projects
- Must have a unique ID
- Must have at least one technology
- Featured projects must have a thumbnail

### Skills
- Level must be between 0 and 100
- Years of experience must be positive
- Featured skills must have an icon

### Experience
- Start date must be before end date (if end date exists)
- Must have at least one achievement
