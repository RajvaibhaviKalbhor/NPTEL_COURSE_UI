# NPTEL Self-Paced Course Demo

A frontend-only, responsive demonstration based on the screenshots supplied for the NPTEL Self-Paced Course page. It is not an official NPTEL portal and has no authentication, backend, exam registration, payment, or certificate verification.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Project structure

```text
src/
  data/course.js      Mock course and completion data
  main.jsx            Application and reusable interface components
  styles.css          Responsive portal styling
index.html
package.json
```

Course title, instructor, course dates, module counts, assignment progress, and exam completion status come from the supplied references and task instructions. Personal identifiers, exam scores, and certificate numbers are not included. No actual student certificate file was provided, so the View Certificate action opens a clearly labeled demo placeholder.
