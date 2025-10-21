# --- STAGE 1: BUILD ---
# Menggunakan image Node.js versi 20-alpine sebagai basis untuk proses build.
# Versi 'alpine' dipilih karena ukurannya yang kecil.
FROM node:20-alpine AS builder

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (atau yarn.lock/pnpm-lock.yaml)
# Ini memanfaatkan cache layer Docker, sehingga `npm install` hanya berjalan jika file-file ini berubah.
COPY package*.json ./

# Instal semua dependensi proyek
RUN npm install

# Salin sisa kode sumber aplikasi ke dalam container
COPY . .

# Ambil environment variable dari argumen build untuk digunakan oleh Vite
ARG VITE_RECAPTCHA_SITE_KEY
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

# Jalankan perintah build untuk menghasilkan file statis yang siap untuk produksi
RUN npm run build

# --- STAGE 2: SERVE ---
# Menggunakan image Nginx yang ringan sebagai basis server produksi
FROM nginx:alpine

# Salin hasil build dari stage 'builder' ke direktori web root Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Salin file konfigurasi Nginx yang sudah kita buat
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 untuk akses HTTP dari luar container
EXPOSE 80

# Perintah default untuk menjalankan Nginx di foreground saat container dimulai
CMD ["nginx", "-g", "daemon off;"]