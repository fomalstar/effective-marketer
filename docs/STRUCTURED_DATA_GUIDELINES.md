# Structured Data Guidelines

## Overview
- Only the following JSON-LD blocks are permitted globally:
  - Organization
  - Website
- Page-level schema must be minimal: Service, Article, FAQPage, BreadcrumbList as needed.
- **No review schema** unless a page displays first-party reviews that satisfy Google’s documentation.
- **No articleBody dumps** or large text blobs injected into JSON-LD.

## Build Process Notes
- `FINAL-ULTIMATE-EXTRACTOR.cjs` must never reintroduce a `<!-- SEO CONTENT IN HEAD -->` block containing articleBody.
- Route-specific structured data should live in the React page files and be small, typed objects.

## What Not To Do
- Do not add `Review`, `AggregateRating`, or `articleBody` to any schema.
- Avoid automated scripts that transform page HTML into JSON-LD.
- Do not replicate content into meta tags (kept minimal for SEO compliance).

## Deployment Reminder
- After modifying schema, run `npm run build` and redeploy backend to propagate changes.
