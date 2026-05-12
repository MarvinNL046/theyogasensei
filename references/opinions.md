# Opinions — strong, defensible takes for theyogasensei.com

Hot takes that distinguish this site from generic listicles. **One opinion per post, max**, and only when it's backed by a real number, a real test, or a real industry observation that can be defended in writing.

An opinion without a number is just an assertion. Move it to a draft file and don't publish it until you have the data to back it.

---

## Format

```markdown
### [The opinion, stated cleanly]

**Backed by:** [the number, test, or observation]
**Counter-argument we acknowledge:** [the strongest case against]
**Where it fits:** [what kinds of articles can deploy this opinion]
```

---

## Starter opinions — testable and defendable

These are five opinions plausible enough to start with. **Each one is currently aspirational** — you must verify it with your own testing before deploying it in a published article. Move an opinion from "aspirational" to "verified" by appending the data point that confirmed it.

### Most "eco" yoga mats are marketing

**Backed by:** _(aspirational — to verify, audit the ingredient lists of the top 20 mats marketed as eco/sustainable, check which are actually biodegradable vs. PVC with a leaf logo. Manduka eKO, Liforme, Jade Harmony are the three commonly cited as genuinely eco. Verify or refute.)_
**Counter-argument:** "TPE is recyclable even if not biodegradable, which is an environmental win versus virgin PVC."
**Where it fits:** Any mat buying guide, any eco-mat roundup, any sustainability-angle pillar.

### 4mm is the sweet spot for beginner mats

**Backed by:** _(aspirational — verify after testing mats in 3mm, 4mm, 5mm, and 6mm thicknesses. The hypothesis is that thinner mats hurt knees in low lunge and child's pose, while thicker mats degrade balance-pose stability. Test data goes here once collected.)_
**Counter-argument:** "Some beginners with knee issues genuinely need 6mm+, and travel mats at 1.5mm are a legitimate use case."
**Where it fits:** Mat buying guides, beginner-gear roundups, "what to buy first" articles.

### You don't need to buy yoga blocks until your third month

**Backed by:** _(aspirational — your own progression data. Track when in your practice you first reached for a block, and whether a stack of books worked equally well in months 1–2.)_
**Counter-argument:** "Yoga teachers consistently recommend blocks from day one — they enable correct alignment in poses beginners would otherwise fake."
**Where it fits:** Beginner gear guides, "minimum viable yoga setup" articles, anti-consumerism angle in lifestyle pieces.

### Yoga apps over Instagram-influencer content

**Backed by:** _(aspirational — to verify, track 30 days of practice with apps only vs 30 days with Instagram/TikTok content only. Compare consistency, progression, and frustration. Hypothesis: apps win on consistency because of structured progression and lack of algorithmic distraction.)_
**Counter-argument:** "Free Instagram content has democratised access to teachers who'd otherwise be inaccessible."
**Where it fits:** App roundups, "how to start" pillars, lifestyle/practice-building articles.

### Pinterest beats Instagram for finding beginner-friendly poses

**Backed by:** _(aspirational — content-format analysis. Pinterest's pin format (vertical, image + step text overlay) selects for tutorial content; Instagram's format selects for aesthetic content. Verify by sampling top-100 results for "sun salutation" on both platforms and classifying tutorial vs. aesthetic.)_
**Counter-argument:** "Instagram Reels have closed this gap — there's real instructional content now."
**Where it fits:** Any Pinterest-strategy article, any "how to find good yoga content online" piece.

---

## Opinions to add only when verified

Don't publish these without doing the work first:

- _"The most expensive yoga gear is rarely the best gear for beginners."_ — Need to test premium-priced gear and find at least 3 cases where a sub-$50 option matched or beat it.
- _"Hatha is the right starting style for nearly everyone, not Vinyasa."_ — Need to interview or survey at least 30 beginners about their first-style choice and 3-month retention.
- _"Yoga subscriptions ($15–25/mo) are better value than studio drop-ins for the first year."_ — Need a real cost-comparison spreadsheet over 12 months.

---

## Anti-opinions — things we never claim

Never publish these, even as opinions, without RYT-certified teacher review and citations:

- "[Pose X] is good/bad for [condition Y]."
- "Yoga is/isn't a religion."
- "Hot yoga is dangerous." / "Hot yoga is safe."
- "Anyone can do yoga at any age."
- "Yoga heals [anything]."

These cross into YMYL territory. Even if you believe them, leave them to qualified voices.

---

## How the skill uses this file

The page-generation skill reads `opinions.md` and selects **at most one opinion per article**, only if it fits the topic tightly. If the matched opinion is still in "aspirational" status (not yet verified), the skill flags this and either omits it or asks the author to defer the article until the data is in.

After publishing, the skill notes which opinion was used (`opinionUsed: <opinion-slug>`) so the same opinion isn't repeated within 90 days across the site.

---

## How to verify an aspirational opinion

1. Define the test — what data would confirm or refute the claim?
2. Run the test — actually do the comparison, the count, the audit.
3. Record the data in `stats.md` under per-product testing or a relevant section.
4. Move the opinion's "Backed by" field from aspirational to a specific data line citing `stats.md`.
5. Update this file's changelog with the date verified.

---

## Changelog

- **2026-05-12** — File created with 5 starter opinions (all aspirational, none yet verified).
