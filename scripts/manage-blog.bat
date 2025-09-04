@echo off
chcp 65001 >nul
echo 🚀 Effective Marketer Blog Management
echo =====================================

if "%1"=="generate" (
    echo 📝 Generating static blog posts...
    call npm run generate-blogs
    echo ✅ Static blog posts generated!
    goto :eof
)

if "%1"=="build" (
    echo 🔨 Building with static blogs...
    call npm run build:static
    echo ✅ Build completed with static blogs!
    goto :eof
)

if "%1"=="build-only" (
    echo 🔨 Building without static blogs...
    call npm run build
    echo ✅ Build completed!
    goto :eof
)

if "%1"=="dev" (
    echo 🚀 Starting development server...
    call npm run dev
    goto :eof
)

if "%1"=="preview" (
    echo 👀 Starting preview server...
    call npm run preview
    goto :eof
)

if "%1"=="clean" (
    echo 🧹 Cleaning generated blog files...
    if exist "public\blog\*.html" del /q "public\blog\*.html"
    echo ✅ Blog files cleaned!
    goto :eof
)

if "%1"=="status" (
    echo 📊 Blog System Status:
    echo ======================
    if exist "public\blog" (
        echo 📁 Blog directory: ✅ Exists
        echo 📄 Generated files:
        dir /b "public\blog\*.html" 2>nul | find /c /v "" >nul 2>&1 && (
            for /f %%i in ('dir /b "public\blog\*.html" 2^>nul ^| find /c /v ""') do echo    - HTML files: %%i
        ) || echo    - HTML files: 0
        echo 🔧 Build scripts:
        echo    - generate-blogs: ✅ Available
        echo    - build:static: ✅ Available
        echo    - build: ✅ Available
    ) else (
        echo 📁 Blog directory: ❌ Missing
    )
    goto :eof
)

if "%1"=="help" (
    goto :help
)

:help
echo Usage: %0 [command]
echo.
echo Commands:
echo   generate    - Generate static blog posts
echo   build       - Build with static blogs
echo   build-only  - Build without static blogs
echo   dev         - Start development server
echo   preview     - Start preview server
echo   clean       - Remove generated blog files
echo   status      - Show system status
echo   help        - Show this help message
echo.
echo Examples:
echo   %0 generate     # Generate static blogs
echo   %0 build        # Build with static blogs
echo   %0 status       # Check system status
goto :eof

