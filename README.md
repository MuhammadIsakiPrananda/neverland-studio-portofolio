<div align="center">
  <img src="./public/Logo Navbar .png" alt="Neverland Studio Logo" width="120" />
  <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 0;">Neverland Studio</h1>
  <p style="font-size: 1.2rem; color: #9ca3af;">Mewujudkan Ide Menjadi Realitas Digital yang Luar Biasa</p>
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-f864c3?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

**Neverland Studio** adalah portofolio digital interaktif yang menampilkan perpaduan antara desain modern, rekayasa AI, dan pengembangan web yang canggih. Dibangun dengan teknologi terkini, proyek ini bukan sekadar halaman statis, melainkan sebuah pengalaman imersif yang mendemonstrasikan kemampuan teknis dan visi kreatif kami.

### [🔗 Lihat Live Demo](https://your-live-demo-link.com)

<br>

<!-- Anda bisa mengganti URL gambar di bawah dengan screenshot atau GIF dari proyek Anda -->
<div align="center">
  <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Screenshot Proyek" width="800" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</div>

## ✨ Fitur Utama

- **🎨 UI/UX Modern & Futuristik**: Desain antarmuka yang bersih dengan efek *glass morphism*, latar belakang partikel animasi, dan palet warna gradasi yang memukau.
- **🚀 Animasi Halus**: Ditenagai oleh **Framer Motion**, setiap interaksi, transisi halaman, dan kemunculan elemen terasa hidup dan responsif.
- **🌐 Dukungan Multi-Bahasa**: Beralih dengan mudah antara Bahasa Indonesia (ID) dan Inggris (EN).
- **🤖 Elemen Interaktif Canggih**:
  - **Efek Paralaks**: Elemen latar belakang bergerak dengan kecepatan berbeda saat di-scroll, menciptakan ilusi kedalaman.
  - **Kartu Proyek 3D**: Kartu proyek yang miring secara interaktif mengikuti pergerakan kursor.
  - **Animasi Ketik Realistis**: Simulasi log aktivitas di *hero section* dengan jeda dan kecepatan ketik yang natural.
- **🔒 Keamanan dengan reCAPTCHA v3**: Formulir kontak dan otentikasi dilindungi dari bot tanpa mengganggu pengguna.
- **🐳 Siap Deployment dengan Docker**: Konfigurasi Docker dan Nginx yang siap pakai untuk deployment yang mudah dan efisien di server mana pun.
- **📱 Desain Responsif**: Tampilan yang optimal di berbagai perangkat, mulai dari desktop hingga mobile.

---

## 🛠️ Teknologi yang Digunakan

| Kategori        | Teknologi & Ikon                                                                                                                                                                                                                                                                                                                                 |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**     | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white) |
| **Styling**      | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                                                                                                                                                          |
| **Deployment**   | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)                                                                                                                                         |
| **Keamanan**     | ![reCAPTCHA](https://img.shields.io/badge/reCAPTCHA_v3-4285F4?style=for-the-badge&logo=google&logoColor=white)                                                                                                                                                                                                                                   |
| **Linting**      | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

---

## 🚀 Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

- Node.js (v18 atau lebih baru)
- npm (v9 atau lebih baru)
- Docker & Docker Compose (opsional, untuk deployment)

### Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/MuhammadIsakiPrananda/NeverlandStudio.git
    cd NeverlandStudio
    ```

2.  **Inisialisasi dan perbarui submodule (jika ada):**
    ```bash
    git submodule update --init --recursive
    ```

3.  **Instal dependensi proyek:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variable:**
    Buat file `.env` di root direktori dan tambahkan kunci reCAPTCHA Anda.
    ```
    # Ganti dengan Google reCAPTCHA v3 Site Key Anda
    VITE_RECAPTCHA_SITE_KEY="YOUR_RECAPTCHA_SITE_KEY"
    ```

### 4. Menjalankan di Mode Development

Untuk menjalankan aplikasi dengan *hot-reloading* untuk pengembangan:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`.

### 5. Membangun untuk Produksi

Untuk membuat build produksi yang teroptimasi:

```bash
npm run build
```

Hasil build akan tersedia di dalam folder `dist/`.

---

## 🐳 Deployment dengan Docker

Proyek ini sudah dilengkapi dengan `Dockerfile` dan `docker-compose.yml` untuk mempermudah proses deployment ke server Anda.

1.  Pastikan Docker dan Docker Compose sudah terinstal di server Anda.
2.  Pastikan file `.env` sudah dikonfigurasi dengan benar.
3.  Jalankan perintah berikut dari root direktori proyek:

    ```bash
    docker-compose up --build -d
    ```

    - `--build`: Memaksa Docker untuk membangun ulang image.
    - `-d`: Menjalankan container di *background*.

Aplikasi Anda akan dapat diakses melalui `http://<IP_SERVER_ANDA>:8080`.

---

## 👥 Tim Kami

- **Muhammad Isaki Prananda** - *Full Stack Developer & AI Specialist*
---

## 🤝 Berkontribusi

Kontribusi, isu, dan permintaan fitur sangat kami hargai! Jangan ragu untuk memeriksa halaman isu jika Anda ingin berkontribusi.

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

<div align="center">
  <p>Dibuat dengan ❤️ oleh Tim Neverland Studio</p>
</div>
