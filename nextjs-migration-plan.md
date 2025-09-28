# Next.js Migration Plan

## Create New Web Service on Render

### 1. Create New Next.js Project
```bash
# Create new directory
mkdir effectivemarketer-nextjs
cd effectivemarketer-nextjs

# Initialize Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install additional dependencies
npm install react-helmet-async lucide-react
```

### 2. Migrate Components
Copy your existing components from `src/components/` to the new Next.js project.

### 3. Create Pages
Convert your React Router pages to Next.js pages:
```
app/
├── page.tsx (homepage)
├── ai-topical-map/
│   └── page.tsx
├── ai-seo-agency-usa/
│   └── page.tsx
├── ai-seo-agency-vietnam/
│   └── page.tsx
├── google-autosuggest-ranking/
│   └── page.tsx
├── ai-seo/
│   └── page.tsx
├── case-studies/
│   └── page.tsx
└── api/
    └── blog/
        └── webhook/
            └── route.ts
```

### 4. Add SEO to Each Page
```typescript
// app/ai-topical-map/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Topical Map Services | Effective Marketer',
  description: 'Advanced AI topical mapping services...',
  keywords: 'AI topical map, topical mapping...',
  openGraph: {
    title: 'AI Topical Map Services | Effective Marketer',
    description: 'Advanced AI topical mapping services...',
  },
}

export default function AITopicalMapPage() {
  return (
    // Your page content
  )
}
```

### 5. Deploy to Render
- Create new Web Service
- Root Directory: `effectivemarketer-nextjs`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

### 6. Benefits:
- ✅ **True SSR**: Each page rendered on server
- ✅ **Better SEO**: Full HTML content for each page
- ✅ **Dynamic**: Can fetch data from APIs
- ✅ **Modern**: Latest Next.js features
- ✅ **Performance**: Optimized loading

### 7. Migration Effort:
- **Time**: 2-3 days
- **Complexity**: Medium
- **Risk**: Low (can test alongside current setup)
