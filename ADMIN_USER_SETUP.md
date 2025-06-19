# 🚀 Setup Admin User - Aerospace Portfolio

## Langkah 1: Buat User di Supabase Auth

### Via Supabase Dashboard:
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project aerospace-portfolio Anda
3. Go to **Authentication** → **Users**
4. Klik **"Add user"**
5. Isi form:
   ```
   Email: your-admin-email@example.com
   Password: your-secure-password
   Email Confirm: ✅ (centang)
   ```
6. Klik **"Create user"**

### Via SQL (Alternative):
```sql
-- Buat user langsung di database
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  'admin@aerospace.com',
  crypt('your-password-here', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated'
);
```

## Langkah 2: Tambahkan User ke Tabel admin_users

### Via Supabase SQL Editor:
1. Go to **SQL Editor** di Supabase Dashboard
2. Jalankan query ini:

```sql
-- Ganti email dengan email admin yang sudah dibuat
INSERT INTO admin_users (email, role, is_active, notes)
VALUES 
  ('admin@aerospace.com', 'super_admin', true, 'First admin user'),
  ('your-email@example.com', 'admin', true, 'Your personal admin account');

-- Verifikasi admin users
SELECT * FROM admin_users;
```

### Via Table Editor:
1. Go to **Table Editor** → **admin_users**
2. Klik **"Insert row"**
3. Isi data:
   ```
   email: admin@aerospace.com
   role: super_admin
   is_active: true
   notes: Default admin user
   ```

## Langkah 3: Test Login Admin

### Coba Login:
1. Buka `http://localhost:3000/admin`
2. Akan redirect ke `/auth/simple-login`
3. Masukkan:
   ```
   Email: admin@aerospace.com
   Password: your-password-here
   ```
4. Klik **"🚀 Login"**
5. Jika berhasil, akan redirect ke `/admin`

## Langkah 4: Menambah Admin User Baru

### Method 1: Via Code (Recommended)
Buat file script untuk menambah admin:

```javascript
// scripts/add-admin.js
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addAdminUser(email, password, role = 'admin') {
  try {
    // 1. Create user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    })

    if (authError) throw authError

    // 2. Add to admin_users table
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .insert([
        {
          email: email,
          role: role,
          is_active: true,
          notes: `Added via script on ${new Date().toISOString()}`
        }
      ])

    if (adminError) throw adminError

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', email)
    console.log('🎭 Role:', role)
    console.log('🆔 Auth ID:', authData.user.id)

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
  }
}

// Usage
addAdminUser('new-admin@example.com', 'secure-password-123', 'admin')
```

Jalankan dengan:
```bash
node scripts/add-admin.js
```

### Method 2: Via API Route
Buat endpoint untuk menambah admin:

```typescript
// src/app/api/admin/add-user/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { email, password, role } = await request.json()

    // Check if requestor is super_admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: currentAdmin } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', session.user.email)
      .single()

    if (currentAdmin?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only super_admin can add users' }, { status: 403 })
    }

    // Create new admin user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) throw authError

    const { error: adminError } = await supabase
      .from('admin_users')
      .insert([{ email, role, is_active: true }])

    if (adminError) throw adminError

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created successfully',
      userId: authData.user.id 
    })

  } catch (error) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    )
  }
}
```

## Langkah 5: Environment Variables

Pastikan environment variables sudah benar:

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Langkah 6: Management Admin Users

### Melihat Semua Admin:
```sql
SELECT 
  id,
  email,
  role,
  is_active,
  created_at,
  notes
FROM admin_users
ORDER BY created_at DESC;
```

### Menonaktifkan Admin:
```sql
UPDATE admin_users 
SET is_active = false 
WHERE email = 'admin-to-disable@example.com';
```

### Mengubah Role Admin:
```sql
UPDATE admin_users 
SET role = 'super_admin' 
WHERE email = 'promote-this-admin@example.com';
```

### Menghapus Admin:
```sql
-- Hapus dari admin_users (user masih ada di auth.users)
DELETE FROM admin_users 
WHERE email = 'remove-admin@example.com';

-- Atau hapus sepenuhnya (termasuk dari auth)
-- Gunakan Supabase Dashboard → Authentication → Users → Delete
```

## 🔐 Role System

### Roles Available:
- **`super_admin`**: Full access, can manage other admins
- **`admin`**: Standard admin access
- **`editor`**: Limited editing access (if implemented)
- **`viewer`**: Read-only access (if implemented)

### Role Permissions:
```sql
-- Add new roles (optional)
ALTER TABLE admin_users DROP CONSTRAINT admin_users_role_check;
ALTER TABLE admin_users ADD CONSTRAINT admin_users_role_check 
CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer'));
```

## ⚠️ Security Best Practices

1. **Strong Passwords**: Gunakan password minimal 12 karakter
2. **Email Verification**: Pastikan `email_confirm: true`
3. **Regular Audit**: Cek admin users secara berkala
4. **Principle of Least Privilege**: Berikan role minimal yang dibutuhkan
5. **Backup Access**: Selalu punya minimal 2 super_admin

## 🐛 Troubleshooting

### User tidak bisa login:
```sql
-- Cek status user di auth.users
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'your-admin@example.com';

-- Cek status di admin_users
SELECT email, role, is_active 
FROM admin_users 
WHERE email = 'your-admin@example.com';
```

### Reset Password Admin:
```sql
-- Via Supabase Dashboard:
-- Authentication → Users → Click user → Reset Password

-- Atau via code:
const { error } = await supabase.auth.admin.updateUser(
  userId,
  { password: 'new-password' }
)
```

### Force Email Confirmation:
```sql
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'admin@example.com';
```

---

**🚀 Setelah setup selesai, Anda bisa:**
- Login ke `/admin` dengan email dan password yang dibuat
- Mengelola multiple admin users
- Mengatur role dan permissions
- Monitoring admin activities

**📧 Default Admin Account:**
```
Email: admin@aerospace.com
Password: (sesuai yang Anda set)
Role: super_admin
``` 