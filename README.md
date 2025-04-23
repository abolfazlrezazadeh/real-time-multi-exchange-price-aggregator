# 🪙 Crypto Price Aggregator (Real-Time + Admin Dashboard)

سامانه جمع‌آوری و انتشار لحظه‌ای قیمت ارزهای دیجیتال از چندین صرافی ایرانی و خارجی، با قابلیت ذخیره‌سازی، گزارش خطا، و انتشار real-time از طریق WebSocket 🚀

---

## 🧩 ویژگی‌ها

- دریافت قیمت از چندین صرافی با قالب‌های مختلف API
- ذخیره قیمت‌ها به صورت bulk در MongoDB
- ارسال قیمت‌ها به صورت real-time با WebSocket
- نمایش و ذخیره لاگ خطاها با جزییات
- داشبورد ادمین (بک‌اند):
  - لیست صرافی‌ها + وضعیت فعال/غیرفعال
  - آخرین قیمت‌های هر صرافی
  - نمایش خطاها
- جستجو در قیمت‌ها به صورت real-time (symbol یا exchange)

---

## 🛠 تکنولوژی‌ها

- **NestJS** برای معماری بک‌اند
- **MongoDB + Mongoose** برای ذخیره دیتا
- **Socket.IO** برای WebSocket
- **Winston + DailyRotateFile** برای مدیریت لاگ‌ها
- آماده برای اتصال به React یا پنل admin دلخواه

---

## ⚙️ نصب و اجرا

```bash
git clone https://github.com/your-repo/crypto-aggregator.git
cd crypto-aggregator
npm install
