import React from "react";

export type CCProps = {
  title: string;
  details: string;
  Icon: React.ElementType;
};

const ContactCard = ({ Icon, title, details }: CCProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center shadow-muted-foreground shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
      <Icon size={28} className="text-primary font-bold" />
      <h4 className="text-base font-bold mt-4">{title}</h4>
      <p className="text-sm text-muted-foreground  mt-2">{details}</p>
    </div>
  );
};

export default ContactCard;
