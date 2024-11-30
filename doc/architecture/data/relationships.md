# Data Model Relationships and Constraints

## Overview

This document details the relationships between data models and the constraints that ensure data integrity in the Portfolio App.

## Relationships overview

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

## Constraints overview

### Projects

- Must have a unique ID
- Must have at least one technology
- Featured projects must have a thumbnail

### Skills

- Level must be between 0 and 100
- Years of experience must be positive
- Featured skills must have an icon

### Experiences

- Start date must be before end date (if end date exists)
- Must have at least one achievement

## Relationships

### Project Relationships

1. **Project → Technology**
   - One-to-many relationship
   - Each project can use multiple technologies
   - Technologies must exist in the system

2. **Project → Screenshot**
   - One-to-many relationship
   - Each project can have multiple screenshots
   - At least one screenshot must be marked as thumbnail

3. **Project → Link**
   - One-to-many relationship
   - Optional links to GitHub, live demo, etc.

### Skill Relationships

1. **Skill → SkillGroup**
   - Many-to-many relationship
   - Skills can belong to multiple groups
   - Groups can contain multiple skills

2. **Skill → Certification**
   - One-to-many relationship
   - Skills can have multiple certifications
   - Certifications are optional

### Experience Relationships

1. **Experience → Project**
   - One-to-many relationship
   - Experiences can include multiple projects
   - Projects can be referenced by multiple experiences

2. **Experience → Technology**
   - One-to-many relationship
   - Each experience can utilize multiple technologies

## Constraints

### Project Constraints

1. **ID Uniqueness**
   - Project IDs must be unique across the system
   - Format: lowercase alphanumeric with hyphens

2. **Required Fields**
   - Title, shortDescription, and category are required
   - At least one technology must be specified
   - Featured projects must have a thumbnail image

3. **Date Validation**
   - Start date must be valid ISO date string
   - End date must be after start date if specified

### Skill Constraints

1. **Level Range**
   - Skill level must be between 0 and 100
   - Level should represent current proficiency

2. **Experience Validation**
   - Years of experience must be positive number
   - Cannot exceed current year minus first use year

3. **Featured Skills**
   - Featured skills must have an icon
   - Featured skills must have a description

### Experience Constraints

1. **Date Validation**
   - Start date is required
   - End date must be after start date if specified
   - Dates must be valid ISO strings

2. **Required Fields**
   - Company, role, and description are required
   - At least one achievement must be specified
   - Location and type are required

3. **Project References**
   - Referenced projects must exist in the system
   - Circular references are not allowed

## Data Validation

All data validation is performed at multiple levels:

1. Frontend form validation
2. Service layer validation
3. Database constraints
4. TypeScript type checking

## Error Handling

Data validation errors should:

1. Provide specific error messages
2. Indicate which constraint was violated
3. Suggest corrective action
