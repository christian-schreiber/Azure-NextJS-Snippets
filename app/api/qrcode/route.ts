import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function POST(request: Request) {
    const qrbody = await request.json();
    const qrCodeImage = await QRCode.toDataURL(qrbody, { errorCorrectionLevel: 'H'});

    return NextResponse.json(qrCodeImage);
}