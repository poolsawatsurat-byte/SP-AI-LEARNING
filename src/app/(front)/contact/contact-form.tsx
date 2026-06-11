"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle, Mail, Phone, Clock, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = form;

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          toast.error(result.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
          return;
        }

        reset();
        toast.success("ส่งข้อความสำเร็จ!");
      } catch {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-semibold">ส่งข้อความสำเร็จ!</h3>
        <p className="text-muted-foreground">
          ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
        </p>
        <Button variant="outline" onClick={() => form.reset({ name: "", email: "", message: "" })}>
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">ข้อมูลติดต่อ</h2>
          <p className="mt-2 text-muted-foreground">
            คุณสามารถติดต่อเราได้ผ่านช่องทางต่างๆ ดังนี้
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-5 w-5 shrink-0" />
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone className="h-5 w-5 shrink-0" />
            <span>02-123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="h-5 w-5 shrink-0" />
            <span>จันทร์ - ศุกร์, 09:00 - 17:00</span>
          </div>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground">
          เรายินดีรับฟังทุกข้อเสนอแนะ คำถาม หรือความคิดเห็นของคุณ
          ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Field>
          <FieldLabel htmlFor="name">ชื่อ</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              placeholder="กรอกชื่อของคุณ"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            <FieldError errors={errors.name ? [{ message: errors.name.message }] : undefined} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            <FieldError errors={errors.email ? [{ message: errors.email.message }] : undefined} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">ข้อความ</FieldLabel>
          <FieldContent>
            <Textarea
              id="message"
              rows={5}
              placeholder="พิมพ์ข้อความที่ต้องการ..."
              {...register("message")}
              aria-invalid={!!errors.message}
            />
            <FieldError errors={errors.message ? [{ message: errors.message.message }] : undefined} />
          </FieldContent>
        </Field>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            "กำลังส่ง..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              ส่งข้อความ
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
