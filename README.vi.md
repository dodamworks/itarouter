<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · **Tiếng Việt**

Cổng API AI được xây dựng trên [New API](https://github.com/QuantumNous/new-api). Dùng bảng điều khiển web có sẵn để quản lý kết nối mô hình, tài khoản khách hàng, khóa API, số dư và mức sử dụng.

Tên miền: `itarouter.com`

## Trạng thái hiện tại

Dự án đang ở giai đoạn phát triển ban đầu. Tên, logo ItaRouter và bản dịch tập trung vào giao diện khách hàng đã được áp dụng. Kết nối nhà cung cấp, thanh toán thực tế và tự động chọn mô hình chưa được cấu hình.

Giao diện hỗ trợ tiếng Anh, tiếng Trung giản thể và phồn thể, tiếng Pháp, tiếng Nhật, tiếng Hàn, tiếng Bồ Đào Nha Brazil, tiếng Nga, tiếng Tây Ban Nha và tiếng Việt. Nội dung chưa dịch sẽ hiển thị bằng tiếng Anh.

## Nội dung có sẵn

- Các màn hình có sẵn: danh mục mô hình, playground, khóa API, mức sử dụng, ví, hồ sơ và bảo mật.
- Backend và frontend của dự án gốc được cố định phiên bản và giữ nguyên thông báo tác giả.
- Logo, favicon và chữ thương hiệu ItaRouter dùng Geist. Menu khách hàng sử dụng phần cài đặt quản trị có sẵn.

## Chạy cục bộ

Yêu cầu Bun 1.4.4, Go 1.26.10 và công cụ biên dịch C/C++. Kiểm tra cục bộ sử dụng SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Chạy lệnh từ thư mục gốc của kho mã. Xem [hướng dẫn](docs/development/LOCAL-RUN.md) để khởi động, thiết lập khóa bí mật phiên, tài khoản quản trị đầu tiên và thương hiệu. Không dùng nguyên cấu hình cục bộ cho môi trường vận hành.

## Tệp dự án

- [UPSTREAM.json](UPSTREAM.json): phiên bản New API cố định và các tệp đã sửa.
- [CHANGES.md](CHANGES.md): thay đổi của ItaRouter.
- [SOURCE.md](SOURCE.md): phạm vi mã nguồn và cách cung cấp mã tương ứng với phiên bản triển khai.

- [New API — upstream README](app/new-api/README.md)

---

Dựa trên New API theo [AGPLv3](LICENSE). Đọc [NOTICE gốc](NOTICE), [thông báo ItaRouter](ITAROUTER-NOTICE.md) và [thông báo bên thứ ba](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
