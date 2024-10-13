import { getContactData } from "./service";
import { ContactAddressType } from "./type";
import { Title } from "@/common/utilities/title";
import { UserSendMessage } from "./components/user-send-message";
import { ContactAddressCard } from "./components/contact-address-card";

export const ScreenContactPage = async () => {
  const contactCards = await getContactData();

  return (
    <main className="container mx-auto px-4 lg:px-0">
      <Title>Contact Us</Title>
      <div className="max-w-7xl mx-auto relative rounded-lg py-6">
        <div className="grid lg:grid-cols-3 items-center">
          <div className="grid sm:grid-cols-2 gap-6 z-20 relative lg:left-16 max-lg:px-4">
            {contactCards.map((item: ContactAddressType) => (
              <ContactAddressCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                details={item.details}
              />
            ))}
          </div>

          <UserSendMessage />
        </div>
      </div>
    </main>
  );
};
