"""
Lead-magnet PDF generator — "The Yoga for Beginners Starter Guide" (v2, illustrated).

Branded, image-rich multi-page PDF: cover, contents, pose photos per posture,
product cards (linked via our /go/ affiliate redirects), callout blocks, a
sources page — all clickable. Calm premium brand style (Cormorant + Inter,
cream/clay/olive). Images are centre-cropped with Pillow for uniform thumbs.

Run:  python scripts/generate-lead-magnet.py
Out:  public/lead-magnets/yoga-for-beginners-starter.pdf
"""
import os
import tempfile
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, HRFlowable, Image, KeepTogether,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "scripts", "assets", "fonts")
IMG = os.path.join(ROOT, "public", "images")
OUT_DIR = os.path.join(ROOT, "public", "lead-magnets")
OUT = os.path.join(OUT_DIR, "yoga-for-beginners-starter.pdf")
CACHE = os.path.join(tempfile.gettempdir(), "lm_thumbs")
os.makedirs(CACHE, exist_ok=True)
COVER_IMG = os.path.join(IMG, "brand", "article-hero-morning-yoga.png")
SITE = "https://www.theyogasensei.com"

CREAM = HexColor("#f6f1ea")
INK = HexColor("#2b2a26")
INK_SOFT = HexColor("#4a4842")
MUTED = HexColor("#8a8478")
CLAY = HexColor("#b04a2f")
OLIVE = HexColor("#454d20")
BORDER = HexColor("#e3dccf")
SURFACE = HexColor("#efe9df")

pdfmetrics.registerFont(TTFont("Cormorant", os.path.join(FONTS, "CormorantGaramond-400.ttf")))
pdfmetrics.registerFont(TTFont("Cormorant-SB", os.path.join(FONTS, "CormorantGaramond-600.ttf")))
pdfmetrics.registerFont(TTFont("Cormorant-B", os.path.join(FONTS, "CormorantGaramond-700.ttf")))
pdfmetrics.registerFont(TTFont("Inter", os.path.join(FONTS, "Inter-500.ttf")))
pdfmetrics.registerFont(TTFont("Inter-SB", os.path.join(FONTS, "Inter-600.ttf")))
pdfmetrics.registerFont(TTFont("NotoJP", os.path.join(FONTS, "NotoSerifJP-600.ttf")))

PAGE_W, PAGE_H = A4
MARGIN = 17 * mm
CONTENT_W = PAGE_W - 2 * MARGIN


def st(name, **kw):
    base = dict(fontName="Inter", fontSize=10, leading=15.5, textColor=INK_SOFT, spaceAfter=7, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)


S_EYE = st("eye", fontName="Inter-SB", fontSize=8.5, leading=11, textColor=CLAY, spaceAfter=5)
S_H1 = st("h1", fontName="Cormorant-B", fontSize=26, leading=29, textColor=INK, spaceAfter=9)
S_H2 = st("h2", fontName="Cormorant-B", fontSize=17, leading=21, textColor=INK, spaceBefore=4, spaceAfter=6)
S_BODY = st("body")
S_LEAD = st("lead", fontSize=11.5, leading=18, textColor=INK)
S_POSE = st("pose", fontName="Cormorant-B", fontSize=15, leading=17, textColor=INK, spaceAfter=2)
S_POSE_SUB = st("posesub", fontName="Inter", fontSize=8, leading=11, textColor=MUTED, spaceAfter=3)
S_POSE_BODY = st("posebody", fontSize=9.3, leading=13.5, textColor=INK_SOFT, spaceAfter=2)
S_CARD_H = st("cardh", fontName="Inter-SB", fontSize=11, leading=14, textColor=INK, spaceAfter=1)
S_CARD_TAG = st("cardtag", fontName="Inter-SB", fontSize=7.5, leading=10, textColor=CLAY, spaceAfter=4)
S_CARD_BODY = st("cardbody", fontSize=9.3, leading=13.5, textColor=INK_SOFT, spaceAfter=4)
S_LINK = st("link", fontName="Inter-SB", fontSize=9, leading=12, textColor=CLAY, spaceAfter=0)
S_SMALL = st("small", fontSize=8.4, leading=12, textColor=MUTED, spaceAfter=3)
S_NOTE = st("note", fontSize=9, leading=13.5, textColor=MUTED, spaceAfter=5)
S_TOC = st("toc", fontName="Cormorant-B", fontSize=14, leading=22, textColor=INK, spaceAfter=2)
S_TOC_SUB = st("tocsub", fontSize=8.6, leading=12, textColor=MUTED, spaceAfter=10)
S_CALL_H = st("callh", fontName="Inter-SB", fontSize=9.5, leading=13, textColor=INK, spaceAfter=3)
S_CALL_B = st("callb", fontSize=9.3, leading=13.8, textColor=INK_SOFT, spaceAfter=0)
S_OLIVE_H = st("oliveh", fontName="Inter-SB", fontSize=9.5, leading=13, textColor=CREAM, spaceAfter=3)
S_OLIVE_B = st("oliveb", fontSize=9.3, leading=13.8, textColor=HexColor("#e8e4d6"), spaceAfter=0)


def lnk(text, url):
    return f'<a href="{url}" color="#b04a2f"><u>{text}</u></a>'


def go(slug):
    return f"{SITE}/go/{slug}"


def page(u):
    return f"{SITE}{u}"


def thumb(src, ratio=1.0, w_px=540):
    """Centre-crop src to width/height = ratio, cache, return path."""
    key = f"{os.path.splitext(os.path.basename(src))[0]}_{ratio}_{w_px}.jpg"
    out = os.path.join(CACHE, key)
    if os.path.exists(out):
        return out
    im = PILImage.open(src).convert("RGB")
    iw, ih = im.size
    cur = iw / ih
    if cur > ratio:
        nw = int(ih * ratio)
        x = (iw - nw) // 2
        im = im.crop((x, 0, x + nw, ih))
    else:
        nh = int(iw / ratio)
        y = (ih - nh) // 2
        im = im.crop((0, y, iw, y + nh))
    im = im.resize((w_px, int(w_px / ratio)), PILImage.LANCZOS)
    im.save(out, "JPEG", quality=86)
    return out


def rimg(src, w, ratio=1.0):
    h = w / ratio
    return Image(thumb(src, ratio, max(360, int(w / mm * 18))), width=w, height=h)


def section(num, eyebrow, title):
    return [
        Paragraph(f"{num} &nbsp;·&nbsp; {eyebrow}", S_EYE),
        HRFlowable(width=42, thickness=1.4, color=CLAY, spaceBefore=2, spaceAfter=8, hAlign="LEFT"),
        Paragraph(title, S_H1),
    ]


def banner(src, h=46 * mm):
    return Image(thumb(src, ratio=CONTENT_W / h, w_px=1100), width=CONTENT_W, height=h)


def card(name, tag, desc, url):
    inner = [
        Paragraph(name, S_CARD_H),
        Paragraph(tag, S_CARD_TAG),
        Paragraph(desc, S_CARD_BODY),
        Paragraph(lnk("View on Amazon &rarr;", url), S_LINK),
    ]
    t = Table([[inner]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("ROUNDEDCORNERS", [5, 5, 5, 5]),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 11),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return KeepTogether([t, Spacer(1, 7)])


def card_box(name, tag, desc, url, w):
    inner = [
        Paragraph(name, S_CARD_H),
        Paragraph(tag, S_CARD_TAG),
        Paragraph(desc, S_CARD_BODY),
        Paragraph(lnk("View on Amazon &rarr;", url), S_LINK),
    ]
    t = Table([[inner]], colWidths=[w])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("ROUNDEDCORNERS", [5, 5, 5, 5]),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def cards_grid(items):
    gut = 10
    col = (CONTENT_W - gut) / 2
    boxes = [card_box(n, tg, d, u, col) for (n, tg, d, u) in items]
    rows = []
    for i in range(0, len(boxes), 2):
        pair = boxes[i:i + 2]
        if len(pair) == 1:
            pair.append("")
        rows.append(pair)
    g = Table(rows, colWidths=[col, col])
    g.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), gut),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, 0), 0),
        ("TOPPADDING", (0, 1), (-1, -1), gut),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return g


def pose_row(src, name, sanskrit, cue, ease, url=None):
    iw = 30 * mm
    txt = [Paragraph(name, S_POSE)]
    txt.append(Paragraph(sanskrit, S_POSE_SUB))
    txt.append(Paragraph(cue, S_POSE_BODY))
    txt.append(Paragraph(f"<font color='#8a8478'><i>Ease off if: {ease}</i></font>", S_POSE_BODY))
    if url:
        txt.append(Paragraph(lnk("Full guide &rarr;", url), S_LINK))
    t = Table([[rimg(src, iw, ratio=1.0), txt]], colWidths=[iw, CONTENT_W - iw - 8])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return KeepTogether([t, Spacer(1, 5), HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=10)])


def callout(title, body, tone="clay"):
    if tone == "olive":
        inner = [Paragraph(title, S_OLIVE_H), Paragraph(body, S_OLIVE_B)]
        bg, bar = OLIVE, OLIVE
    else:
        inner = [Paragraph(title, S_CALL_H), Paragraph(body, S_CALL_B)]
        bg, bar = SURFACE, CLAY
    t = Table([[inner]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LINEBEFORE", (0, 0), (0, -1), 3, bar),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 11),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return KeepTogether([t, Spacer(1, 8)])


# ---- page furniture ----
def bg(canvas):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.restoreState()


def footer(canvas, doc):
    bg(canvas)
    canvas.saveState()
    canvas.setFont("Inter-SB", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 11 * mm, "THE YOGA SENSEI")
    canvas.drawRightString(PAGE_W - MARGIN, 11 * mm, "theyogasensei.com")
    canvas.setFont("NotoJP", 9)
    canvas.setFillColor(HexColor("#c4bdad"))
    canvas.drawCentredString(PAGE_W / 2, 11 * mm, "継続は力なり")
    canvas.restoreState()


def cover(canvas, doc):
    bg(canvas)
    canvas.saveState()
    img = ImageReader(COVER_IMG)
    iw, ih = img.getSize()
    bw, bh = CONTENT_W, 96 * mm
    scale = max(bw / iw, bh / ih)
    dw, dh = iw * scale, ih * scale
    bx, by = MARGIN, PAGE_H - 18 * mm - bh
    canvas.saveState()
    p = canvas.beginPath()
    p.rect(bx, by, bw, bh)
    canvas.clipPath(p, stroke=0)
    canvas.drawImage(img, bx - (dw - bw) / 2, by - (dh - bh) / 2, dw, dh, mask="auto")
    canvas.restoreState()
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.6)
    canvas.rect(bx, by, bw, bh, fill=0, stroke=1)
    ty = by - 15 * mm
    canvas.setFillColor(CLAY)
    canvas.setFont("Inter-SB", 9)
    canvas.drawString(MARGIN, ty, "T H E   Y O G A   S E N S E I   ·   F R E E   G U I D E")
    canvas.rect(MARGIN, ty - 6 * mm, 18 * mm, 1.4, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Cormorant-B", 43)
    canvas.drawString(MARGIN, ty - 22 * mm, "Yoga for Beginners")
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Cormorant-SB", 26)
    canvas.drawString(MARGIN, ty - 33 * mm, "The Starter Guide")
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Inter", 10.5)
    for i, line in enumerate([
        "Everything you need to begin — the gear that's worth it, eight",
        "foundational poses, a 10-minute routine, and what to skip.",
        "No flexibility required.",
    ]):
        canvas.drawString(MARGIN, ty - 44 * mm - i * 5.4 * mm, line)
    canvas.setFillColor(MUTED)
    canvas.setFont("Inter-SB", 8.5)
    canvas.drawString(MARGIN, 15 * mm, "BY MARVIN SMIT  ·  THEYOGASENSEI.COM")
    canvas.restoreState()


def build():
    os.makedirs(OUT_DIR, exist_ok=True)
    frame = Frame(MARGIN, 16 * mm, CONTENT_W, PAGE_H - 16 * mm - 16 * mm, id="body")
    doc = BaseDocTemplate(
        OUT, pagesize=A4, title="The Yoga for Beginners Starter Guide",
        author="Marvin Smit — The Yoga Sensei",
        subject="A calm, honest, illustrated starter guide to yoga for beginners.",
    )
    doc.addPageTemplates([
        PageTemplate(id="Cover", frames=[frame], onPage=cover),
        PageTemplate(id="Body", frames=[frame], onPage=footer),
    ])

    disclosure = ("Some product links are affiliate links: if you buy through them I may earn a small "
                  "commission, at no extra cost to you. I only list gear I'd actually use, researched from "
                  "specs and real reviews — no invented lab tests.")
    s = [NextPageTemplate("Body"), Spacer(1, 1), PageBreak()]

    # ---------- CONTENTS ----------
    toc_left = []
    toc_left += section("", "WHAT'S INSIDE", "Your starter guide")
    toc_left.append(Spacer(1, 6))
    for n, (t, d) in enumerate([
        ("What you actually need", "The gear that's worth it — and what to skip"),
        ("Eight poses to learn first", "With photos, cues, and when to ease off"),
        ("Your first 10-minute routine", "A gentle morning flow + a 2-week rhythm"),
        ("Five beginner mistakes", "The traps that make yoga harder than it is"),
        ("When to take it easy", "Simple, honest safety"),
        ("Sources & further reading", "Every claim, linked to read yourself"),
    ], 1):
        toc_left.append(Paragraph(f"<font color='#b04a2f'>{n:02d}</font>&nbsp;&nbsp; {t}", S_TOC))
        toc_left.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {d}", S_TOC_SUB))
    toc = Table([[toc_left, rimg(os.path.join(IMG, "aiko-persona", "aiko-meditation-back-view-sage-yoga-mat.png"), 62 * mm, ratio=0.72)]],
                colWidths=[CONTENT_W - 70 * mm, 70 * mm])
    toc.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (0, 0), 0),
                             ("LEFTPADDING", (1, 0), (1, 0), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    s.append(toc)
    s.append(Spacer(1, 10))
    s.append(Paragraph(
        "You don't need to be flexible, fit, or to buy anything to start yoga — just a clear bit of floor "
        "and ten quiet minutes. I'm Marvin; I've practised for years (not a certified instructor) and I "
        "write every word on The Yoga Sensei myself. This is what I'd tell a friend who asked how to begin. "
        "<i>General guidance, not medical advice — check with your doctor if you have an injury, a condition, "
        "or you're pregnant.</i>", S_BODY))
    s.append(PageBreak())

    # ---------- GEAR ----------
    s += section("01", "WHAT YOU ACTUALLY NEED", "Almost nothing — but a good mat helps")
    s.append(banner(os.path.join(IMG, "guides", "best-yoga-mat-for-beginners", "hero.webp"), h=40 * mm))
    s.append(Spacer(1, 9))
    s.append(Paragraph(
        "You can start with no equipment at all. The one thing worth buying is a mat: a grippy surface stops "
        "your hands and feet sliding apart — the single most common beginner frustration. My picks, by budget:",
        S_BODY))
    s.append(Spacer(1, 6))
    s.append(cards_grid([
        ("Gaiam Premium 6mm", "BUDGET · CUSHIONED", "Soft underfoot and cheap — the easiest first mat for most beginners.", go("gaiam-premium-6mm")),
        ("Retrospec Solana ½\"", "BUDGET · EXTRA-THICK", "Kind to sore knees and wrists on hard floors; a little less stable.", go("retrospec-solana-half-inch")),
        ("Jade Harmony", "BEST GRIP · ECO", "Natural rubber, superb dry grip. Contains latex — skip if allergic.", go("jade-harmony")),
        ("Liforme Original", "PREMIUM · ALIGNMENT", "A printed alignment guide on the surface for placing hands and feet.", go("liforme-original")),
        ("Manduka PRO", "BUY-IT-FOR-LIFE", "Heavy, near-indestructible, lifetime guarantee; slippery until broken in.", go("manduka-pro-6mm")),
    ]))
    s.append(Spacer(1, 9))
    s.append(Paragraph(
        f"Full breakdown: {lnk('best yoga mats for beginners', page('/guides/best-yoga-mat-for-beginners'))} · "
        f"{lnk('how to choose a mat', page('/guides/how-to-choose-a-yoga-mat'))}. Nice to have later (not now): "
        f"two {lnk('blocks', go('gaiam-yoga-block'))} and a {lnk('strap', go('manduka-yoga-strap'))}.", S_BODY))
    s.append(Spacer(1, 4))
    s.append(Paragraph(disclosure, S_SMALL))
    s.append(PageBreak())

    # ---------- POSES ----------
    s += section("02", "THE FOUNDATIONS", "Eight poses to learn first")
    s.append(Paragraph(
        "Learn these and you can follow almost any beginner class. Move slowly, breathe through your nose, "
        "and bend your knees freely — a long, straight back always beats straight legs.", S_BODY))
    s.append(Spacer(1, 8))
    AP = os.path.join(IMG, "aiko-persona")
    PO = os.path.join(IMG, "poses")
    poses = [
        (os.path.join(AP, "aiko-rolling-out-sage-yoga-mat.png"), "Mountain Pose", "Tadasana",
         "Stand tall, feet hip-width, weight even, crown lifting. The quiet base for every standing pose.",
         "you feel light-headed — soften the knees.", None),
        (os.path.join(IMG, "poses", "sun-salutation", "in-pose.webp"), "Cat-Cow", "Marjaryasana–Bitilasana",
         "On hands and knees: inhale and arch, exhale and round. Warms the spine in under a minute.",
         "your wrists complain — come to fists or forearms.", None),
        (os.path.join(AP, "aiko-childs-pose-sage-yoga-mat.png"), "Child's Pose", "Balasana",
         "Hips back toward the heels, arms forward, forehead down. Your rest button — return any time.",
         "your knees hurt — widen them or add a cushion.", page('/poses/childs-pose')),
        (os.path.join(PO, "downward-facing-dog", "in-pose.webp"), "Downward Dog", "Adho Mukha Svanasana",
         "Hips up and back into an inverted V. Bend the knees freely; the straight back is the goal.",
         "wrists ache — press the floor away, share the load.", page('/poses/downward-facing-dog')),
        (os.path.join(AP, "aiko-cobra-pose-warm-yoga-studio.png"), "Cobra", "Bhujangasana",
         "Lie on your front and lift the chest with the back muscles, hands light. A gentle backbend.",
         "your lower back pinches — lift lower.", page('/poses/cobra-pose')),
        (os.path.join(AP, "aiko-warrior-ii-yoga-pose.png"), "Warrior II", "Virabhadrasana II",
         "Step wide, turn one foot out, bend that knee over the ankle, reach the arms long. Strong and steady.",
         "the front knee caves in — track it over the toes.", page('/poses/warrior-ii')),
        (os.path.join(AP, "aiko-meditation-back-view-sage-yoga-mat.png"), "Standing Forward Fold", "Uttanasana",
         "Hinge from the hips and fold over soft knees, head heavy. Releases the whole back of the body.",
         "you feel dizzy rising — come up slowly.", None),
        (os.path.join(AP, "aiko-upward-facing-dog-yoga-pose.png"), "Sun Salutation A", "Surya Namaskar A",
         "The flowing sequence that links several of these poses, one breath per move. The heart of most classes.",
         "you're rushing — slow the breath or do fewer rounds.", page('/poses/sun-salutation')),
    ]
    for i, p in enumerate(poses):
        s.append(pose_row(*p))
        if i == 3:
            s.append(PageBreak())
            s += section("02", "THE FOUNDATIONS", "Eight poses to learn first")
            s.append(Spacer(1, 4))
    s.append(PageBreak())

    # ---------- ROUTINE ----------
    s += section("03", "YOUR FIRST ROUTINE", "A gentle 10-minute morning flow")
    s.append(banner(os.path.join(IMG, "guides", "morning-yoga-routine", "hero.webp"), h=42 * mm))
    s.append(Spacer(1, 9))
    s.append(Paragraph("Move slowly, one breath at a time, and skip anything that doesn't feel right first thing.", S_BODY))
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
        s.append(Paragraph(f"<b><font color='#b04a2f'>{i:02d}</font></b> &nbsp;&nbsp;{step}", st(f"r{i}", fontSize=10.3, leading=15, spaceAfter=6)))
    s.append(Spacer(1, 4))
    s.append(Paragraph(
        f"Full version with 5/15/30-minute options: {lnk('the morning yoga routine guide', page('/guides/morning-yoga-routine'))}.",
        S_BODY))
    s.append(Spacer(1, 6))
    s.append(callout("A gentle two-week rhythm",
            "<font name='Inter-SB' color='#2b2a26'>Week 1 — just show up.</font> Three short sessions; only the first four poses, 5–10 minutes. "
            "<font name='Inter-SB' color='#2b2a26'>Week 2 — add a little.</font> Three or four sessions of 10–15 minutes; add a Sun Salutation and "
            "Warrior II. <font name='Inter-SB' color='#2b2a26'>After that</font> — keep the 10-minute flow most mornings and explore new poses when curious."))
    s.append(PageBreak())

    # ---------- MISTAKES + SAFETY ----------
    s += section("04", "AVOID THE COMMON TRAPS", "Five beginner mistakes")
    for t, d in [
        ("Rushing the breath.", "Let slow, nose breathing set the pace — not the other way around."),
        ("Chasing flexibility.", "You get flexible by practising; you don't need it to begin. Forcing a stretch is how people get hurt."),
        ("Holding the breath.", "It sneaks in the moment a pose gets hard. Keep it flowing and the pose eases."),
        ("Comparing yourself.", "To the person next to you, or to a video. Their body and years of practice aren't yours."),
        ("Skipping the final rest.", "Two quiet minutes at the end is where the practice settles. Don't cut it."),
    ]:
        s.append(Paragraph(f"<font name='Inter-SB' color='#2b2a26'>{t}</font> {d}", st("m", fontSize=10, leading=15, spaceAfter=8)))
    s.append(Spacer(1, 6))
    s.append(callout("When to take it easy",
            "Yoga is generally safe when practised mindfully, but go gently, get a professional's eye, or skip "
            "poses if you have a recent injury, a back / neck / wrist / shoulder problem, uncontrolled high blood "
            "pressure, or you're pregnant. Sharp pain, dizziness, or pressure in the head are stop signals — come "
            "out of the pose. None of this is medical advice; when in doubt, ask your doctor.", tone="olive"))
    s.append(PageBreak())

    # ---------- SOURCES + CLOSE ----------
    s += section("05", "READ THE SOURCES YOURSELF", "Sources & further reading")
    s.append(Paragraph("The research behind the health notes in this guide — all free to read:", S_BODY))
    s.append(Spacer(1, 2))
    for t, d, u in [
        ("NCCIH — Yoga: What You Need To Know", "Plain-language overview of yoga, benefits and safety, from the US National Institutes of Health.", "https://www.nccih.nih.gov/health/yoga-what-you-need-to-know"),
        ("Pascoe et al. (2017) — Yoga & stress-related physiological measures", "A meta-analysis: reviews link a regular practice to lower stress and cortisol; studies are small and mixed.", "https://pubmed.ncbi.nlm.nih.gov/29220801/"),
        ("Bhavanani et al. — How effective is Sun Salutation (24-week study)", "Students who practised Sun Salutations six days a week improved push-ups and sit-ups.", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3289222/"),
        ("CDC — Physical Activity Guidelines for Adults", "About 150 minutes of moderate movement a week; short daily sessions add up fast.", "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"),
    ]:
        s.append(Paragraph(lnk(t, u), S_SRC := st("src", fontName="Inter-SB", fontSize=9.5, leading=13, spaceAfter=1)))
        s.append(Paragraph(d, S_SMALL))
        s.append(Spacer(1, 3))
    s.append(Spacer(1, 4))
    s.append(Paragraph("Keep going — free on the site", S_H2))
    s.append(Paragraph(
        f"&bull;&nbsp; {lnk('Yoga for Beginners — the full guide', page('/guides/yoga-for-beginners'))}<br/>"
        f"&bull;&nbsp; {lnk('Sun Salutation A — step by step', page('/poses/sun-salutation'))}<br/>"
        f"&bull;&nbsp; {lnk('Best yoga mats for beginners', page('/guides/best-yoga-mat-for-beginners'))}", S_BODY))
    s.append(Spacer(1, 8))
    s.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=8))
    s.append(Paragraph(
        "You're reading this because you joined the weekly email — one short, calm email a week, unsubscribe in "
        "one click any time. Hit reply if anything here doesn't work; it comes straight to me.", S_NOTE))
    s.append(Paragraph("— Marvin, The Yoga Sensei &nbsp;·&nbsp; hello@theyogasensei.com", S_NOTE))

    doc.build(s)
    print("OK", OUT.replace(ROOT, "").replace("\\", "/"))


if __name__ == "__main__":
    build()
