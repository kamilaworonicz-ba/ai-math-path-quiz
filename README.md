# What Kind of Math Learner Are You?

A responsive, interactive quiz concept for adult learners. The experience segments users by motivation and life context, adds two low-stakes reasoning challenges, and recommends a personalized learning path.

`Status: Prototype` `Type: Portfolio Concept` `Domain: EdTech / Content Growth` `Methods: Segmentation Logic / Lead-Gen Funnel Design`

🔗 **[Try the quiz](https://kamilaworonicz-ba.github.io/ai-math-path-quiz/)**

## 🎯 Why This Project Exists

This prototype complements my [Physics Textbook Launch](https://github.com/kamilaworonicz-ba/physics-product-launch) case study. While that project shows how I developed and launched a full educational product, this quiz demonstrates how I design a short, personalized experience to engage potential learners.

It's modeled on the logic behind TripleTen's own career-path quiz ("Find the tech learning path that fits you best"), applied to a different audience and topic — adult learners deciding whether and how to re-engage with math. The goal was to show how interactive content can turn broad audience insight into a useful, personalized next step:

`attitude + context + goals + challenge signals → personalized path → content recommendations → email CTA`

It is designed for adults who may want practical skills, statistical literacy, help supporting a child, enjoyable mental challenges, or a more confident relationship with math.


## 🧭 The Five Paths

- The Curious Explorer
- The Practical Thinker
- The Data Decoder
- The Math Parent
- The Confidence Builder

The first four questions drive the main recommendation. The two puzzles add a short, non-judgmental observation about pattern recognition and evidence-based reasoning. They are not presented as a math score.


## 🧩 How the Segmentation Works

Each answer adds points to one or more paths; the quiz recommends the path with the highest score at the end. A simplified example:

| Question | Signal | Path(s) it points to |
|---|---|---|
| "What would you like to get out of a math course?" (up to 2 goals) | "Have fun and challenge my brain" | The Curious Explorer |
| | "Help my child with math" | The Math Parent |
| "Where does math show up in your life most often?" | "News and statistics" | The Data Decoder |

The first four questions determine the recommended path. Answers to the two challenges only change the short thinking summary and skill labels shown on the result page.

This is the same underlying idea as TripleTen's path quiz: a handful of low-effort questions map to a small set of pre-written content bundles, so the "personalization" is really a well-designed lookup table, not a black box — which keeps it fast to build, easy to QA, and easy to extend with new content later.


## 📐 Prototype Scope

- Fully responsive single-page experience
- Keyboard-friendly controls and clear focus states
- Maximum of two selections for the motivation question
- Point-based segmentation across five paths
- Supportive answer reveals with visual explanations for both challenges
- Personalized result explanation and challenge snapshot
- Three illustrative content concepts per path
- Simulated email confirmation state

The recommended resources are illustrative content concepts created to demonstrate personalization logic. The email form is also a portfolio simulation: no address is stored or sent.


## 📊 If This Were a Live Product

Metrics I'd want to track to validate and iterate on the funnel:

- Quiz start → completion rate (and drop-off point, if any single question underperforms)
- Distribution of users across the five paths (are any paths over/under-represented — a sign questions need rebalancing?)
- Result page → email opt-in rate
- A/B test candidates: motivation question wording, number of questions (6 vs. a shorter 4-question version), placement of the email CTA (before vs. after the challenge snapshot)


## 📁 Files

```text
dist/
  index.html
  styles.css
  script.js
.github/workflows/pages.yml
```


## 📬 Contact

**Kamila Woronicz** <br>
Product Project Manager | Business Analyst <br>
<kamila.woronicz@gmail.com>
