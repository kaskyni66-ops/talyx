# TALYX Smart Jewelry Lab

> Material Innovation for the Future of Smart Jewelry

B2B innovation lab website for next-generation smart jewelry materials and concepts.

## Structure

```
├── index.html          # Home
├── materials.html      # Materials Lab
├── concepts.html       # Concepts
├── services.html       # Services
├── knowledge.html      # Knowledge Center
├── about.html          # About
├── book.html           # Book an Innovation Review
├── css/style.css       # Design system (tokens + components)
├── js/main.js          # Interactions (carousel, FAQ, filters, etc.)
└── images/             # 18 WebP product renders (2.8MB)
```

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on GitHub: github.com/new
#    Name: talyx  |  Public  |  Do NOT initialize

# 2. Push this code
git remote add origin https://github.com/YOUR_USERNAME/talyx.git
git push -u origin main

# 3. Enable Pages: Settings → Pages → Source: Deploy from branch → main / root
#    Site goes live at: https://YOUR_USERNAME.github.io/talyx/
```

## Custom Domain

1. Buy domain (Cloudflare Registrar / Namecheap / GoDaddy)
2. In repo: Settings → Pages → Custom domain → enter your domain
3. Add DNS records at your registrar:
   - A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME: www → YOUR_USERNAME.github.io
4. Wait 10-30 min for DNS propagation
