import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

export const FormEmail = () => {

const form = useRef<HTMLFormElement>();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm( process.env.NEXT_PUBLIC_SERVICE_EMAIL_ID as string, process.env.NEXT_PUBLIC_TEMPLATE_EMAIL_ID as string, form.current as HTMLFormElement , process.env.NEXT_PUBLIC_EMAIL_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  )
}
