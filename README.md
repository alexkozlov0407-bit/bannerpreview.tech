# bannerpreview.tech

Discord server banner and asset previewer built with React, Vite, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Deploy for free with Cloudflare Pages

Cloudflare Pages is a good fit for this app because it serves the generated Vite
files directly. No server, database, or Heroku dyno is required.

1. Push this project to a GitHub repository.
2. Sign in to the Cloudflare dashboard and open **Workers & Pages**.
3. Choose **Create application** → **Pages** → **Connect to Git**.
4. Select the GitHub repository.
5. Use these build settings:

   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `20` or newer

6. Save and deploy. Cloudflare will provide a temporary `*.pages.dev` URL.

## Connect `bannerpreview.tech`

In the Cloudflare Pages project:

1. Open **Custom domains** → **Set up a custom domain**.
2. Enter `bannerpreview.tech` and complete the prompted DNS setup.
3. In `.tech Domains`, open the domain's DNS management page.
4. If Cloudflare asks you to use its nameservers, replace the registrar's
   nameservers with the two nameservers Cloudflare gives you. This is the
   simplest option because Cloudflare then manages the DNS and HTTPS
   certificate automatically.
5. If Cloudflare offers a CNAME setup instead, add the exact CNAME record it
   provides. Do not guess the target value.
6. Add `www.bannerpreview.tech` as a second custom domain if you want the
   `www` address, then configure a redirect to the root domain.

DNS changes can take a little while to propagate. Cloudflare Pages will issue
HTTPS automatically after the domain is verified.

## Deploy updates

After the initial connection, every push to the selected GitHub branch rebuilds
and deploys the site automatically:

```bash
git add .
git commit -m "Update bannerpreview.tech"
git push origin main
```

The app keeps all uploaded images in the browser; no backend service is needed.
