import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อเราได้ทุกช่องทาง ยินดีรับฟังทุกข้อเสนอแนะและคำถาม",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">ติดต่อเรา</h1>
        <p className="mt-2 text-muted-foreground">
          มีคำถามหรือข้อเสนอแนะ? เราพร้อมรับฟัง
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
