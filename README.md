# IZZINITY Static Website

Website ini dibina menggunakan **pure HTML, CSS, dan Vanilla JS** (tiada backend, tiada build step) dan sesuai deploy terus ke Cloudflare Pages.

## Struktur Fail

- `index.html`
- `photography.html`
- `photobooth.html`
- `design-sublimation.html`
- `portfolio.html`
- `contact.html`
- `styles.css`
- `script.js`
- `assets/favicon.svg`

> Nota: Untuk galeri portfolio, sediakan fail imej dalam `assets/` dengan nama:
> `portfolio-1.jpg` hingga `portfolio-12.jpg`.

## Deploy ke Cloudflare Pages

1. Push repo ini ke GitHub/GitLab.
2. Di Cloudflare Pages, pilih **Create a project** dan connect repo anda.
3. Gunakan tetapan berikut:
   - **Framework preset**: `None`
   - **Build command**: `none` (biarkan kosong)
   - **Build output directory**: `/`
4. Deploy.

## Local Preview

Boleh preview secara local dengan static server ringkas, contoh:

```bash
npx serve .
```

Atau buka `index.html` terus dalam browser.
