# Portfolio CLI - Next.js Portfolio Project

پروژه پورتفولیو بهینه‌شده با Next.js 15 برای بهترین عملکرد و سرعت

## ویژگی‌های بهینه‌سازی

- ✅ **Next.js 15.3.1** با آخرین ویژگی‌های performance
- ✅ **Static Generation** برای صفحات استاتیک
- ✅ **Image Optimization** با next/image و AVIF/WebP
- ✅ **Font Optimization** با next/font (Google Fonts + Local Fonts)
- ✅ **SEO Optimization** با metadata کامل
- ✅ **Caching Headers** برای فایل‌های استاتیک
- ✅ **Docker Optimization** با multi-stage build
- ✅ **Code Splitting** خودکار
- ✅ **Compression** فعال

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 20+
- pnpm (یا npm/yarn)

### نصب dependencies

```bash
pnpm install
```

### اجرای development server

```bash
pnpm dev
```

### Build برای production

```bash
pnpm build
```

### اجرای production server

```bash
pnpm start
```

## استقرار با Docker

### Build Docker image

```bash
docker build -t portfolio-cli .
```

### اجرای container

```bash
docker run -p 3366:3366 portfolio-cli
```

### استفاده از docker-compose

```bash
docker-compose up -d
```

## متغیرهای محیطی

کپی کنید `.env.example` به `.env.local` و مقادیر را تنظیم کنید:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## بهینه‌سازی‌های اعمال شده

### 1. Next.js Config
- Compression فعال
- Image optimization با AVIF و WebP
- Package imports optimization
- Security headers

### 2. Font Optimization
- استفاده از `next/font/google` برای Google Fonts
- استفاده از `next/font/local` برای فونت‌های محلی
- Preload و display: swap

### 3. Static Generation
- صفحات با `force-static` و `revalidate`
- کاهش زمان پاسخ سرور

### 4. Image Optimization
- استفاده از next/image با quality و sizes
- Blur placeholder برای تصاویر
- Priority loading برای تصاویر مهم

### 5. Docker Optimization
- Multi-stage build
- Node.js 20 Alpine
- Health check
- بهینه‌سازی حجم image

## ساختار پروژه

```
portfolio_cli/
├── app/
│   ├── components/     # کامپوننت‌های React
│   ├── lib/           # Utilities و fonts
│   ├── providers/     # Context providers
│   ├── styles/        # CSS files
│   └── ...
├── public/            # فایل‌های استاتیک
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose config
└── next.config.ts     # Next.js configuration
```

## نکات مهم برای Production

1. **Environment Variables**: حتماً `NEXT_PUBLIC_SITE_URL` را تنظیم کنید
2. **Build**: از `pnpm build` برای build production استفاده کنید
3. **Docker**: از Dockerfile بهینه‌شده برای استقرار استفاده کنید
4. **Caching**: Headers برای caching فایل‌های استاتیک تنظیم شده است
5. **Monitoring**: Health check در Dockerfile اضافه شده است

## Performance Tips

- صفحات به صورت static generate می‌شوند
- تصاویر به صورت خودکار بهینه می‌شوند
- فونت‌ها با preload و swap بهینه شده‌اند
- Code splitting خودکار برای کاهش bundle size

## License

MIT
