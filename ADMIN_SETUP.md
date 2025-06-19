# Admin System Setup - Aerospace Portfolio

## 🚀 Sistem Perlindungan Admin

Sistem ini melindungi route `/admin` dengan autentikasi dan otorisasi menggunakan Supabase.

## 📋 Komponen Sistem

### 1. Middleware (`src/middleware.ts`)
- Memproteksi semua route `/admin/*`
- Mengecek autentikasi pengguna
- Memverifikasi hak akses admin melalui tabel `admin_users`
- Redirect ke halaman login jika belum login
- Redirect ke home dengan error jika bukan admin

### 2. Halaman Login (`src/app/auth/login/page.tsx`)
- Interface login dengan tema space-themed
- Verifikasi kredensial melalui Supabase Auth
- Pengecekan status admin setelah login berhasil
- Redirect otomatis ke panel admin

### 3. Halaman Logout (`src/app/auth/logout/page.tsx`)
- Logout otomatis dari Supabase
- Redirect ke halaman utama
- Pembersihan session

### 4. Tabel Admin Users (`admin_users`)
- Menyimpan daftar email yang memiliki akses admin
- Role management (admin, super_admin)
- Status aktif/non-aktif
- Row Level Security (RLS) untuk keamanan

## 🛠️ Setup Awal

### 1. Database Migration
Jalankan migration untuk membuat tabel admin_users:

```bash
# Jika menggunakan Supabase CLI
supabase db push

# Atau jalankan migration secara manual di Supabase Dashboard
```

### 2. Menambahkan Admin User
Untuk menambahkan admin user baru:

```sql
-- Ganti email dengan email Anda yang sebenarnya
INSERT INTO admin_users (email, role, is_active, notes)
VALUES ('your-email@example.com', 'super_admin', true, 'Your admin account');
```

### 3. Mengubah Default Admin
Edit file migration atau jalankan query untuk mengubah default admin:

```sql
-- Update default admin email
UPDATE admin_users 
SET email = 'your-email@example.com'
WHERE email = 'admin@aerospace.com';
```

## 🔐 Cara Menggunakan

### Login sebagai Admin
1. Buka `/admin` di browser
2. Akan otomatis redirect ke `/auth/login`
3. Masukkan email dan password yang terdaftar di Supabase Auth
4. Email harus terdaftar di tabel `admin_users` dengan `is_active = true`

### Logout
1. Klik tombol "Logout" di panel admin
2. Atau akses langsung `/auth/logout`

## 🛡️ Keamanan

### Middleware Protection
- Semua route `/admin/*` diproteksi
- Pengecekan session dan admin status di setiap request
- Error handling yang aman

### Row Level Security (RLS)
- Tabel `admin_users` menggunakan RLS
- User hanya bisa melihat data admin mereka sendiri
- Service role memiliki akses penuh

### Error Handling
- Error message tidak memberikan informasi sensitif
- Redirect yang aman dengan pesan error
- Log error untuk debugging

## 🔧 Kustomisasi

### Menambahkan Role Baru
Edit constraint di tabel `admin_users`:

```sql
ALTER TABLE admin_users DROP CONSTRAINT admin_users_role_check;
ALTER TABLE admin_users ADD CONSTRAINT admin_users_role_check 
CHECK (role IN ('admin', 'super_admin', 'editor', 'viewer'));
```

### Mengubah Halaman Login
Edit file `src/app/auth/login/page.tsx` untuk kustomisasi UI.

### Menambahkan Middleware Rules
Edit `src/middleware.ts` untuk menambahkan rule proteksi baru.

## 🐛 Troubleshooting

### User tidak bisa login
1. Pastikan email terdaftar di `auth.users` (Supabase Auth)
2. Pastikan email juga ada di tabel `admin_users`
3. Pastikan `is_active = true` di tabel `admin_users`

### Middleware error
1. Cek environment variables Supabase
2. Cek koneksi database
3. Lihat log error di console

### RLS Policy error
1. Pastikan RLS policies sudah dibuat
2. Cek apakah service role key ada
3. Verifikasi policy permissions

## 📝 Environment Variables

Pastikan environment variables berikut sudah diset:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚀 Deployment

1. Push migration ke Supabase production
2. Set environment variables di platform hosting
3. Tambahkan admin user di production database
4. Test login dan akses admin panel

---

**⚠️ Penting**: Jangan lupa mengubah email default admin dari `admin@aerospace.com` ke email yang sebenarnya! 