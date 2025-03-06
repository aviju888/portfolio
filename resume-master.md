# Personal Portfolio Master Content File

This document serves as the single source of truth for all content on your personal portfolio website. Update this file whenever you want to change content across the site, then reference it when making website updates.

## Personal Information

```yaml
name: Adriel Vijuan
title: Student & Developer
email: avijuan@berkeley.edu
location: Berkeley, CA
github: https://github.com/aviju888
linkedin: https://linkedin.com/in/adriel-vijuan
```

## Short Bio (For Homepage)

```
4th-year UC Berkeley student studying EECS with a passion for AI, software development, and creative expression through photography & design.
```

## About Me (Full Version)

```
Hi, I'm Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.

Over the years, I've done work in AI/ML, front-end development, and computational photography. Whether I'm fine-tuning a diffusion model, leading a team, or capturing moments through photography, I'm constantly seeking to blend logic with creativity.

Above all, I find myself to be a person with a true passion for learning. You'll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
```

## Education

```yaml
- institution: University of California, Berkeley
  degree: B.S. Electrical Engineering and Computer Sciences
  minor: Data Science
  dates: 2021 - 2025
  relevant_coursework:
    - CS 61A/B/C: Structure and Interpretation of Computer Programs
    - CS 70: Discrete Mathematics and Probability Theory
    - CS 170: Efficient Algorithms and Intractable Problems
    - CS 188: Introduction to Artificial Intelligence
    - DATA 100: Principles and Techniques of Data Science
```

## Software Skills

### Programming Languages
```yaml
- name: TypeScript
  icon: 🟦
  proficiency: Advanced

- name: Python
  icon: 🐍
  proficiency: Expert

- name: Java
  icon: ☕
  proficiency: Advanced

- name: C/C++
  icon: ⚙️
  proficiency: Advanced

- name: SQL
  icon: 🗃️
  proficiency: Intermediate

```

### Frameworks & Libraries
```yaml
- name: React
  icon: ⚛️
  proficiency: Advanced

- name: Next.js
  icon: ▲
  proficiency: Advanced

- name: PyTorch
  icon: 🔥
  proficiency: Advanced

- name: TensorFlow
  icon: 📊
  proficiency: Intermediate


```

### Tools & Technologies
```yaml
- name: Git
  icon: 📝
  proficiency: Advanced

- name: Docker
  icon: 🐳
  proficiency: Advanced

- name: AWS
  icon: ☁️
  proficiency: Intermediate

- name: CI/CD
  icon: 🔄
  proficiency: Intermediate
```

## Creative Skills

### Photography
```yaml
- name: Event Photography
  icon: 📸
  proficiency: Expert

- name: Portrait Photography
  icon: 👤
  proficiency: Advanced

- name: Studio Lighting
  icon: 💡
  proficiency: Advanced

- name: Composition
  icon: 🖼️
  proficiency: Expert

- name: Post-Processing
  icon: 🖌️
  proficiency: Advanced

- name: Photo Direction
  icon: 👉
  proficiency: Intermediate
```

### Videography
```yaml
- name: Cinematography
  icon: 🎬
  proficiency: Advanced

- name: Video Editing
  icon: ✂️
  proficiency: Advanced

- name: Color Grading
  icon: 🎨
  proficiency: Intermediate

- name: Motion Graphics
  icon: ✨
  proficiency: Intermediate

- name: Sound Design
  icon: 🔊
  proficiency: Intermediate

- name: Storytelling
  icon: 📖
  proficiency: Advanced
```

### Design
```yaml
- name: UI/UX Design
  icon: 📱
  proficiency: Advanced

- name: Graphic Design
  icon: 🎭
  proficiency: Advanced

- name: Typography
  icon: 🔤
  proficiency: Intermediate

- name: Brand Identity
  icon: 🏷️
  proficiency: Advanced

- name: Adobe Suite
  icon: 🅰️
  proficiency: Advanced

```

### Leadership
```yaml
- name: Team Management
  icon: 👥
  proficiency: Advanced

- name: Project Planning
  icon: 📋
  proficiency: Advanced

- name: Creative Direction
  icon: 🎯
  proficiency: Advanced

- name: Client Relations
  icon: 🤝
  proficiency: Intermediate

- name: Workshop Facilitation
  icon: 🧠
  proficiency: Intermediate

- name: Mentorship
  icon: 🌱
  proficiency: Advanced
```

## Work Experience

```yaml
- company: Tech Company XYZ
  position: Software Engineering Intern
  location: San Francisco, CA
  dates: May 2023 - August 2023
  description: |
    • Developed and maintained features for a React-based web application used by over 100,000 users
    • Implemented data visualization components using D3.js, increasing user engagement by 40%
    • Collaborated with a team of 5 engineers to redesign the authentication system
    • Optimized database queries, reducing load times by 30%

- company: AI Research Lab
  position: Research Assistant
  location: Berkeley, CA
  dates: January 2022 - December 2022
  description: |
    • Assisted in developing novel computer vision algorithms for object detection
    • Implemented and trained neural networks using PyTorch on large datasets
    • Co-authored a research paper accepted at a major conference
    • Built data processing pipelines that improved training efficiency by 25%

- company: Student Design Collective
  position: Lead Designer
  location: Berkeley, CA
  dates: August 2021 - May 2022
  description: |
    • Led a team of 10 student designers creating marketing materials for campus organizations
    • Managed client relationships and project timelines for 15+ simultaneous projects
    • Designed brand identities and visual systems for student startups and clubs
    • Organized workshops to teach design principles and software to new members
```

## Software Projects

```yaml
- title: Asthma Prevalence and Air Quality Index Analysis
  description: Research project investigating correlation between air quality and asthma rates in children.
  technologies: [R, R Markdown, Statistical Analysis, Data Visualization]
  link: https://github.com/yourusername/asthma-aqi-analysis
  image: /images/projects/asthma-aqi-analysis.png
  featured: true
  details: |
    Investigated the correlation between air quality (AQI levels) and asthma rates among children aged 0-17 in California using data from the California Department of Public Health and American Lung Association.
    
    Key aspects include:
    • Performed linear regression analysis to assess AQI impact on asthma prevalence
    • Conducted thorough regression diagnostics including residual plots and QQ plots
    • Identified significant positive correlation between high AQI levels and increased asthma rates
    • Provided evidence supporting the need for improved air quality to protect children's health

- title: Colorizing Prokudin-Gorskii Photo Collection
  description: CS 180 project to automatically align and colorize historical grayscale images.
  technologies: [Python, OpenCV, scikit-image, NumPy, Matplotlib]
  link: https://github.com/yourusername/colorizing-historical-photos
  image: /images/projects/colorizing-photos.png
  featured: true
  details: |
    Developed an automated system to align and colorize historical grayscale images from the Prokudin-Gorskii collection by combining three color channel images.
    
    Key features include:
    • Implemented single-scale and multi-scale pyramid alignment techniques
    • Utilized Delaunay triangulation for precise channel alignment
    • Applied contrast stretching and white balance adjustments for enhanced quality
    • Optimized algorithms to handle images of various sizes (from <1MB to >50MB)

- title: 61CPU Project
  description: Designed and implemented a 5-stage pipelined CPU for the RISC-V instruction set architecture.
  technologies: [Logisim, Assembly, Git, Computer Architecture]
  link: https://github.com/yourusername/61cpu-project
  image: /images/projects/61cpu-project.png
  featured: false
  details: |
    Designed and implemented a functional 5-stage pipelined CPU capable of executing a subset of the RISC-V instruction set architecture as part of CS 61C: Great Ideas in Computer Architecture.
    
    Key accomplishments include:
    • Created detailed datapath with ALUs, registers, and control units
    • Implemented hazard detection units and forwarding paths to reduce pipeline stalls
    • Developed test benches to verify CPU functionality with various instruction sequences
    • Managed complex control flow instructions and resolved pipeline hazards
```

## Creative Projects

```yaml
- title: Urban Perspectives
  category: Photography
  description: A street photography series exploring urban architecture and human interaction.
  techniques: [Street Photography, Composition, Black & White Processing]
  link: https://yourportfolio.com/urban-perspectives
  image: /images/projects/urban-perspectives.jpg
  featured: true
  details: |
    A photographic exploration of city landscapes and the people who inhabit them. This series focuses on finding geometric patterns and moments of humanity within urban environments.
    
    The project spanned 12 months across multiple cities, resulting in a collection of 40 final images that were exhibited at a local gallery.

- title: Brand Identity - Startup X
  category: Design
  description: Complete brand identity design for a tech startup.
  techniques: [Brand Strategy, Logo Design, Typography, Color Theory]
  link: https://yourportfolio.com/startup-x-branding
  image: /images/projects/startup-x-branding.jpg
  featured: true
  details: |
    Developed a comprehensive brand identity for a technology startup, including logo design, typography system, color palette, and application guidelines.
    
    The process involved stakeholder interviews, market analysis, multiple design iterations, and final production of brand assets.

- title: "Connections" - Short Film
  category: Videography
  description: A 5-minute short film exploring human connections in the digital age.
  techniques: [Cinematography, Directing, Video Editing, Color Grading]
  link: https://vimeo.com/yourprofile/connections
  image: /images/projects/connections-film.jpg
  featured: false
  details: |
    Wrote, directed, and edited a short narrative film examining how technology shapes human relationships. The production involved a small crew, multiple locations, and a week of shooting.
    
    The film was selected for screening at two student film festivals and received an award for cinematography.
```

## Creative Process Steps

```yaml
- title: Ideation & Concept
  description: Developing creative concepts based on project goals and target audience.
  icon: 💡

- title: Planning & Pre-production
  description: Detailed planning of resources, timeline, and technical requirements.
  icon: 📋

- title: Creation & Development
  description: Bringing ideas to life with technical expertise and creative execution.
  icon: 🎨

- title: Refinement & Feedback
  description: Iterative improvements based on client feedback and creative vision.
  icon: 🔄

- title: Finalization & Delivery
  description: Polishing the final product and preparing deliverables for various platforms.
  icon: ✅
```

## Testimonials

```yaml
- name: Jane Smith
  position: Product Manager at Tech Company
  image: /images/testimonials/jane-smith.jpg
  text: "Adriel's attention to detail and technical expertise made our project a tremendous success. His ability to understand complex requirements and translate them into elegant solutions is truly exceptional."

- name: John Doe
  position: Creative Director at Design Studio
  image: /images/testimonials/john-doe.jpg
  text: "Working with Adriel on our brand redesign was a fantastic experience. His creative vision, combined with his methodical approach to design challenges, resulted in a brand identity that perfectly captures our values."

- name: Sarah Johnson
  position: Lead Developer at Software Startup
  image: /images/testimonials/sarah-johnson.jpg
  text: "Adriel's contributions to our codebase raised the bar for our entire team. He not only writes clean, efficient code but also helps others improve their skills through thoughtful mentorship and documentation."
```

## Domains (Homepage Categories)

```yaml
- id: software
  title: Software Engineering
  gradient: from-blue-500 to-cyan-500
  description: Exploring ML, computer vision, and web development projects.

- id: creative
  title: Creative Work
  gradient: from-pink-500 to-purple-500
  description: Photography, videography, and design projects.

- id: about
  title: About Me
  gradient: from-white/20 to-white/10
  description: Learn more about my background, skills, and interests.
```

## Contact Information

```yaml
email: avijuan@berkeley.edu
linkedin: https://linkedin.com/in/yourprofile
github: https://github.com/yourusername
instagram: https://instagram.com/yourhandle
```

## Resume File

```yaml
file_path: /files/Adriel_Vijuan_Resume.pdf
last_updated: 2023-11-15
```

## Site Metadata

```yaml
site_title: Adriel Vijuan | Student & Developer
site_description: Portfolio of Adriel Vijuan, a UC Berkeley EECS student specializing in AI, software development, and creative design.
site_keywords: software engineer, AI, machine learning, photography, design, UC Berkeley, EECS, portfolio
``` 