# 🎨 FlatDesign — Pterodactyl Theme
> by **fidzzcodex** | Blueprint Extension

Tema Flat Design untuk Pterodactyl client panel. Warna solid, bersih, tanpa gradient, tanpa shadow. Dark mode default dengan toggle ke light mode.

---

## ✨ Fitur

- ✅ Flat Design — solid colors, no gradient, no shadow
- ✅ Dark mode default + toggle ke light mode
- ✅ Accent biru `#3882F6` sesuai palet Flat Design
- ✅ Font Plus Jakarta Sans (clean, modern)
- ✅ Admin panel **tidak diubah** — tetap default Pterodactyl
- ✅ Console/terminal **tidak diubah** — tetap native
- ✅ Cover semua halaman client: dashboard, server list, file manager, settings, account
- ✅ Responsive mobile

---

## 📦 Struktur File

```
flatdesign/
├── conf.yml              ← Metadata Blueprint extension
├── css/
│   └── flatdesign.css    ← Semua styling tema
└── js/
    └── flatdesign.js     ← Dark/light toggle + admin & console guard
```

---

## 🚀 Cara Install (Blueprint)

### Prerequisites
- Pterodactyl Panel sudah terinstall
- Blueprint sudah terinstall di server

Cek Blueprint: [https://blueprint.zip](https://blueprint.zip)

### Step 1 — Buat file .blueprint

Zip isi folder `flatdesign/` menjadi `flatdesign.blueprint`:

```bash
cd flatdesign
zip -r ../flatdesign.blueprint .
```

> ⚠️ Yang di-zip adalah **isi folder** (conf.yml, css/, js/), bukan folder-nya sendiri

### Step 2 — Install via Blueprint

```bash
# Upload flatdesign.blueprint ke server
scp flatdesign.blueprint root@IP_VPS:/var/www/pterodactyl/

# Masuk ke server
ssh root@IP_VPS

# Install extension
cd /var/www/pterodactyl
blueprint install flatdesign.blueprint
```

### Step 3 — Selesai ✅

Buka panel Pterodactyl di browser. Tema sudah aktif.

---

## 🎨 Color Palette

| Warna | Hex | Digunakan untuk |
|---|---|---|
| Blue (accent) | `#3882F6` | Primary button, active state, focus |
| Blue Dark | `#2563EB` | Hover button |
| Blue Light | `#60A5FA` | Link hover, code highlight |
| Yellow | `#FACC15` | Warning, starting state |
| Green | `#22C55E` | Online / success |
| Orange | `#F97316` | Info badge |
| Red | `#EF4444` | Error, danger, suspended |

---

## 🌗 Dark / Light Mode

- Default: **Dark mode**
- Toggle: tombol di pojok kanan bawah (☀️/🌙)
- Pilihan tersimpan di `localStorage` — tetap ingat setelah refresh

---

## 📍 Halaman yang Diubah vs Tidak

| Halaman | Status |
|---|---|
| Dashboard (`/`) | ✅ Tema aktif |
| Server list | ✅ Tema aktif |
| Server detail (files, startup, etc) | ✅ Tema aktif |
| Account settings | ✅ Tema aktif |
| Console (`/server/*/console`) | ❌ Tidak diubah |
| Admin panel (`/admin/*`) | ❌ Tidak diubah |

---

## 🔧 Kustomisasi

Edit `css/flatdesign.css`, bagian `:root {}` untuk ubah warna:

```css
:root {
  --fd-blue:    #3882F6;  /* ganti accent color di sini */
  --fd-bg:      #0F1117;  /* ganti background dark */
  --fd-bg-2:    #161B27;  /* ganti card background */
}
```

Rebuild `.blueprint` file setelah edit, lalu reinstall.

---

## 🔧 Troubleshooting

### Tema tidak muncul setelah install
```bash
cd /var/www/pterodactyl
php artisan view:clear
php artisan cache:clear
```

### Font tidak load
Pastikan server punya akses ke Google Fonts (`fonts.googleapis.com`). Jika tidak, download font manual dan host sendiri.

### Admin panel ikut berubah
Pastikan Blueprint hanya mengapply ke client view. Cek `conf.yml`:
```yaml
flags:
  hasAdminView: false   ← harus false
  hasClientView: true
```

---

*Made with ❤️ by fidzzcodex | fidzzcodex.me*
