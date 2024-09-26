import { getContactData } from "@/services";
import SendMessage from "@/components/contact/send-message";
import ContactCard, { CCProps } from "@/components/contact/contact-card";
import Title from "@/components/common/title";

const ContactPage = async () => {
  const contactCards = await getContactData();

  return (
    <main className="container mx-auto px-4 lg:px-0">
      <Title>Contact Us</Title>
      <div className="max-w-7xl mx-auto relative rounded-lg py-6">
        <div className="grid lg:grid-cols-3 items-center">
          <div className="grid sm:grid-cols-2 gap-6 z-20 relative lg:left-16 max-lg:px-4">
            {contactCards.map((item: CCProps) => (
              <ContactCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                details={item.details}
              />
            ))}
          </div>

          <SendMessage />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
