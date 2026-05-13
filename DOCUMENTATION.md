# توثيق ثيم Luxe Arabia — دليل الاستخدام الكامل

## نظرة عامة

ثيم **Luxe Arabia** ثيم احترافي مبني على محرك Twilight الخاص بمنصة سلة، مصمم خصيصاً للسوق الخليجي والعربي مع دعم كامل للغة العربية (RTL) والإنجليزية (LTR).

---

## هيكل الملفات

```
themes1/
├── theme.json                     ← بيانات الثيم الأساسية
├── config/
│   ├── settings.json              ← إعدادات لوحة التخصيص
│   └── layout.json                ← خريطة الصفحات والقوالب
├── src/
│   ├── styles/
│   │   ├── main.scss              ← ملف CSS الرئيسي
│   │   ├── _variables.scss        ← متغيرات الألوان والمسافات
│   │   ├── _base.scss             ← الأنماط الأساسية والـ Reset
│   │   ├── _typography.scss       ← الخطوط والنصوص
│   │   ├── _rtl.scss              ← دعم RTL الكامل
│   │   └── components/
│   │       ├── _buttons.scss
│   │       ├── _header.scss
│   │       ├── _footer.scss
│   │       ├── _hero.scss
│   │       ├── _product-card.scss
│   │       ├── _sections.scss
│   │       ├── _forms.scss
│   │       ├── _filters.scss
│   │       ├── _product-page.scss
│   │       └── _cart.scss
│   ├── js/
│   │   └── main.js                ← JavaScript الرئيسي
│   └── icons/
│       └── sprite.svg             ← SVG Sprite للأيقونات
├── views/
│   ├── layouts/
│   │   └── master.twig            ← القالب الرئيسي (HTML الأساسي)
│   ├── pages/
│   │   ├── index.twig             ← الصفحة الرئيسية
│   │   ├── product.twig           ← صفحة المنتج
│   │   ├── category.twig          ← صفحة التصنيف/المتجر
│   │   ├── cart.twig              ← صفحة السلة
│   │   ├── checkout.twig          ← صفحة الدفع
│   │   ├── search.twig            ← صفحة البحث
│   │   ├── about.twig             ← عن المتجر
│   │   ├── contact.twig           ← تواصل معنا
│   │   └── faq.twig               ← الأسئلة الشائعة
│   ├── sections/
│   │   ├── header.twig            ← الهيدر الكامل
│   │   ├── footer.twig            ← الفوتر الكامل
│   │   ├── announcement-bar.twig  ← شريط الإشعارات
│   │   ├── newsletter.twig        ← قسم النشرة البريدية
│   │   └── cart-drawer.twig       ← سلة التسوق المنزلقة
│   └── components/
│       └── product-card.twig      ← كارد المنتج
```

---

## التثبيت والإعداد

### 1. رفع الثيم على سلة
1. اذهب إلى لوحة تحكم سلة ← **المتجر** ← **الثيمات**
2. اضغط **رفع ثيم جديد**
3. ارفع ملف `.zip` للثيم
4. اضغط **تفعيل**

### 2. بناء ملفات CSS
```bash
# تثبيت المتطلبات
npm install sass

# بناء CSS
npx sass src/styles/main.scss dist/styles/main.css --style=compressed

# مراقبة التغييرات أثناء التطوير
npx sass src/styles/main.scss dist/styles/main.css --watch
```

### 3. استخدام Salla CLI
```bash
# تثبيت Salla CLI
npm install -g @salla.sa/cli

# ربط بمتجرك
salla login

# تشغيل البيئة التطويرية
salla theme serve

# رفع الثيم
salla theme publish
```

---

## إعدادات التخصيص

### الألوان
افتح **لوحة التحكم ← الثيم ← تخصيص** ثم اختر **الألوان**:

| الإعداد | الوصف | القيمة الافتراضية |
|---------|-------|-------------------|
| `color_primary` | اللون الأساسي | `#1A1A2E` |
| `color_secondary` | اللون الثانوي | `#F5F0E8` |
| `color_accent` | لون التمييز (ذهبي) | `#C9A84C` |
| `color_background` | خلفية الصفحة | `#FFFFFF` |
| `color_text_primary` | لون النص الأساسي | `#1A1A1A` |
| `color_text_secondary` | لون النص الثانوي | `#6B6B6B` |

### الخطوط
يدعم الثيم 5 خطوط عربية احترافية:
- **Tajawal** (افتراضي) — خفيف وعصري
- **Almarai** — أنيق ومقروء
- **Cairo** — رسمي ومتوازن
- **Noto Kufi Arabic** — كلاسيكي
- **Readex Pro** — حديث ومتعدد الأوزان

### الهيدر
- **نمط الهيدر**: ملون / شفاف / بصورة
- **هيدر ثابت**: يثبت أعلى الصفحة عند التمرير
- **شريط الإشعارات**: نص قابل للتخصيص مع خيار الإخفاء

### الصفحة الرئيسية
كل قسم يمكن إظهاره/إخفاؤه:
- السلايدر الرئيسي
- شريط المميزات الأربعة
- التصنيفات
- أحدث المنتجات (عدد قابل للتحكم: 4-20)
- الأكثر مبيعاً
- عروض اليوم مع عداد تنازلي
- البانر الترويجي
- شهادات العملاء
- آخر المقالات
- النشرة البريدية

---

## التكاملات

### Google Tag Manager
في لوحة التخصيص ← **التكاملات**، أدخل معرف GTM:
```
GTM-XXXXXXX
```

### Meta Pixel
```
أدخل Pixel ID في حقل "Meta Pixel ID"
```

### واتساب
أدخل رقم الهاتف مع كود الدولة (بدون +):
```
966501234567
```

### Tabby / Tamara
فعّل خيار إظهار شارة Tabby أو Tamara من قسم التكاملات. ستظهر تلقائياً على كروت المنتجات وصفحة المنتج للمنتجات التي تتجاوز 200 ريال.

---

## تخصيص الألوان برمجياً

كل الألوان موجودة كـ CSS Variables يمكن تغييرها مباشرة:

```css
:root {
  --color-primary:    #1A1A2E;
  --color-accent:     #C9A84C;
  --color-bg:         #FFFFFF;
  /* ... */
}
```

---

## إضافة صفحة جديدة

1. أنشئ ملف `views/pages/my-page.twig`
2. ابدأ بـ: `{% extends 'layouts/master' %}`
3. أضف المحتوى داخل: `{% block content %}...{% endblock %}`
4. سجّل الصفحة في `config/layout.json`

مثال:
```twig
{% extends 'layouts/master' %}
{% block title %}صفحتي الجديدة — {{ store.name }}{% endblock %}
{% block content %}
  <div class="container">
    <h1>مرحباً!</h1>
  </div>
{% endblock %}
```

---

## الأيقونات

يستخدم الثيم SVG Sprite. لاستخدام أيقونة:

```html
<svg width="24" height="24" aria-hidden="true">
  <use href="#icon-cart"/>
</svg>
```

الأيقونات المتاحة في `src/icons/sprite.svg`:
`icon-cart` · `icon-heart` · `icon-search` · `icon-user` · `icon-star` · `icon-check` · `icon-arrow-right` · `icon-arrow-left` · `icon-chevron-down` · `icon-close` · `icon-menu` · `icon-filter` · `icon-grid` · `icon-list` · `icon-truck` · `icon-shield` · `icon-refresh` · `icon-card` · `icon-whatsapp` · `icon-compare` · `icon-eye` · `icon-pin` · `icon-phone` · `icon-mail` · `icon-clock` · `icon-zoom` · `icon-trash`

---

## دعم RTL

الثيم يستخدم **CSS Logical Properties** بدلاً من `left/right`:
- `margin-inline-start` بدلاً من `margin-right`
- `padding-inline-end` بدلاً من `padding-left`
- `inset-inline-start` بدلاً من `left`

هذا يضمن RTL تلقائي 100% بدون هاكات.

---

## إمكانية الوصول (Accessibility)

الثيم متوافق مع WCAG 2.1 Level AA:
- ✅ ARIA labels على كل العناصر التفاعلية
- ✅ Focus visible واضح
- ✅ Skip to main content link
- ✅ Role attributes صحيحة
- ✅ Alt text لكل الصور
- ✅ Keyboard navigation كامل (Tab / Enter / Escape)
- ✅ Screen reader friendly
- ✅ نسبة تباين ألوان 4.5:1+

---

## معايير الأداء المستهدفة

| المعيار | الهدف |
|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5 ثانية |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Lighthouse Score | 90+ موبايل وديسكتوب |
| وقت تحميل الصفحة الرئيسية | < 3 ثواني |

### تحسينات الأداء المدمجة:
- Lazy loading للصور
- SVG Sprites بدل Font Icons
- CSS Variables (بدون JavaScript للثيمات)
- defer/async للـ JavaScript غير الضروري
- WebP support عبر Salla CDN
- IntersectionObserver للتحريك عند الظهور

---

## قائمة التحقق قبل الإطلاق

- [ ] اجتياز Salla Theme Validator بدون أخطاء
- [ ] اختبار على Chrome, Safari, Firefox, Edge
- [ ] اختبار على iOS Safari 14+ وAndroid Chrome
- [ ] Lighthouse Score 90+ على جميع الصفحات
- [ ] لا console errors في JavaScript
- [ ] RTL كامل وصحيح
- [ ] جميع إعدادات التخصيص تعمل
- [ ] شعارات الدفع تظهر (Mada, STC Pay, Apple Pay)
- [ ] زر واتساب يعمل
- [ ] النشرة البريدية ترسل
- [ ] نموذج التواصل يعمل
- [ ] إضافة للسلة تعمل بدون تحديث الصفحة
- [ ] المفضلة تعمل
- [ ] البحث الفوري يعمل
- [ ] الـ Countdown Timer يعمل

---

## الدعم الفني

للمساعدة والدعم:
- توثيق سلة: [docs.salla.dev](https://docs.salla.dev)
- مجتمع سلة: [community.salla.sa](https://community.salla.sa)
