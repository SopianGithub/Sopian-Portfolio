import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { ContactMessageInsert } from '@/types/database'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Commander name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid communication channel format' }),
  company: z.string().optional(),
  projectType: z.string().min(1, { message: 'Mission type is required' }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: 'Mission details must be at least 10 characters' }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    console.log('📡 Incoming transmission:', body)
    
    // Validate input data
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      console.log('❌ Validation failed:', result.error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Transmission validation failed',
          errors: result.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      )
    }

    const { name, email, company, projectType, budget, message } = result.data
    console.log('✅ Validation passed for:', { name, email, projectType })

    // Create subject line based on project type
    const subjectMap: Record<string, string> = {
      'web-development': '🌐 Web Development Mission',
      'mobile-app': '📱 Mobile Application Mission', 
      'ecommerce': '🛒 E-commerce Platform Mission',
      'cms': '📝 CMS Development Mission',
      'api': '⚡ API Development Mission',
      'consultation': '💡 Technical Consultation Mission',
      'other': '🔧 Custom Mission Request'
    }

    const subject = subjectMap[projectType] || '🚀 New Mission Request'

    // Prepare contact message data
    const contactData: ContactMessageInsert = {
      name,
      email,
      subject,
      message: `${message}${company ? `\n\nOrganization: ${company}` : ''}${budget ? `\nBudget Range: ${budget}` : ''}\nMission Type: ${projectType}`,
      is_read: false
    }

    console.log('🚀 Attempting to insert:', contactData)

    // Insert into database using regular client (RLS should be disabled now)
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select()

    if (error) {
      console.error('❌ Supabase insert error:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      return NextResponse.json(
        { 
          success: false, 
          message: error.code === '42501' 
            ? 'Database security policy error. Please try again or contact administrator.'
            : `Database transmission failed: ${error.message}`,
          debug: error
        }, 
        { status: 500 }
      )
    }

    console.log('✅ Successfully inserted:', data)

    // Success response
    return NextResponse.json({
      success: true,
      message: '🚀 Transmission successful! Mission control has received your signal and will respond within 24 hours.',
      data: data[0]
    })

  } catch (error) {
    console.error('❌ Contact API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Satellite connection error. Please try again later.',
        debug: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
} 