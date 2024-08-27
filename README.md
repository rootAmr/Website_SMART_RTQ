Berikut adalah `README.md` dalam bahasa Indonesia tanpa penjelasan tentang endpoint API:

---

# Aplikasi Manajemen Data Warga dengan Flask

Ini adalah aplikasi web berbasis Flask untuk mengelola data warga. Aplikasi ini memungkinkan Anda untuk melihat, menambah, memperbarui, menghapus, dan menganalisis informasi warga yang disimpan dalam file Excel.

## Fitur

- **Dasbor dan Halaman**: Menyediakan halaman seperti dasbor, data warga, laporan, serta formulir untuk menambah/memperbarui warga.
- **API**: Menyediakan berbagai endpoint untuk mengakses dan memanipulasi data warga.

## Persyaratan

- Python 3.6+
- Flask
- pandas
- openpyxl (untuk membaca/menulis file Excel)

## Instalasi

1. **Clone repositori**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Buat dan aktifkan lingkungan virtual** (opsional tetapi disarankan):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Di Windows gunakan `venv\Scripts\activate`
   ```

3. **Instal dependensi**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Siapkan file Excel**:
   Pastikan file Excel `Data_Warga17_FIX.xlsx` berada di direktori `data`.

## Menjalankan Aplikasi

Untuk memulai server pengembangan Flask, gunakan perintah berikut:

```bash
python app.py
```


## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

## Penghargaan

- [Flask](https://flask.palletsprojects.com/)
- [pandas](https://pandas.pydata.org/)
- [openpyxl](https://openpyxl.readthedocs.io/)

---