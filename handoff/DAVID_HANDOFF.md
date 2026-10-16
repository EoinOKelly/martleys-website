# Martley's website handoff

Hi David,

Here's the [current website preview](https://martleys-website.vercel.app/) and a folder of JPG/PNG images for the WordPress build. The React source Eoin sent is there as a design reference; the layout and interactions are easiest to see in the preview.

## Images

The `images/` folder has all 24 image assets from the frontend (21 JPGs and 3 PNGs, about 9.4 MB). The WebP photos have been exported as high-quality JPGs, while existing JPGs and PNGs have been copied as they are. The preview site still uses its original WebP files.

The filenames should make most images easy to find: `martleys-hero.jpg` is the homepage video poster, the `martleys-fleet-01.jpg` to `martleys-fleet-07.jpg` files are the fleet gallery, and the two `carlow-timetable-*.jpg` files are the timetable graphics. `martleys-logo.png` is the header logo. The small favicon remains an SVG in the source code.

## Pages

| Preview page | What it covers |
| --- | --- |
| `/` | Homepage, services, fleet and contact/quote sections. |
| `/accessible-transport/`, `/tours/`, `/festival-shuttles/`, `/concerts-events/` | Standard service page design. |
| `/carlow-service/` | Carlow service information, fares and timetable. |
| `/tickets/` | The earlier journey-first ticket page you asked to see again. |
| `/tickets/school/`, `/tickets/concert/` | The same ticket page with School or Events selected. |
| `/careers/` | Careers enquiry page. |

The ticket page is a design preview. It does not search live tickets or take payment yet; those parts will need the WordPress ticketing setup. There's also a separate Ne-Yo & Akon concert page example in `src/ConcertTicketPage.jsx`. Its dates have passed, and it isn't currently shown at `/tickets/concert/`, but it may help with future event-specific ticket pages.

## A few build notes

- The icons now use Lucide, as you suggested. The frontend's icon mapping is in `src/SiteIcon.jsx`.
- The quote form opens an email rather than submitting to a backend.
- Some registration and timetable links still go to the existing Martley's WordPress site, so their final destinations will need checking at launch.

It would be helpful to confirm which WordPress products and checkout rules should be used for school and event tickets, whether individual concerts need their own ticket pages, and which timetable and registration links should be carried over.

If useful, the frontend runs locally with `npm install` and `npm run dev`.
