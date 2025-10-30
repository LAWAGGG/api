# CommandSPES-V2

**CommandSPES-V2** adalah aplikasi web portofolio kelas versi ke-2 yang berisi **data siswa**, **foto-foto galeri**, dan **proyek jurusan** yang telah dibuat dan digunakan.  
Tujuan utama dari proyek ini adalah untuk memperlihatkan hasil karya serta informasi yang telah dikumpulkan dalam satu website terintegrasi, sehingga mudah diakses oleh guru, siswa, maupun pihak luar.

---

## 📂 Struktur Proyek

```
CommandSPES-V2/
└── CS-frontend/      # Frontend (ReactJS)
    ├── src/          # Komponen dan halaman
    ├── public/       # Asset publik
    └── ...
```

---

## 🚀 Fitur Utama

- **Autentikasi Pengguna**  
  Sistem login dan registrasi dengan validasi keamanan.

- **Manajemen Data Siswa**  
  CRUD data siswa untuk keperluan dokumentasi sekolah.

- **Manajemen Proyek Jurusan**  
  Menambahkan, memperbarui, dan menghapus data proyek yang telah dikerjakan.

- **Galeri Kegiatan Sekolah**  
  Mengunggah, melihat, dan menghapus foto kegiatan.

- **REST API Terstruktur**  
  Backend menyediakan endpoint API yang dapat dikonsumsi oleh frontend.

---

## 🛠️ Teknologi yang Digunakan

### Backend
- **Laravel** (PHP Framework)
- **Composer** untuk manajemen dependensi
- **MySQL/MariaDB** sebagai database
- **Vite** untuk pengelolaan aset

### Frontend
- **ReactJS** (JavaScript)
- HTML/CSS untuk tampilan
- Mengonsumsi API dari backend

---

## 📦 Instalasi & Penggunaan

### 1. Clone Repository
```bash
git clone https://github.com/username/CommandSPES-V2.git
cd CommandSPES-V2
```

### 2. Setup Backend
```bash
cd CS-backend
composer install
npm install
cp .env.example .env
php artisan key:generate
```
- Sesuaikan konfigurasi `.env` untuk koneksi database.
- Migrasi database dan seed data awal:
```bash
php artisan migrate --seed
```
- Jalankan server backend:
```bash
php artisan serve
```

### 3. Setup Frontend
```bash
cd ../CS-frontend
npm install
npm run dev
```

### 4. Akses Aplikasi
- **Backend API**: `http://localhost:8000`
- **Frontend**: `http://localhost:5173` *(atau sesuai konfigurasi)*

---

## 📡 Contoh API Endpoint

| Method | Endpoint          | Deskripsi               |
|--------|------------------|-------------------------|
| POST   | `/api/login`     | Login pengguna           |
| GET    | `/api/students`  | Ambil daftar siswa       |
| POST   | `/api/students`  | Tambah siswa baru        |
| GET    | `/api/projects`  | Ambil daftar proyek      |
| POST   | `/api/gallery`   | Upload gambar ke galeri  |

> Daftar lengkap endpoint dapat dilihat di `routes/api.php`.

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru:  
   ```bash
   git checkout -b fitur-baru
   ```
3. Commit perubahan Anda:  
   ```bash
   git commit -m "Menambahkan fitur baru"
   ```
4. Push ke branch:  
   ```bash
   git push origin fitur-baru
   ```
5. Buat Pull Request

---

## 👨‍💻 Pengembang

- **Developer Utama** — [GitHub](https://github.com/LAWAGGG)
