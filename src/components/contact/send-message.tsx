import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const SendMessage = () => {
  return (
    <section className="lg:col-span-2 rounded-lg sm:p-10 p-4 z-10 max-lg:-order-1 max-lg:mb-8">
      <h2 className="text-2xl text-center text-muted-foreground font-bold mb-6">
        Send Message
      </h2>
      <form>
        <div className="max-w-md mx-auto space-y-3">
          <Input placeholder="Name" type="text" />
          <Input placeholder="Email" type="text" />
          <Input placeholder="Phone" type="text" />

          <Textarea placeholder="Message..." rows={8} />
          <Button className="w-full font-medium flex items-center gap-4">
            <Send size={16} /> <span> Send Message</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SendMessage;
