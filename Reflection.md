- https://publicportfolio-778203283651.us-central1.run.app/
- Developed Site on Cursor

Intro

- For my site, I used Cursor to build my personal website, and it completely changed the way I think about projects because I am more of a software developer who tends to stay away from AI for plagiarism purposes. I expected AI to be limited to autocomplete or simple debugging help because that is what I usually used it for. All I did was prompt the engineer in the Cursor, then connect my GitHub repository, linked it to Cloud Build, and selected the Dockerfile to deploy the project.

AI as a Tool

- What surprised me most was how complete, easy, and quick the process felt. I was used to starting from an empty folder, setting up environments, installing dependencies, and building each component manually, with limited AI support for debugging. With Cursor, I described what I wanted, and it built the initial structure in seconds. It handled React setup, Flask backend configuration, and Docker deployment without me typing ANY line. I did not expect AI to manage both the frontend and backend so fluidly, since I was used to ChatGPT and its simple coding style, and then, for more complex requirements, it would just break down.
- AI was most helpful when I needed structure fast —and, honestly, when I needed to finish the project quickly. It handled project setup, routing, and UI scaffolding efficiently. Cursor created all necessary files and layouts using Tailwind while maintaining functional routing in Flask. It also saved me hours when setting up Cloud Build and containerization, since I could connect it to a GitHub repo. When I ran into deployment errors, AI explained them clearly, offered solutions, and built them into my files, which worked.
- AI was least helpful when the issue required understanding intent and how the website needed to be built. It often fixed syntax errors correctly but ignored design logic, keeping it simple. When layouts broke or components didn’t render, it provided generic fixes, so it took a lot of prompt engineering. I realized AI works best with precision, not assumptions.
- Still, AI did not replace core development skills. I needed to understand logic flow, data management, and system design, as well as the business needs. AI wrote functional code, but it lacked architectural sense because it made bad assumptions or never made any. It did not know when to modularize, how to balance performance, or why one design decision made more sense than another. I had to guide those choices. I also needed to verify security, test endpoints, and manage deployments manually, including troubleshooting Dockerfile issues. AI provided code, but judgment stayed human.

About My Process

- Breaking the project into prompts was key — and the source of my annoyance — because it became apparent how crucial prompt engineering is, since AI needs precision. I started with a general command: “Build a personal portfolio website.” Once Cursor generated a foundation, I divided the work into smaller prompts to get all the requirements:
- Add navigation with links to About, Projects, and Contact.
- Build responsive project cards using Tailwind.
- Create Flask routes for data retrieval and form handling.
- Write a Dockerfile for containerized deployment to Cloud Run.
  Each short, specific prompt gave more accurate results than broad ones. I learned to write prompts like code comments, clear, technical, and outcome-focused.
- I evaluated AI-generated code by testing and refreshing site. I ran everything locally, checked browser outputs, and confirmed API responses. I also reviewed syntax, structure, and naming conventions by running it through ChatGPT. AI often repeated logic across files, so I consolidated functions and removed unused imports.
- As I gained confidence, I began editing AI’s code directly instead of regenerating it. This made collaboration smoother and avoided overwriting progress. I also learned the importance of version control. Cursor sometimes replaced working code, so I used Git commits to track each change.
- What I would do differently in another AI-assisted project is plan prompts as milestones. Setup, frontend, backend, testing, and deployment would each have focused prompt lists. I would also integrate AI into documentation from the start.
