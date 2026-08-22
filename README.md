# Fixed Netlify Radio

Upload this entire folder to Netlify/GitHub.

Put all MP3 files in `songs/`. Do not hard-code song names anywhere.

The Netlify build automatically creates `playlist.json`, including:
- filename
- title
- artist
- exact duration
- embedded cover art

The browser no longer tries to read MP3 metadata itself. This fixes the
"No suitable file reader found" error shown on mobile.

After adding/removing/renaming songs, redeploy the site so the playlist is
regenerated.

Important: if you use Netlify Drop, it must run the build. For the most
reliable setup, connect the project to GitHub and let Netlify run:
`npm run build`

Mobile browsers can still require one tap to start audio because autoplay is
blocked by the browser. The station itself remains synchronized using UTC.
