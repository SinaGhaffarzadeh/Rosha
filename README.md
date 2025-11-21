# React Drawer Website

یک وب‌سایت React با قابلیت Drawer از سمت راست (RTL) که می‌توانید آن را با کشیدن از سمت چپ باز کنید.

## ویژگی‌ها

- ✅ Drawer از سمت راست که با کشیدن از سمت چپ باز می‌شود
- ✅ پشتیبانی از Touch Gestures (Swipe)
- ✅ پشتیبانی از Mouse Drag
- ✅ کلیک روی بخش‌ها برای نمایش محتوای دینامیک
- ✅ انیمیشن‌های Smooth
- ✅ Responsive Design
- ✅ Keyboard Navigation (ESC برای بستن)
- ✅ Accessibility (ARIA labels)

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js (نسخه 14 یا بالاتر)
- npm یا yarn

### نصب Dependencies

```bash
cd react-drawer-website
npm install
```

### اجرای پروژه در حالت Development

```bash
npm run dev
```

پروژه در آدرس `http://localhost:3000` اجرا می‌شود.

### Build برای Production

```bash
npm run build
```

فایل‌های build شده در پوشه `dist` قرار می‌گیرند.

### Preview Build

```bash
npm run preview
```

## انتشار روی GitHub Pages

این پروژه برای انتشار روی GitHub Pages آماده شده است. دو روش برای deployment وجود دارد:

### روش 1: استفاده از GitHub Actions (توصیه می‌شود - خودکار)

این روش به صورت خودکار با هر push به branch اصلی، سایت را deploy می‌کند.

#### مراحل:

1. **ایجاد Repository در GitHub:**
   - یک repository جدید در GitHub ایجاد کنید
   - نام repository را به خاطر بسپارید (مثلاً `react-drawer-website`)

2. **تنظیم Base Path:**
   - فایل `vite.config.js` را باز کنید
   - اگر نام repository شما متفاوت است، مقدار `base` را تغییر دهید:
   ```js
   base: process.env.NODE_ENV === 'production' ? '/نام-repository-شما/' : '/',
   ```
   - اگر repository شما `username.github.io` است، base را `/` قرار دهید

3. **فعال‌سازی GitHub Pages:**
   - به Settings > Pages در repository بروید
   - Source را روی "GitHub Actions" تنظیم کنید

4. **Push کردن کد:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

5. **نصب Dependencies:**
   ```bash
   npm install
   ```

6. **Deployment خودکار:**
   - با هر push به branch `main` یا `master`، GitHub Actions به صورت خودکار سایت را build و deploy می‌کند
   - می‌توانید وضعیت deployment را در تب "Actions" مشاهده کنید

### روش 2: استفاده از gh-pages (دستی)

اگر می‌خواهید به صورت دستی deploy کنید:

1. **نصب gh-pages:**
   ```bash
   npm install
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **تنظیم GitHub Pages:**
   - به Settings > Pages در repository بروید
   - Source را روی "Deploy from a branch" تنظیم کنید
   - Branch را `gh-pages` و folder را `/ (root)` انتخاب کنید

### آدرس سایت

بعد از deployment، سایت شما در آدرس زیر در دسترس خواهد بود:
- `https://username.github.io/repository-name/`
- یا اگر repository شما `username.github.io` است: `https://username.github.io/`

### نکات مهم:

- ⚠️ اگر نام repository را تغییر دادید، حتماً `base` در `vite.config.js` را به‌روزرسانی کنید
- ⚠️ بعد از اولین deployment، ممکن است چند دقیقه طول بکشد تا سایت در دسترس باشد
- ⚠️ اگر از GitHub Actions استفاده می‌کنید، اولین بار باید در Settings > Pages، Source را روی "GitHub Actions" تنظیم کنید

## ساختار پروژه

```
react-drawer-website/
├── src/
│   ├── components/
│   │   ├── Drawer/          # کامپوننت Drawer
│   │   ├── Sidebar/          # محتوای داخل Drawer
│   │   ├── SectionList/      # لیست بخش‌ها
│   │   ├── MainContent/      # محتوای اصلی
│   │   └── MenuButton/       # دکمه منو
│   ├── context/
│   │   └── AppContext.jsx    # Context برای State Management
│   ├── hooks/
│   │   ├── useDrawer.js      # Hook برای مدیریت Drawer
│   │   └── useSwipeGesture.js # Hook برای Gesture Handling
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## استفاده

### باز کردن Drawer

- کلیک روی دکمه منو (گوشه بالا راست)
- کشیدن از سمت چپ صفحه (Swipe Right)
- کلیک روی هر بخش در لیست

### بستن Drawer

- کلیک روی دکمه × داخل Drawer
- کلیک روی Overlay (پس‌زمینه تیره)
- کشیدن به سمت چپ (Swipe Left)
- فشردن کلید ESC

## سفارشی‌سازی

### تغییر محتوای بخش‌ها

فایل `src/components/Sidebar/Sidebar.jsx` را ویرایش کنید و object `SECTIONS_DATA` را تغییر دهید.

### تغییر استایل‌ها

فایل‌های CSS Module در هر کامپوننت را ویرایش کنید:
- `Drawer.module.css`
- `Sidebar.module.css`
- `SectionList.module.css`
- و غیره...

### تغییر رنگ‌ها و تم

می‌توانید متغیرهای CSS را در فایل‌های `.module.css` تغییر دهید.

## تکنولوژی‌های استفاده شده

- **React 18** - کتابخانه UI
- **Vite** - Build Tool و Dev Server
- **react-swipeable** - مدیریت Touch Gestures
- **CSS Modules** - استایل‌دهی با Scope

## مرورگرهای پشتیبانی شده

- Chrome (آخرین نسخه)
- Firefox (آخرین نسخه)
- Safari (آخرین نسخه)
- Edge (آخرین نسخه)
- مرورگرهای موبایل (iOS Safari, Chrome Mobile)

## مجوز

این پروژه برای استفاده شخصی و تجاری آزاد است.

