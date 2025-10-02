# Search Console Recovery Checklist

## Immediate Verification
- Request new crawl for `https://effectivemarketer.com/`
- Request indexing for each key route (`/google-autosuggest-ranking`, `/ai-seo`, `/ai-seo-agency-usa`, `/ai-seo-agency-uk`, `/ai-seo-agency-vietnam`, `/ai-seo-agency-uae`, `/ai-seo-agency-malaysia`, `/ai-seo-agency-france`, `/ai-seo-agency-bulgaria`)
- Verify canonical coverage report now shows each URL with status “Indexed, not submitted in sitemap” or “Submitted and indexed”

## Sitemap & Coverage
- Resubmit sitemap: `https://effectivemarketer.com/sitemap.xml`
- Confirm `Last read` updates within 24 hours
- Check `Pages` > `Indexed` for new entries
- Ensure there are no `Duplicate, submitted URL not selected as canonical`

## Core Web Vitals
- Monitor `Core Web Vitals` for `effectivemarketer.com` (should repopulate within 3-7 days)
- Use PageSpeed Insights for real-time LCP/FID/CLS for key templates
- Verify there are no blocking resources after redirect change

## Render & Hosting
- Confirm Render custom domain points directly to backend with rewrite (no 301 loop)
- Test sample routes: view-source to ensure titles/descriptions match route
- Confirm structured data appears once per page (no duplicates)

## After Reindexing
- Set reminder to re-run coverage report in 7 days
- Track AI/Autosuggest pages search performance in GSC
- Monitor for duplicate title/description warnings in `Enhancements`
- Maintain list of new URLs to request indexing as they ship
