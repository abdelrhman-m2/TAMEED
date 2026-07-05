import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phone = "966507363550"; // بدون + أو مسافات
  const message = "Hello TAMEED, I'd like to learn more about your ERP.";
  const encodedMessage = encodeURIComponent(message);

  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 ltr:right-6 rtl:left-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};