# Images

Everything in this folder is referenced from the data files, not from the
components, so swapping an asset is a one-line change.

## Already in place

| File                      | Used for                               | Source                              |
| ------------------------- | -------------------------------------- | ----------------------------------- |
| `moustapha-headshot.webp` | Hero portrait (4:5)                    | Supplied photo                      |
| `hafiz-makkah.webp`       | Focus — Becoming a Hafiz               | Supplied photo, Masjid al-Haram     |
| `ironman-mdot.png`        | Focus — Ironman Journey                | Official IRONMAN M-dot mark         |
| `football.png`            | Timeline — Football                    | Supplied photo                      |
| `mystical-math.png`       | Timeline — Mystical Math (Egypt)       | `egypt.png`                         |
| `futtuwa-retreat.png`     | Timeline — Futtuwa Retreat (Spain)     | `spain.png`                         |
| `brazil-immersion.png`    | Timeline — BCLC Brazil Immersion       | `brazil.png`                        |
| `nyu-logo.png`            | Timeline — New York University         | Supplied NYU wordmark               |
| `choate-crest.png`        | Timeline — Choate Rosemary Hall        | Official coat of arms               |
| `tedx-talk.jpg`           | Timeline — TEDx Speaker                | YouTube video thumbnail             |
| `synchrony-deck.jpg`      | Timeline — Synchrony Case Competition  | Title slide of the Canva deck       |
| `mous-apps-site.jpg`      | Timeline — Mous Apps                   | Screenshot of mousapps.com          |
| `hill-web-works-site.jpg` | Timeline + Work — Hill Web Works       | Screenshot of hillwebworks.com      |
| `app-huda.jpg`            | Work — Hudā                            | Screenshot of huda-app.com          |
| `app-samba.jpg`           | Work — Samba                           | Screenshot of the Samba site        |
| `app-genius.jpg`          | Work — Genius                          | Screenshot of genius-site.com       |
| `app-plates.jpg`          | Work — Plates                          | Screenshot of plates-site.com       |
| `app-styld.jpg`           | Work — Styld                           | Screenshot of styldd.com            |
| `app-stackd.jpg`          | Work — Stackd                          | Screenshot of toostackd.com         |

Site previews were captured at a 1280×720 desktop viewport and cropped to 16:9.
Re-capture any of them the same way if a site is redesigned.

## Notes on cropping

Portrait source photos set `media.focalPoint` (an `object-position` value) so
faces survive the crop into a landscape frame. Adjust that value rather than
re-cropping the file.

Logos set `media.fit` to `contain` so the mark sits inside the frame instead of
being cropped.
