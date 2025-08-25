import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website, businessName, email, phone, keywords, traffic, goals } = await req.json()

    // Validate required fields
    if (!website || !businessName || !email || !keywords || !goals) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create email content
    const emailContent = `
New Contact Form Submission - Effective Marketer

Company Details:
- Business Name: ${businessName}
- Website: ${website}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

SEO Information:
- Priority Keywords: ${keywords}
- Current Traffic: ${traffic || 'Not specified'}

Business Objectives:
${goals}

---
Submitted at: ${new Date().toLocaleString()}
    `.trim()

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@effectivemarketer.com>',
        to: ['yavor@effectivemarketer.com'],
        subject: `New Contact Form Submission - ${businessName}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})