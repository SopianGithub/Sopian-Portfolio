const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function addAdminUser(email, password, role = 'admin') {
  try {
    console.log('🚀 Creating admin user...')
    console.log('📧 Email:', email)
    console.log('🎭 Role:', role)
    console.log('')

    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      console.log('⚠️  User already exists in admin_users table')
      console.log('Updating role and status...')
      
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ 
          role: role, 
          is_active: true,
          notes: `Updated via script on ${new Date().toISOString()}`
        })
        .eq('email', email)

      if (updateError) throw updateError
      
      console.log('✅ Admin user updated successfully!')
      return
    }

    // 2. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    })

    if (authError) throw authError

    console.log('✅ User created in Supabase Auth')
    console.log('🆔 Auth ID:', authData.user.id)

    // 3. Add to admin_users table
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

    console.log('✅ User added to admin_users table')
    console.log('')
    console.log('🎉 Admin user created successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('🎭 Role:', role)
    console.log('🆔 Auth ID:', authData.user.id)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    console.log('💡 You can now login at: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    
    if (error.message.includes('duplicate key')) {
      console.error('💡 User might already exist. Try checking your admin_users table.')
    }
    
    if (error.message.includes('service_role')) {
      console.error('💡 Make sure SUPABASE_SERVICE_ROLE_KEY is correct in your .env.local')
    }
    
    process.exit(1)
  }
}

async function listAdminUsers() {
  try {
    console.log('📋 Current Admin Users:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('email, role, is_active, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (admins.length === 0) {
      console.log('No admin users found.')
    } else {
      admins.forEach((admin, index) => {
        const status = admin.is_active ? '✅ Active' : '❌ Inactive'
        const createdAt = new Date(admin.created_at).toLocaleDateString()
        console.log(`${index + 1}. ${admin.email}`)
        console.log(`   Role: ${admin.role}`)
        console.log(`   Status: ${status}`)
        console.log(`   Created: ${createdAt}`)
        console.log('')
      })
    }
  } catch (error) {
    console.error('❌ Error listing admin users:', error.message)
  }
}

// Command line interface
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'add':
    const email = args[1]
    const password = args[2]
    const role = args[3] || 'admin'
    
    if (!email || !password) {
      console.log('Usage: node scripts/add-admin.js add <email> <password> [role]')
      console.log('Example: node scripts/add-admin.js add admin@example.com mypassword123 super_admin')
      process.exit(1)
    }
    
    addAdminUser(email, password, role)
    break
    
  case 'list':
    listAdminUsers()
    break
    
  case 'quick':
    // Quick setup for testing
    console.log('🚀 Quick Setup - Creating default admin user...')
    addAdminUser('admin@aerospace.com', 'admin123456', 'super_admin')
    break
    
  default:
    console.log('🚀 Aerospace Portfolio - Admin User Manager')
    console.log('')
    console.log('Available commands:')
    console.log('')
    console.log('📝 Add new admin user:')
    console.log('   node scripts/add-admin.js add <email> <password> [role]')
    console.log('   Example: node scripts/add-admin.js add admin@example.com mypassword123 super_admin')
    console.log('')
    console.log('📋 List all admin users:')
    console.log('   node scripts/add-admin.js list')
    console.log('')
    console.log('⚡ Quick setup (creates admin@aerospace.com):')
    console.log('   node scripts/add-admin.js quick')
    console.log('')
    console.log('Available roles: super_admin, admin, editor, viewer')
    break
} 