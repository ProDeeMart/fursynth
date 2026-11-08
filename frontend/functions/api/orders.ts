// Cloudflare Pages Serverless Function
// Runs on Cloudflare Edge 24/7 even when your local PC is turned off!

interface Env {
  DISCORD_WEBHOOK_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json() as any;
    const randomCode = `FS-${Math.floor(1000 + Math.random() * 9000)}`;

    // Forward to Discord Webhook if configured in Cloudflare Pages Environment Variables
    const webhookUrl = context.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Fursynth Order Bot',
            embeds: [{
              title: `🚀 มีใบสั่งซื้อใหม่จากหน้าเว็บ: ${randomCode}`,
              color: 0x8b5cf6,
              fields: [
                { name: '👤 ลูกค้า', value: `${data.customerName} (${data.discordTag})`, inline: true },
                { name: '🎭 ประเภทงาน', value: data.avatarType || '-', inline: true },
                { name: '📦 โมเดลฐาน', value: data.baseModel || '-', inline: true },
                { name: '💰 งบประมาณ', value: data.budget || 'ตามตกลง', inline: true },
                { name: '📅 กำหนดส่ง', value: data.deadline || 'ไม่ระบุ', inline: true },
                { name: '🔗 ลิงก์ Ref', value: data.refLinks || '-', inline: false },
                { name: '📝 บันทึกเพิ่มเติม', value: data.notes || 'ไม่มี', inline: false },
              ],
              footer: { text: 'Fursynth VRChat Avatar Studio (Cloudflare Edge)' },
              timestamp: new Date().toISOString(),
            }],
          }),
        });
      } catch (err) {
        console.error('Failed to notify Discord webhook:', err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderCode: randomCode,
        message: 'ใบสั่งซื้อของคุณถูกส่งเข้าสู่ระบบ Fursynth เรียบร้อยแล้ว! ครีเอเตอร์จะติดต่อกลับทาง Discord ครับ',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'เกิดข้อผิดพลาดในการประมวลผลคำสั่งซื้อ: ' + error.message,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
