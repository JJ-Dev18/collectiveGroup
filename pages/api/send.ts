import { EmailTemplate } from 'fleed/components/email-template';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_APIKEY_EMAIL);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Receipt for Your Payment',
    //   html : "<h1>Funciona</h1>"
      react: EmailTemplate({firstName : "juan"}),
      text: 'Thanks for the payment',
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};