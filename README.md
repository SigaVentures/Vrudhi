# Vrudhi Designer Boutique — static website

A single-page static site (HTML + CSS + vanilla JS, no build step, no backend).
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, cPanel, etc.).

```
index.html        page markup, SEO meta, LocalBusiness structured data
css/styles.css    all styling (purple palette taken from the logo)
js/main.js        menu, Reel player, gallery filter + lightbox, WhatsApp enquiry
images/           optimised WebP photos from the boutique's Instagram + logo/icons
robots.txt, sitemap.xml
```

## Before going live

1. **Domain** – replace `YOUR-DOMAIN` in `robots.txt`, `sitemap.xml`, and uncomment the canonical tag in `index.html`.
   Change `og:image` and the JSON-LD `image`/`logo` to absolute URLs (for example `https://YOUR-DOMAIN/images/og-image.jpg`) so link previews work.
2. **Google Business Profile website link** – the profile currently lists `vrudhi.designer.boutique`, which did not load when checked on 11 Oct 2026. Point it to the new domain once this site is live.
3. **Owner review** – read through the About and Services wording. It is based on the boutique's own Google description, Instagram bio, captions and services poster, but the owner should approve it.
4. **Service-card stock photos** – the Mother–Daughter & Family Combos and Photoshoot Dresses cards use free Unsplash photos (Shadow Frames Photography: https://unsplash.com/photos/QPbdUtgiAi4 · Prashant Raje: https://unsplash.com/photos/VFZDPxc_Q9E), credited on the image. Replace them with the boutique's own photos when available (`images/service-combo-stock.webp`, `images/service-photoshoot-stock.webp`).
5. **Hero photo is a stock image** – the large hero photo (`images/hero-tamil-bride-purple-silk.webp`) is a free Unsplash photo by Bella Pon Fruitsia (https://unsplash.com/photos/wcgCFUi_Zws), used under the Unsplash License. It is credited on the image and does not show the boutique's own work. Replace it with a photo from the boutique's own shoot when one is available, and then remove the `photo-credit` line. The small inset photo is the boutique's real work.

## Verified details used (checked 11 Oct 2026)

| Item | Value | Source |
|---|---|---|
| Name | Vrudhi Designer Boutique ("& Tailoring" on their poster) | Google Business Profile, Instagram |
| Address | No. 56, 1st Floor, Villianur Main Rd, Pavazha Nagar, opp. Darling Bakery, Reddiarpalayam, Puducherry 605005 | Google profile + boutique's own poster (1st floor) |
| Phone / WhatsApp | +91 96001 19945 | Google profile; Instagram captions say "WhatsApp at 9600119945" |
| Hours | 10 am – 8:30 pm, closed Tuesday | Google profile |
| Rating | 4.7 from 173 Google reviews | Google profile. **Update this from time to time** (in the hero and Testimonials sections) |
| Map | cid 18160796765267542031 · 11.931496, 79.8016931 · WRJ2+HM | Google Maps |
| Review link | https://g.page/r/CQ_A1R9wHAj8EB0/review | Instagram bio |
| Services | Lehenga gowns, wedding blouse designing, customised stitching & designing, ladies & kids, mother & daughter combo, photoshoot dresses (incl. rental), plus corset making and 1-minute saree | Boutique poster in Reel DeGQyCwsICY, Google description, Instagram highlights |
| "15+ yrs exp", "Perfect Fit & Premium Finishing" | | Instagram bio |
| Tagline "We make you feel like a queen" | | Boutique poster |

**Reels featured:** the pinned Reel DT7l5cck1YV, then DeRnrTYM_H8, DeGQyCwsICY and DeLzsp5sR9T. These were picked as the pinned Reel plus the fashion Reels with the most visible likes. View counts weren't publicly available, so the site does not claim they are the most viewed.
To change one, edit `data-reel="…"`, the cover image and the "Watch on Instagram" link in the `#instagram` section.

**Testimonials** are quoted word-for-word from public Google reviews (names as shown on Google). Deepika Elango's review is cut short on Google's public view, so it ends with "…". The three short quotes are Google's own 5-star review highlights.

**Note:** the services Reel (DeGQyCwsICY) is a promo made with AI-generated imagery by an agency. Its frames showing models were left out of the gallery on purpose. Only the services card is used as its cover.

## How the interactive parts work

- **WhatsApp**: every WhatsApp button opens `wa.me/919600119945` with a pre-filled message. The enquiry form doesn't send or store anything. It writes your details into a WhatsApp message for the visitor to send.
- **Reels**: when a visitor clicks play, the official Instagram embed (`instagram.com/reel/ID/embed/`) loads in a pop-up. If Instagram is blocked, the cover image and "Watch on Instagram" link still work.
- **Map**: a lazy-loaded Google Maps place embed (place ID 0x3a5361216f90c961:0xfc081c701fd5c00f), which shows the labelled "Vrudhi Designer Boutique" pin. "Get Directions" opens Google Maps directions to the same listing. If it's blocked, a fallback card with an "Open in Google Maps" link shows instead.
