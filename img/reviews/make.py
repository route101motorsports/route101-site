import numpy as np, os
from PIL import Image, ImageDraw
from scipy import ndimage

A = '/mnt/user-data/attachments/6a54278f-a5d3-5d90-8a78-c8e4cdddf122/'
OUT = os.path.dirname(os.path.abspath(__file__)) + '/out/'
os.makedirs(OUT, exist_ok=True)


def load(f):
    return np.asarray(Image.open(A + f).convert('RGBA')).astype(np.float32)


def white_to_alpha(arr):
    rgb, a0 = arr[..., :3], arr[..., 3] / 255.0
    a = np.clip((255 - rgb.min(axis=2)) / 255.0, 0, 1)
    safe = np.where(a > 0, a, 1)[..., None]
    col = np.clip((rgb - 255 * (1 - a[..., None])) / safe, 0, 255)
    return np.dstack([col, np.clip(a * a0, 0, 1) * 255])


def trim(arr, thr=12):
    ys, xs = np.where(arr[..., 3] > thr)
    return arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def img(arr):
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA')


# ---------- Google: white background -> transparent ----------
google = trim(white_to_alpha(load('7316d4ff-image.png')))

# ---------- Yelp: drop the white outline and background ----------
yelp = trim(white_to_alpha(load('f57fa88a-image.webp')))

# ---------- Tripadvisor: black bg, white text, green circle with black owl ----------
t = load('220c7c01-image.jpg')
rgb = t[..., :3]
lum = rgb.mean(axis=2)
green = (rgb[..., 1] > rgb[..., 0] + 40) & (rgb[..., 1] > 120)
dark = lum < 60
lab, n = ndimage.label(dark)
edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(edge))
# owl circle region = filled green blob
circ = ndimage.binary_fill_holes(ndimage.binary_closing(green, iterations=3))
bg &= ~circ
out = np.zeros_like(t)
# text (bright, outside circle) -> near black; alpha from brightness
text_a = np.clip((lum - 40) / (215), 0, 1)
out[..., :3] = 20
out[..., 3] = np.where(circ, 0, text_a * 255)
# inside circle keep original colours, opaque
inside = circ
out[inside, :3] = rgb[inside]
out[inside, 3] = 255
# soften circle edge using green-ness at the boundary
ring = circ & ~ndimage.binary_erosion(circ, iterations=1)
out[ring, 3] = 200
trip = trim(out)

# ---------- Facebook: blue square f + "acebook" (wordmark minus its f, minus (R)) ----------
sqa = load('f8223305-image.png')
srgb = sqa[..., :3]
blue = (srgb[..., 2] > srgb[..., 0] + 50) & (sqa[..., 3] > 200)
shape = ndimage.binary_fill_holes(ndimage.binary_closing(blue, iterations=2))
ys, xs = np.where(shape)
sq = sqa.copy()
sq[..., 3] = np.where(shape, 255, 0)
sq = sq[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
wm = load('7ef06e42-image.png')
wa = wm[..., 3] > 40
lab2, n2 = ndimage.label(wa)
objs = [(sl, i + 1) for i, sl in enumerate(ndimage.find_objects(lab2))]
objs = [o for o in objs if (o[0][0].stop - o[0][0].start) > wm.shape[0] * 0.3]  # letters only (drops (R))
objs.sort(key=lambda o: o[0][1].start)
f_label = objs[0][1]
keep = np.isin(lab2, [o[1] for o in objs[1:]])
w2 = wm.copy(); w2[..., 3] = np.where(ndimage.binary_dilation(keep, iterations=2), wm[..., 3], 0)
word = trim(w2)
H = word.shape[0]
sq_i = img(sq).resize((H, H), Image.LANCZOS)
gap = int(H * 0.16)
canvas = Image.new('RGBA', (H + gap + word.shape[1], H), (0, 0, 0, 0))
canvas.alpha_composite(sq_i, (0, 0))
canvas.alpha_composite(img(word), (H + gap, 0))
facebook = np.asarray(canvas).astype(np.float32)


# ---------- stars ----------
GOLD = (251, 188, 4, 255)


def star_row(w, h):
    S = 4  # supersample
    W, Hh = w * S, h * S
    im = Image.new('RGBA', (W, Hh), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    gap = Hh * 0.18
    size = min(Hh, (W - gap * 4) / 5)
    tot = size * 5 + gap * 4
    x0 = (W - tot) / 2
    for k in range(5):
        cx = x0 + k * (size + gap) + size / 2
        cy = Hh / 2
        R, r = size / 2, size / 2 * 0.45
        pts = []
        for j in range(10):
            ang = -np.pi / 2 + j * np.pi / 5
            rad = R if j % 2 == 0 else r
            pts.append((cx + rad * np.cos(ang), cy + rad * np.sin(ang) + size * 0.04))
        d.polygon(pts, fill=GOLD)
    return im.resize((w, h), Image.LANCZOS)


def with_stars(arr):
    logo = img(arr)
    w, h = logo.size
    sh = int(max(h * 0.30, w * 0.075))
    sh = min(sh, int(w / 5.9))
    sw = int(sh * 5.9)
    stars = star_row(sw, sh)
    gap = int(sh * 0.45)
    W = max(w, sw)
    c = Image.new('RGBA', (W, h + gap + sh), (0, 0, 0, 0))
    c.alpha_composite(logo, ((W - w) // 2, 0))
    c.alpha_composite(stars, ((W - sw) // 2, h + gap))
    return np.asarray(c).astype(np.float32)


logos = {'google': google, 'yelp': yelp, 'tripadvisor': trip, 'facebook': facebook}
CW, CH, PADW, PADH = 600, 240, 540, 200
K = 300
for name, arr in logos.items():
    for suffix, a in (('', with_stars(arr)), ('-nostars', arr)):
        im = img(a)
        w, h = im.size
        s = min(K / (w * h) ** 0.5, PADW / w, PADH / h)
        im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
        c = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
        c.alpha_composite(im, ((CW - im.width) // 2, (CH - im.height) // 2))
        c.save(OUT + 'review-' + name + suffix + '.png', optimize=True)
        im.save(OUT + 'tight-review-' + name + suffix + '.png', optimize=True)
        print(name + suffix, im.size)

# contact sheets
for bgname, bg in [('cream', (245, 244, 241)), ('white', (255, 255, 255)), ('dark', (20, 20, 20))]:
    sheet = Image.new('RGBA', (4 * 300, 130), bg + (255,))
    for i, n in enumerate(logos):
        t = Image.open(OUT + 'review-' + n + '.png').resize((300, 120), Image.LANCZOS)
        sheet.alpha_composite(t, (i * 300, 5))
    sheet.convert('RGB').save(OUT + '../sheet-' + bgname + '.png')
