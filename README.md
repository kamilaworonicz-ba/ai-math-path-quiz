# What Kind of Math Learner Are You?

### Interactive Content & Growth Mini Case Study

`Status: Prototype` `Domain: EdTech / Content Growth`  
`Methods: Audience Segmentation / Personalization / Interactive Content / AI-Assisted Development`

A responsive, interactive quiz concept for adult learners. The experience combines audience segmentation with three low-stakes reasoning challenges to recommend a personalized learning path and relevant content.

The prototype was created as a lightweight **content-growth and lead-generation experiment**, using AI throughout the ideation and development process.

---

## 🎯 1. Why This Project Exists

The concept explores how interactive content can turn broad audience insight into a useful next step for the user.

`attitude + context + goals + challenge signals`  
→ `personalized path`  
→ `content recommendations`  
→ `email CTA`

The quiz is designed for adults who may want to:

- build practical math skills,
- understand statistics and data better,
- support a child with math,
- enjoy logical challenges,
- or feel more confident about learning math.

---

## 🧭 2. User Journey

The experience follows a short conversion-oriented path:

`Landing page`  
→ `Motivation & context questions`  
→ `3 reasoning challenges`  
→ `Personalized learning path`  
→ `Recommended content`  
→ `Email CTA`

The goal is to provide immediate value before asking the user to leave an email address.

---

## 🧩 3. The Five Learning Paths

The segmentation model includes five possible outcomes:

- **The Curious Explorer**
- **The Practical Thinker**
- **The Data Decoder**
- **The Math Parent**
- **The Confidence Builder**

The first four questions determine the main recommendation based on the user's motivation, goals and learning context.

---

## 🧠 4. Reasoning Challenges

The quiz includes three short, low-pressure challenges focused on:

- pattern recognition,
- logical reasoning,
- visual intuition.

The challenges are not presented as a math test or score.

Instead, the result adds a short observation such as:

> You seem to enjoy logic and pattern-based challenges more than calculation-heavy tasks.

This creates an additional layer of personalization without positioning the experience as an assessment of mathematical ability.

---

## 🛠️ 5. Prototype Scope

The current prototype includes:

- Fully responsive single-page experience
- Keyboard-friendly controls and visible focus states
- Maximum of two selections for the motivation question
- Point-based segmentation across five learning paths
- Personalized result explanation
- Challenge-based insight
- Three illustrative content concepts per path
- Simulated email confirmation state

The recommended resources are illustrative content concepts created to demonstrate personalization logic.

The email form is also a portfolio simulation — no email address is stored or sent.

---

## 🤖 6. AI-Assisted Development

AI was used as part of the project workflow, including:

- concept and interaction ideation,
- quiz structure development,
- segmentation logic,
- UX copy iteration,
- front-end implementation support,
- testing and refinement.

The final concept, user journey, segmentation approach and product decisions were reviewed and shaped manually.

---

## 🚀 7. Live Prototype

The quiz is available as a fully interactive GitHub Pages prototype.

➡️ **[Open the live quiz](https://kamilaworonicz-ba.github.io/ai-math-path-quiz/)**

No installation or account is required.

---

## 💻 8. Run Locally

No installation or build step is required.

Open:

`dist/index.html`

in a browser, or serve the `dist` folder using any static server.

---

## 📁 9. Repository Contents

```text
dist/
  index.html
  styles.css
  script.js

.github/
  workflows/
    pages.yml
