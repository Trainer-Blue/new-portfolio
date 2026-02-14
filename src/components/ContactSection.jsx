
import React from "react";
import { PORFOLIO_DATA } from "../data/portfolio";

export const ContactSection = () => {
  const { contact } = PORFOLIO_DATA;
  return (
    <div 
      id="contact" 
      className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full"
    >
      <div className="space-y-3">
        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
          Contact
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Want to chat? Just shoot me a dm with a direct question on twitter
          or email me directly at{" "}
          <a href={`mailto:${contact.email}`} className="text-blue-500 hover:underline">
             {contact.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
