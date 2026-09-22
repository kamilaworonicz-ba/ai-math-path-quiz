# What Kind of Math Learner Are You?

A responsive, interactive quiz concept for adult learners. The experience segments users by motivation and life context, adds three low-stakes reasoning challenges, and recommends a personalized learning path.

## Why this project exists

This prototype was built as a companion piece to my [Digital Editorial Workflow System](LINK) case study, to demonstrate a different kind of content skill: designing a lightweight, personalized acquisition funnel rather than a long-form curriculum product.

It's modeled on the logic behind TripleTen's own career-path quiz ("Find the tech learning path that fits you best"), applied to a different audience and topic — adult learners deciding whether and how to re-engage with math. The goal was to show how interactive content can turn broad audience insight into a useful, personalized next step:

`attitude + context + goals + challenge signals → personalized path → content recommendations → email CTA`

It is designed for adults who may want practical skills, statistical literacy, help supporting a child, enjoyable mental challenges, or a more confident relationship with math.

## The five paths

- The Curious Explorer
- The Practical Thinker
- The Data Decoder
- The Math Parent
- The Confidence Builder

The first four questions drive the main recommendation. The three puzzles add a short, non-judgmental observation about pattern recognition, evidence-based reasoning, and visual intuition. They are not presented as a math score.

## How the segmentation works

Each answer adds points to one or more paths; the quiz recommends the path with the highest score at the end. A simplified example:

| Question | Signal | Path(s) it points to |
|---|---|---|
| "What pulls you toward math?" (motivation, max 2 selections) | "I like puzzles for fun" | The Curious Explorer |
| | "I want to help my kid with homework" | The Math Parent |
| "How do you usually deal with numbers in daily life?" (context) | "I check the math before trusting a claim" | The Data Decoder |
| Puzzle answers | Correct pattern-recognition answer, low confidence rating | The Confidence Builder (secondary signal) |

This is the same underlying idea as TripleTen's path quiz: a handful of low-effort questions map to a small set of pre-written content bundles, so the "personalization" is really a well-designed lookup table, not a black box — which keeps it fast to build, easy to QA, and easy to extend with new content later.

## Prototype scope

- Fully responsive single-page experience
- Keyboard-friendly controls and clear focus states
- Maximum of two selections for the motivation question
- Point-based segmentation across five paths
- Supportive answer reveals with visual explanations for all three challenges
- Personalized result explanation and challenge snapshot
- Three illustrative content concepts per path
- Simulated email confirmation state

The recommended resources are illustrative content concepts created to demonstrate personalization logic. The email form is also a portfolio simulation: no address is stored or sent.

## If this were a live product

Metrics I'd want to track to validate and iterate on the funnel:

- Quiz start → completion rate (and drop-off point, if any single question underperforms)
- Distribution of users across the five paths (are any paths over/under-represented — a sign questions need rebalancing?)
- Result page → email opt-in rate
- A/B test candidates: motivation question wording, number of questions (7 vs. a shorter 4-question version), placement of the email CTA (before vs. after the challenge snapshot)

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
