"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { InputType } from "../type";
import { sendEmail } from "../server-action";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Textarea } from "@/common/components/ui/textarea";

const initialValue: InputType = {
  name: "",
  email: "",
  message: "",
};

export const UserSendMessage = () => {
  const [inputs, setInputs] = useState<InputType>(initialValue);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev: InputType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = checkInput(inputs);

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const { success } = await sendEmail(inputs);

      if (success) {
        setInputs(initialValue);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkInput = (data: InputType): string | null => {
    const name = data.name.trim();
    const email = data.email.trim();
    const message = data.message.trim();

    if (!name) {
      return "Please provide your name.";
    }

    if (!email) {
      return "Please provide your email.";
    }

    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }

    if (!message) {
      return "Please provide a message.";
    }

    return null;
  };

  return (
    <section className="lg:col-span-2 rounded-lg sm:p-10 p-4 z-10 max-lg:-order-1 max-lg:mb-8">
      <h2 className="text-2xl text-center text-muted-foreground font-bold mb-6">
        Send Message
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto space-y-3">
          <Input
            name="name"
            type="text"
            placeholder="Name..."
            value={inputs.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email..."
            value={inputs.email}
            onChange={handleChange}
          />
          <Textarea
            rows={8}
            name="message"
            placeholder="Message..."
            value={inputs.message}
            onChange={handleChange}
          />
          {error && (
            <p className="text-red-500 text-xs font-semibold">{error}</p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full font-medium flex items-center gap-4 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}>
            <Send size={16} />
            <span>{isLoading ? "Sending Message..." : "Send Message"}</span>
          </Button>
        </div>
      </form>
    </section>
  );
};
