import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

export async function POST(request: Request): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!receiverEmail) {
      return NextResponse.json(
        { success: false, error: "ไม่สามารถส่งอีเมลได้ กรุณาตั้งค่า CONTACT_RECEIVER_EMAIL" },
        { status: 500 }
      );
    }

    const resend = getResendClient();
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: receiverEmail,
      subject: `ติดต่อเราจาก ${name}`,
      html: `
        <h2>ข้อความจากแบบฟอร์มติดต่อเรา</h2>
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
