import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import EmailTemplate from '@/components/template/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, message, subject } = await request.json();
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.MY_EMAIL ?? 'lan.nd192224hust@gmail.com'],
      subject: subject,
      react: EmailTemplate({ message, email }),
    });

    return NextResponse.json({
      message: 'success',
      status: 200,
    });
  } catch (error) {
    console.log({ error });

    return NextResponse.error();
  }
}
