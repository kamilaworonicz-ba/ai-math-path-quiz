# What Kind of Math Learner Are You?

A responsive, interactive quiz concept for adult learners. The experience segments users by motivation and life context, adds three low-stakes reasoning challenges, and recommends a personalized learning path.

## Why this project exists

The prototype demonstrates how interactive content can turn broad audience insight into a useful next step:

`attitude + context + goals + challenge signals → personalized path → content recommendations → email CTA`

It is designed for adults who may want practical skills, statistical literacy, help supporting a child, enjoyable mental challenges, or a more confident relationship with math.

## The five paths

- The Curious Explorer
- The Practical Thinker
- The Data Decoder
- The Math Parent
- The Confidence Builder

The first four questions drive the main recommendation. The three puzzles add a short, non-judgmental observation about pattern recognition, logical reasoning, and visual intuition. They are not presented as a math score.

## Prototype scope

- Fully responsive single-page experience
- Keyboard-friendly controls and clear focus states
- Maximum of two selections for the motivation question
- Point-based segmentation across five paths
- Personalized result explanation and challenge snapshot
- Three illustrative content concepts per path
- Simulated email confirmation state

The recommended resources are illustrative content concepts created to demonstrate personalization logic. The email form is also a portfolio simulation: no address is stored or sent.

## Run locally

No installation or build step is required. Open `dist/index.html` in a browser, or serve the folder with any static server.

## GitHub Pages

The included workflow publishes the `dist` folder. After pushing this repository to GitHub, enable **Pages → GitHub Actions** in the repository settings.

## Files

```text
dist/
  index.html
  styles.css
  script.js
.github/workflows/pages.yml
```
