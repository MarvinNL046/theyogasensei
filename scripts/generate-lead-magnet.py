"""
Lead-magnet PDF generator — "The Yoga for Beginners Starter Guide".

Branded (Cormorant Garamond + Inter, cream/clay/olive palette) multi-page PDF
with working, clickable links: researched product picks via our own /go/
affiliate redirects (Amazon Associates tag added at redirect), authoritative
sources (NCCIH, PubMed, PMC, CDC), and deeper free guides on the site.

Run:  python scripts/generate-lead-magnet.py
Out:  public/lead-magnets/yoga-for-beginners-starter.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, HRFlowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "scripts", "assets", "fonts")
OUT_DIR = os.path.join(ROOT, "public", "lead-magnets")
OUT = os.path.join(OUT_DIR, "yoga-for-beginners-starter.pdf")
COVER_IMG = os.path.join(ROOT, "public", "images", "brand", "article-hero-morning-yoga.png")
SITE = "https://www.theyogasensei.com"

# ---- palette (brand) ----
CREAM = HexColor("#f6f1ea")
INK = HexColor("#2b2a26")
INK_SOFT = HexColor("#4a4842")
MUTED = HexColor("#8a8478")
CLAY = HexColor("#b04a2f")       # accent-deep, legible on cream
OLIVE = HexColor("#4b5320")
BORDER = HexColor("#e3dccf")
SURFACE = HexColor("#efe9df")

# ---- fonts ----
pdfmetrics.registerFont(TTFont("Cormorant", os.path.join(FONTS, "CormorantGaramond-400.ttf")))
pdfmetrics.registerFont(TTFont("Cormorant-SB", os.path.join(FONTS, "CormorantGaramond-600.ttf")))
pdfmetrics.registerFont(TTFont("Cormorant-B", os.path.join(FONTS, "CormorantGaramond-700.ttf")))
pdfmetrics.registerFont(TTFont("Inter", os.path.join(FONTS, "Inter-500.ttf")))
pdfmetrics.registerFont(TTFont("Inter-SB", os.path.join(FONTS, "Inter-600.ttf")))
pdfmetrics.registerFont(TTFont("NotoJP", os.path.join(FONTS, "NotoSerifJP-600.ttf")))

PAGE_W, PAGE_H = A4
MARGIN = 17 * mm

# ---- styles ----
def style(name, **kw):
    base = dict(fontName="Inter", fontSize=10.2, leading=16, textColor=INK_SOFT,
                spaceAfter=8, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)

S_EYEBROW = style("eyebrow", fontName="Inter-SB", fontSize=8.5, leading=12,
                  textColor=CLAY, spaceAfter=6)
S_H1 = style("h1", fontName="Cormorant-B", fontSize=27, leading=30, textColor=INK, spaceAfter=10)
S_H2 = style("h2", fontName="Cormorant-B", fontSize=19, leading=23, textColor=INK,
             spaceBefore=6, spaceAfter=8)
S_BODY = style("body")
S_LEAD = style("lead", fontSize=11.5, leading=18, textColor=INK)
S_ITEM = style("item", fontSize=10.2, leading=15, spaceAfter=7)
S_ITEM_H = style("itemh", fontName="Inter-SB", fontSize=10.5, leading=15, textColor=INK, spaceAfter=2)
S_SMALL = style("small", fontSize=8.6, leading=12.5, textColor=MUTED, spaceAfter=4)
S_NOTE = style("note", fontName="Inter", fontSize=9.2, leading=13.5, textColor=MUTED, spaceAfter=6)
S_SRC = style("src", fontSize=9.6, leading=14, spaceAfter=7)


def lnk(text, url):
    return f'<a href="{url}" color="#b04a2f"><u>{text}</u></a>'


def go(slug):
    return f"{SITE}/go/{slug}"


def page(url):
    return f"{SITE}{url}"


# ---- page furniture ----
def draw_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.restoreState()


def footer(canvas, doc):
    draw_bg(canvas, doc)
    canvas.saveState()
    canvas.setFont("Inter-SB", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 12 * mm, "THE YOGA SENSEI")
    canvas.drawRightString(PAGE_W - MARGIN, 12 * mm, "theyogasensei.com")
    canvas.setFont("NotoJP", 9)
    canvas.setFillColor(HexColor("#bdb6a6"))
    canvas.drawCentredString(PAGE_W / 2, 12 * mm, "継続は力なり")
    canvas.restoreState()


def cover(canvas, doc):
    draw_bg(canvas, doc)
    canvas.saveState()
    # cover image band (framed within margins)
    try:
        img = ImageReader(COVER_IMG)
        iw, ih = img.getSize()
        bw = PAGE_W - 2 * MARGIN
        bh = 92 * mm
        scale = max(bw / iw, bh / ih)
        dw, dh = iw * scale, ih * scale
        bx, by = MARGIN, PAGE_H - 20 * mm - bh
        canvas.saveState()
        p = canvas.beginPath()
        p.rect(bx, by, bw, bh)
        canvas.clipPath(p, stroke=0)
        canvas.drawImage(img, bx - (dw - bw) / 2, by - (dh - bh) / 2, dw, dh, mask="auto")
        canvas.restoreState()
        canvas.setStrokeColor(BORDER)
        canvas.setLineWidth(0.6)
        canvas.rect(bx, by, bw, bh, fill=0, stroke=1)
    except Exception as e:  # noqa
        by = PAGE_H - 20 * mm - 92 * mm
    # eyebrow
    ty = by - 16 * mm
    canvas.setFillColor(CLAY)
    canvas.setFont("Inter-SB", 9)
    canvas.drawString(MARGIN, ty, "T H E   Y O G A   S E N S E I   ·   F R E E   G U I D E")
    # clay rule
    canvas.setFillColor(CLAY)
    canvas.rect(MARGIN, ty - 7 * mm, 18 * mm, 1.4, fill=1, stroke=0)
    # title
    canvas.setFillColor(INK)
    canvas.setFont("Cormorant-B", 42)
    canvas.drawString(MARGIN, ty - 22 * mm, "Yoga for Beginners")
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Cormorant-SB", 26)
    canvas.drawString(MARGIN, ty - 33 * mm, "The Starter Guide")
    # subtitle (wrapped manually, short)
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Inter", 10.5)
    sub = [
        "Everything you need to begin — the gear that's worth it, eight",
        "foundational poses, a 10-minute routine, and what to skip.",
        "No flexibility required.",
    ]
    for i, line in enumerate(sub):
        canvas.drawString(MARGIN, ty - 44 * mm - i * 5.4 * mm, line)
    # byline
    canvas.setFillColor(MUTED)
    canvas.setFont("Inter-SB", 8.5)
    canvas.drawString(MARGIN, 16 * mm, "BY MARVIN SMIT  ·  THEYOGASENSEI.COM")
    canvas.restoreState()


# ---- document ----
def build():
    os.makedirs(OUT_DIR, exist_ok=True)
    frame = Frame(MARGIN, 18 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 18 * mm - 18 * mm, id="body")
    doc = BaseDocTemplate(
        OUT, pagesize=A4, title="The Yoga for Beginners Starter Guide",
        author="Marvin Smit — The Yoga Sensei",
        subject="A calm, honest starter guide to yoga for beginners.",
    )
    doc.addPageTemplates([
        PageTemplate(id="Cover", frames=[frame], onPage=cover),
        PageTemplate(id="Body", frames=[frame], onPage=footer),
    ])

    disclosure = ("Some product links below are affiliate links: if you buy through them I may earn a "
                  "small commission, at no extra cost to you. I only list gear I would actually use, "
                  "researched from specs and real reviews — no invented lab tests.")

    s = []  # story
    s.append(NextPageTemplate("Body"))
    s.append(Spacer(1, 1))
    s.append(PageBreak())

    # ---------- Welcome ----------
    s.append(Paragraph("START HERE", S_EYEBROW))
    s.append(Paragraph("You're more ready than you think", S_H1))
    s.append(Paragraph(
        "You don't need to be flexible, fit, or to buy anything to start yoga. You need a clear bit of "
        "floor and ten quiet minutes. This guide is the calm, no-hype version of starting: what actually "
        "matters, what you can safely ignore, and a routine you can do tomorrow morning.", S_LEAD))
    s.append(Paragraph(
        "I'm Marvin. I've practised for years — I'm not a certified instructor, and I write every word on "
        "The Yoga Sensei myself. Everything here is what I'd tell a friend who asked, &ldquo;how do I "
        "start?&rdquo;", S_BODY))
    s.append(Paragraph(
        "<b>How to use it.</b> Skim it once, then keep the 10-minute routine somewhere you'll see it. "
        "Every underlined link opens a fuller free guide, a researched product, or the study behind a "
        "claim — all on tap if you want to go deeper.", S_BODY))
    s.append(Spacer(1, 4))
    s.append(Paragraph(
        "This is general guidance, not medical advice. If you have an injury or health condition, or "
        "you're pregnant, check with your doctor before starting.", S_NOTE))

    s.append(PageBreak())

    # ---------- Gear ----------
    s.append(Paragraph("WHAT YOU ACTUALLY NEED", S_EYEBROW))
    s.append(Paragraph("Almost nothing — but a good mat helps", S_H1))
    s.append(Paragraph(
        "The honest answer is that you can start with no equipment at all. The one thing worth buying is a "
        "mat: a grippy surface stops your hands and feet sliding apart, which is the single most common "
        "beginner frustration. Below are the mats I actually recommend, by budget.", S_BODY))
    s.append(Spacer(1, 2))

    def product(name, best_for, slug):
        s.append(Paragraph(f"{name} &nbsp;—&nbsp; {lnk('View on Amazon &rarr;', go(slug))}", S_ITEM_H))
        s.append(Paragraph(best_for, S_ITEM))

    product("Gaiam Premium 6mm", "Budget + cushioned. Soft underfoot and cheap — the easiest first mat for most beginners.", "gaiam-premium-6mm")
    product("Retrospec Solana ½&quot;", "Budget + extra-thick. Kind to sore knees and wrists on hard floors; the trade-off is a little less stability.", "retrospec-solana-half-inch")
    product("Jade Harmony", "Best grip + eco. Natural rubber, superb dry grip. Note: contains latex — skip if you're allergic.", "jade-harmony")
    product("Liforme Original", "Premium + alignment. A printed alignment guide on the surface that helps you place hands and feet.", "liforme-original")
    product("Manduka PRO", "Buy-it-for-life. Heavy and near-indestructible with a lifetime guarantee; slippery until broken in.", "manduka-pro-6mm")

    s.append(Spacer(1, 3))
    s.append(Paragraph(
        f"Want the full breakdown? See {lnk('the best yoga mats for beginners', page('/guides/best-yoga-mat-for-beginners'))} "
        f"and {lnk('how to choose a yoga mat', page('/guides/how-to-choose-a-yoga-mat'))}.", S_BODY))
    s.append(Paragraph(
        f"<b>Nice to have later</b> (not now): two {lnk('yoga blocks', go('gaiam-yoga-block'))} and a "
        f"{lnk('strap', go('manduka-yoga-strap'))} bring the floor closer while your flexibility builds. "
        "What to skip at the start: fancy clothes, apps, and anything you saw on Instagram. Add a prop "
        "only when a pose actually asks for it.", S_BODY))
    s.append(Spacer(1, 4))
    s.append(Paragraph(disclosure, S_SMALL))

    s.append(PageBreak())

    # ---------- Foundational poses ----------
    s.append(Paragraph("THE FOUNDATIONS", S_EYEBROW))
    s.append(Paragraph("Eight poses to learn first", S_H1))
    s.append(Paragraph(
        "Learn these eight and you can follow almost any beginner class. Move slowly, breathe through your "
        "nose, and bend your knees whenever you need to — a long, straight back always beats straight legs.",
        S_BODY))
    s.append(Spacer(1, 2))

    def pose(name, sanskrit, cue, ease, url=None):
        head = name + (f" &nbsp;<font color='#8a8478' size=9>({sanskrit})</font>" if sanskrit else "")
        if url:
            head += f" &nbsp;·&nbsp; {lnk('full guide', url)}"
        s.append(Paragraph(head, S_ITEM_H))
        s.append(Paragraph(f"{cue} <font color='#8a8478'><i>Ease off if: {ease}</i></font>", S_ITEM))

    pose("Mountain Pose", "Tadasana", "Stand tall, feet hip-width, weight even, crown lifting. The quiet base for every standing pose.", "you feel light-headed — soften the knees.")
    pose("Cat-Cow", "Marjaryasana–Bitilasana", "On hands and knees: inhale and arch, exhale and round. Warms the spine in under a minute.", "your wrists complain — come to fists or forearms.")
    pose("Child's Pose", "Balasana", "Hips back toward the heels, arms forward, forehead down. Your rest button — return to it any time.", "your knees hurt — widen them or add a cushion.", page('/poses/childs-pose'))
    pose("Downward Dog", "Adho Mukha Svanasana", "Hips up and back into an inverted V. Bend the knees freely; the straight back is the goal.", "wrists ache — press the floor away, share the load.", page('/poses/downward-facing-dog'))
    pose("Cobra", "Bhujangasana", "Lie on your front and lift the chest with the back muscles, hands light. A gentle, opening backbend.", "your lower back pinches — lift lower.", page('/poses/cobra-pose'))
    pose("Warrior II", "Virabhadrasana II", "Step wide, turn one foot out, bend that knee over the ankle, reach the arms long. Strong and steady.", "the front knee caves in — track it over the toes.", page('/poses/warrior-ii'))
    pose("Standing Forward Fold", "Uttanasana", "Hinge from the hips and fold over soft knees, head heavy. Lets the whole back of the body release.", "you feel dizzy rising — come up slowly.")
    pose("Sun Salutation A", "Surya Namaskar A", "The flowing sequence that links several of these poses, one breath per move. The heart of most classes.", "you're rushing — slow the breath or do fewer rounds.", page('/poses/sun-salutation'))

    s.append(PageBreak())

    # ---------- Routine + rhythm ----------
    s.append(Paragraph("YOUR FIRST ROUTINE", S_EYEBROW))
    s.append(Paragraph("A gentle 10-minute morning flow", S_H1))
    s.append(Paragraph(
        "This is the one thing to keep. Move slowly, one breath at a time, and skip anything that doesn't "
        "feel right first thing.", S_BODY))
    routine = [
        "Child's Pose — settle and breathe (1 min)",
        "Cat-Cow — warm the spine (1 min)",
        "Downward Dog — wake the back body (5 breaths)",
        "Standing Forward Fold — let the head hang (a few breaths)",
        "One or two Sun Salutations — build gentle heat (2–3 min)",
        "Cobra — open the chest (a few breaths)",
        "Warrior II — energise, each side (a few breaths)",
        "Seated twist, then rest — finish calm (1–2 min)",
    ]
    for i, step in enumerate(routine, 1):
        s.append(Paragraph(f"<b><font color='#b04a2f'>{i}.</font></b> &nbsp;{step}", S_ITEM))
    s.append(Spacer(1, 2))
    s.append(Paragraph(
        f"Follow the full version, with cues and 5/15/30-minute options, in the "
        f"{lnk('morning yoga routine guide', page('/guides/morning-yoga-routine'))}. Ten minutes most "
        "days beats an hour once a week.", S_BODY))

    s.append(Spacer(1, 8))
    s.append(Paragraph("A gentle two-week rhythm", S_H2))
    s.append(Paragraph("<b>Week 1 — just show up.</b> Three short sessions. Do only the first four poses for 5–10 minutes. The goal is the habit, not the depth.", S_ITEM))
    s.append(Paragraph("<b>Week 2 — add a little.</b> Three or four sessions of 10–15 minutes. Add a Sun Salutation and Warrior II. Notice what's already easier.", S_ITEM))
    s.append(Paragraph("<b>After that — keep the routine.</b> Stick with the 10-minute flow most mornings, and explore new poses when you're curious.", S_ITEM))

    s.append(PageBreak())

    # ---------- Mistakes + safety ----------
    s.append(Paragraph("AVOID THE COMMON TRAPS", S_EYEBROW))
    s.append(Paragraph("Five beginner mistakes", S_H1))
    mistakes = [
        ("Rushing the breath.", "Let slow, nose breathing set the pace — not the other way around."),
        ("Chasing flexibility.", "You get flexible by practising; you don't need it to begin. Forcing a stretch is how people get hurt."),
        ("Holding the breath.", "It sneaks in the moment a pose gets hard. Keep it flowing and the pose gets easier."),
        ("Comparing yourself.", "To the person next to you, or to a video. Their body and years of practice are not yours."),
        ("Skipping the final rest.", "Two quiet minutes at the end is where the practice settles. Don't cut it."),
    ]
    for t, d in mistakes:
        s.append(Paragraph(f"<b>{t}</b> {d}", S_ITEM))

    s.append(Spacer(1, 8))
    s.append(Paragraph("When to take it easy", S_H2))
    s.append(Paragraph(
        "Yoga is generally safe when practised mindfully, but go gently, get a professional's eye, or skip "
        "poses if you have a recent injury, a back/neck/wrist/shoulder problem, uncontrolled high blood "
        "pressure, or you're pregnant. Sharp pain, dizziness, or pressure in the head are stop signals — "
        "come out of the pose. None of this is medical advice; when in doubt, ask your doctor.", S_BODY))

    s.append(PageBreak())

    # ---------- Sources + close ----------
    s.append(Paragraph("READ THE SOURCES YOURSELF", S_EYEBROW))
    s.append(Paragraph("Sources & further reading", S_H1))
    s.append(Paragraph("The research behind the health notes in this guide — all free to read:", S_BODY))
    sources = [
        ("NCCIH — Yoga: What You Need To Know", "Plain-language overview of yoga, benefits and safety, from the US National Institutes of Health.", "https://www.nccih.nih.gov/health/yoga-what-you-need-to-know"),
        ("Pascoe et al. (2017) — Yoga and stress-related physiological measures (meta-analysis)", "Reviews of yoga link a regular practice to lower stress and cortisol; the studies are small and mixed.", "https://pubmed.ncbi.nlm.nih.gov/29220801/"),
        ("Bhavanani et al. — How effective is Sun Salutation… (24-week study)", "Students who practised Sun Salutations six days a week improved push-ups and sit-ups.", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3289222/"),
        ("CDC — Physical Activity Guidelines for Adults", "About 150 minutes of moderate movement a week; short daily sessions add up fast.", "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"),
    ]
    for t, d, u in sources:
        s.append(Paragraph(lnk(t, u), S_SRC))
        s.append(Paragraph(d, S_SMALL))
        s.append(Spacer(1, 2))

    s.append(Spacer(1, 6))
    s.append(Paragraph("Keep going (free on the site)", S_H2))
    s.append(Paragraph(
        f"&bull;&nbsp; {lnk('Yoga for Beginners — the full guide', page('/guides/yoga-for-beginners'))}<br/>"
        f"&bull;&nbsp; {lnk('Sun Salutation A — step by step', page('/poses/sun-salutation'))}<br/>"
        f"&bull;&nbsp; {lnk('Best yoga mats for beginners', page('/guides/best-yoga-mat-for-beginners'))}",
        S_ITEM))

    s.append(Spacer(1, 10))
    s.append(HRFlowable(width="100%", thickness=0.6, color=BORDER))
    s.append(Spacer(1, 6))
    s.append(Paragraph(
        "You're reading this because you joined the weekly email — one short, calm email a week, and you "
        "can unsubscribe in one click any time. Hit reply if anything here doesn't work; it goes straight "
        "to me.", S_NOTE))
    s.append(Paragraph("— Marvin, The Yoga Sensei &nbsp;·&nbsp; hello@theyogasensei.com", S_NOTE))

    doc.build(s)
    print("OK", OUT.replace(ROOT, "").replace("\\", "/"))
    print("pages:", _pagecount(OUT))


def _pagecount(path):
    try:
        from pypdf import PdfReader
        return len(PdfReader(path).pages)
    except Exception:
        return "?"


if __name__ == "__main__":
    build()
