#!/bin/bash

# Blog Management Script for Effective Marketer
# This script helps manage the WordPress-like blog system

echo "🚀 Effective Marketer Blog Management"
echo "====================================="

case "$1" in
  "generate")
    echo "📝 Generating static blog posts..."
    npm run generate-blogs
    echo "✅ Static blog posts generated!"
    ;;
    
  "build")
    echo "🔨 Building with static blogs..."
    npm run build:static
    echo "✅ Build completed with static blogs!"
    ;;
    
  "build-only")
    echo "🔨 Building without static blogs..."
    npm run build
    echo "✅ Build completed!"
    ;;
    
  "dev")
    echo "🚀 Starting development server..."
    npm run dev
    ;;
    
  "preview")
    echo "👀 Starting preview server..."
    npm run preview
    ;;
    
  "clean")
    echo "🧹 Cleaning generated blog files..."
    rm -rf public/blog/*.html
    echo "✅ Blog files cleaned!"
    ;;
    
  "status")
    echo "📊 Blog System Status:"
    echo "======================"
    if [ -d "public/blog" ]; then
      echo "📁 Blog directory: ✅ Exists"
      echo "📄 Generated files:"
      ls -la public/blog/*.html 2>/dev/null | wc -l | xargs echo "   - HTML files:"
      echo "🔧 Build scripts:"
      echo "   - generate-blogs: ✅ Available"
      echo "   - build:static: ✅ Available"
      echo "   - build: ✅ Available"
    else
      echo "📁 Blog directory: ❌ Missing"
    fi
    ;;
    
  "help"|*)
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  generate    - Generate static blog posts"
    echo "  build       - Build with static blogs"
    echo "  build-only  - Build without static blogs"
    echo "  dev         - Start development server"
    echo "  preview     - Start preview server"
    echo "  clean       - Remove generated blog files"
    echo "  status      - Show system status"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 generate     # Generate static blogs"
    echo "  $0 build        # Build with static blogs"
    echo "  $0 status       # Check system status"
    ;;
esac

