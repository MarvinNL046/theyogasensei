# The Yoga Sensei Link And Image SEO Guide

Last updated: 2026-05-24

Use this guide for internal links, affiliate links, external links, image filenames, alt text, and image performance. These details are small, but they compound across a content site.

## Anchor Text

Anchor text is the visible clickable text of a link. It helps readers understand where a link goes, and it gives search engines context about the linked page.

### Avoid Weak Anchor Text

Avoid anchors like:

- click here
- read more
- this article
- naked URLs such as `https://theyogasensei.com/yoga-mat-guide`
- overstuffed anchors such as `best yoga mat for hot yoga reviews 2026 cheap`

### Use Descriptive Anchor Text

Good examples:

- best yoga mat for hot yoga
- how to clean a yoga mat properly
- chair yoga poses for seniors
- guide to choosing the right yoga mat
- our beginner yoga roadmap

The anchor should describe the destination page while still fitting naturally into the sentence.

## Anchor Text Variation

Do not use the same exact-match anchor every time you link to a pillar or money page. Vary anchors naturally.

For a yoga mat guide, use a mix such as:

- Exact match: `best yoga mat`
- Partial match: `choosing the right yoga mat`
- Branded/natural: `our yoga mat buying guide`
- Contextual: `which mat materials need more maintenance`

For affiliate sites, avoid an unnatural footprint where every internal link uses exact-match keywords.

Practical rule:

- Use mostly partial, descriptive, and natural anchors.
- Use exact-match anchors sparingly.
- Use generic anchors only when there is no better natural option.

## Affiliate Link Anchor Text

Affiliate anchors should match user intent without being misleading.

Good examples:

- Check Price on Amazon
- View on Amazon
- See Current Price
- Compare Options

Avoid:

- Best price guaranteed
- Limited time deal, unless verified
- Buy now!!!
- Any claim that cannot be verified

Affiliate links should use:

```html
rel="sponsored nofollow"
```

When opening in a new tab, also include:

```html
target="_blank" rel="sponsored nofollow noopener"
```

## External Link Anchor Text

When linking to sources, use descriptive anchors.

Good:

- research from the National Institute on Aging
- official Manduka care instructions
- Harvard Health guidance on gentle movement

Weak:

- this study
- here
- source

For trusted editorial citations, normal followed links are often fine. Use `nofollow` only when you do not want to endorse the source, the link is user-generated, or the relationship requires it.

## Internal Linking Pattern

Use three types of internal links:

### Hub Links

Pillars link to their cluster pages.

Example:

- `chair yoga for seniors` links to printable plan, over-70 guide, arthritis guide, and beginner routine.

### Spoke Links

Cluster pages link back to their pillar.

Example:

- `printable chair yoga for seniors` links back to `chair yoga for seniors`.

### Lateral Links

Related cluster pages link to each other.

Example:

- `how to clean a yoga mat` links to `best yoga mat for hot yoga` and `how to clean lululemon yoga mat`.

## Alt Text

Alt text describes an image for accessibility and gives image context to search engines.

Good alt text describes what is actually visible.

Good examples:

- `woman doing downward dog on a black yoga mat`
- `close-up of textured surface on a hot yoga mat`
- `senior woman doing a seated twist in a sturdy chair`
- `hand spraying natural cleaner onto a rolled-out blue yoga mat`

Bad examples:

- `image1.jpg`
- `yoga mat`
- `best yoga mat for hot yoga cheap buy now`
- keyword-stuffed alt text

Rules:

- Keep alt text concise, usually under about 125 characters.
- Describe what is actually in the image.
- Use a keyword only when it naturally matches the image.
- Do not start with "image of" or "picture of."
- Decorative images should use empty alt text: `alt=""`.
- Do not use alt text to add hidden SEO copy.

## Image Filenames

Image filenames are a secondary context signal and help asset organization.

Use:

- `manduka-pro-yoga-mat-purple.webp`
- `spraying-yoga-mat-cleaner.webp`
- `chair-yoga-seated-twist-senior.webp`

Avoid:

- `IMG_4823.jpg`
- `image-final-final.png`
- `yoga_mat_photo.jpg`

Rules:

- Use kebab-case.
- Use short descriptive names.
- Prefer WebP or AVIF for new content when the pipeline supports it.
- Keep filenames honest; do not describe a product or person that is not actually shown.

## Image Performance

For content pages:

- Set width and height or otherwise reserve layout space.
- Use lazy loading for images below the fold.
- Do not lazy-load the LCP hero image.
- Use optimized formats such as WebP or AVIF where supported.
- Compress large images before publishing.
- Avoid huge image files for thumbnails or cards.

Hero images:

- Use eager loading or priority treatment only when the hero image is the LCP asset.
- Keep dimensions stable to prevent layout shift.

Below-fold images:

```html
<img
  src="/images/spraying-yoga-mat-cleaner.webp"
  alt="hand spraying natural cleaner onto a rolled-out blue yoga mat"
  width="800"
  height="533"
  loading="lazy"
/>
```

## Example: Internal Link

```html
<p>
  Once your mat is clean, the material determines how often you need to repeat
  this process. Our
  <a href="/best-yoga-mats-beginners/">guide to choosing the right yoga mat</a>
  explains which materials need more maintenance.
</p>
```

## Example: Affiliate Link

```html
<p>
  For tough sweat buildup, a dedicated mat cleaner may be more convenient than a
  DIY spray.
  <a
    href="https://amazon.com/..."
    rel="sponsored nofollow noopener"
    target="_blank"
  >
    View Manduka mat wash on Amazon </a
  >.
</p>
```

## Mini Pre-Publish Checklist

Before publishing a page, check:

- [ ] Every meaningful image has descriptive alt text.
- [ ] Decorative images use `alt=""`.
- [ ] Image filenames are descriptive and kebab-case.
- [ ] Images have stable width/height or reserved layout space.
- [ ] Hero/LCP image is not lazy-loaded.
- [ ] Below-fold images are lazy-loaded.
- [ ] Internal link anchors are descriptive and varied.
- [ ] Affiliate links use `rel="sponsored nofollow"` and `noopener` when opening in a new tab.
- [ ] External source links use descriptive anchor text.
- [ ] No important link uses only "click here" or "read more."

## Important Notes

Accessibility requirements can vary by jurisdiction and project type. Treat descriptive alt text and accessible links as mandatory best practice for The Yoga Sensei, and verify specific legal obligations separately when needed.

Anchor and alt text should help humans first. SEO value follows from clarity.
