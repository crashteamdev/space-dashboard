import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: false });
const chatId = process.env.ID_CHANNEL!;

export async function POST(req: NextRequest) {
    const { text } = await req.json();

    try {
        await bot.sendMessage(chatId, `*Время: ${moment().format("DD.MM.YYYY")}*\n\n${text}`, {parse_mode: "Markdown"});
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Ошибка отправки:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
