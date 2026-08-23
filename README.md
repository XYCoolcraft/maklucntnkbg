# Nokos Order — RumahOTP

Website order nomor virtual / OTP menggunakan API [RumahOTP](https://www.rumahotp.io/developer/api).

## Fitur

- Pilih layanan (WhatsApp, Telegram, Instagram, dll)
- Pilih negara + provider harga
- Pilih operator seluler
- Order nomor → auto-polling status OTP setiap 3 detik
- Tombol Resend / Done / Cancel
- Cek saldo real-time
- API key hanya di server (aman)

## Setup Lokal

```bash
# 1. Clone / masuk folder
cd nokos-rumahotp

# 2. Install
npm install

# 3. Buat .env.local
cp .env.example .env.local
# Edit .env.local → isi RUMAHOTP_API_KEY=...

# 4. Jalankan
npm run dev
```

Buka http://localhost:3000

## Dapatkan API Key

1. Daftar / login di https://www.rumahotp.io
2. Profile → Developer → Buat API Key
3. Izinkan akses: create number, dll
4. IP whitelist bisa diisi `1.1.1.1` (semua IP) atau IP Vercel

## Deploy ke Vercel

1. Push project ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Tambahkan Environment Variable:
   - Name: `RUMAHOTP_API_KEY`
   - Value: API key kamu
4. Deploy

Atau via CLI:

```bash
npm i -g vercel
vercel
# Lalu set env di dashboard Vercel
```

## Struktur API yang dipakai

| Endpoint | Fungsi |
|----------|--------|
| `GET /v2/services` | Daftar layanan |
| `GET /v2/countries?service_id=` | Negara + pricelist |
| `GET /v2/operators?country=&provider_id=` | Operator |
| `GET /v2/orders?number_id=&provider_id=&operator_id=` | Buat order |
| `GET /v1/orders/get_status?order_id=` | Cek status + OTP |
| `GET /v1/orders/set_status?order_id=&status=` | cancel / done / resend |
| `GET /v1/user/balance` | Saldo |

Rate limit API: **5 request / 10 detik**.

## Catatan

- Response structure API bisa sedikit berbeda. Kalau field tidak muncul, buka Network tab browser dan sesuaikan mapping di `page.tsx`.
- Jangan expose API key ke client. Semua call lewat `/api/*` route.
- Hanya untuk keperluan testing & bisnis legal sesuai ToS RumahOTP.
