<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Nhiều mô hình AI. Một API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

Cổng API AI mã nguồn mở được xây dựng trên [New API](https://github.com/QuantumNous/new-api). Kết nối nhà cung cấp mô hình và quản lý tài khoản khách hàng, khóa API, số dư cùng mức sử dụng trong một bảng điều khiển web.

<p align="center">
  <a href="#get-started">Chạy cục bộ</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Báo lỗi</a> ·
  <a href="#contributing">Đóng góp</a>
</p>

<details>
<summary>Chọn ngôn ngữ · 10 ngôn ngữ</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · **Tiếng Việt**

</details>

[itarouter.com](https://itarouter.com)

## Trạng thái hiện tại

Trang web công khai có tại [itarouter.com](https://itarouter.com). Đăng ký sử dụng xác minh email và Cloudflare Turnstile. Đây là phiên bản phát triển ban đầu; kết nối nhà cung cấp mô hình, thanh toán thực tế và tự động chọn mô hình chưa được cấu hình.

## Tính năng

- **Truy cập mô hình:** cấu hình nhà cung cấp, xem danh mục và thử yêu cầu trong playground.
- **Truy cập API:** quản lý tài khoản khách hàng và khóa API bằng bảng điều khiển có sẵn.
- **Số dư và mức sử dụng:** dùng ví, lịch sử đơn nạp tiền, số dư và nhật ký sử dụng. Thanh toán thực tế cần cấu hình nhà cung cấp thanh toán.
- **Bảng điều khiển đa ngôn ngữ:** giữ giao diện New API, bổ sung thương hiệu ItaRouter và bản dịch tập trung vào khách hàng.

<a id="get-started"></a>

## Bắt đầu trên máy cục bộ

Cần Git, Bun **1.4.4**, Go **1.26.10** (hoặc tự tải bộ công cụ Go), công cụ biên dịch C/C++ và OpenSSL. Cần kết nối mạng để tải các phụ thuộc. Cấu hình cục bộ dùng SQLite; không cần Redis, khóa nhà cung cấp mô hình hay tài khoản thanh toán.

Sao chép kho mã và biên dịch:

```sh
git clone https://github.com/dodamworks/itarouter.git
cd itarouter

(
  set -eu
  mkdir -p .local/dev/bin .local/dev/logs
  chmod 700 .local/dev
  (cd app/new-api/web && bun install --frozen-lockfile && bun run build)
  (cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
)
```

Khởi động máy chủ từ thư mục gốc của kho mã:

```sh
(
  set -eu
  cd .local/dev
  if [ ! -s session-secret ]; then
    (umask 077; openssl rand -hex 32 > session-secret)
  fi
  env -i PATH="$PATH" HOME="$HOME" TMPDIR="${TMPDIR:-/tmp}" \
    DEFAULT_LANGUAGE=en SESSION_COOKIE_SECURE=false TRUSTED_PROXIES=none \
    SESSION_SECRET="$(cat session-secret)" SQLITE_PATH="$PWD/local.db" \
    ./bin/new-api --port 3017 --log-dir ./logs
)
```

Mở **http://127.0.0.1:3017/** và thiết lập quản trị viên đầu tiên. Trong cài đặt trang có sẵn, đặt `SystemName` thành `ItaRouter` và `Logo` thành `/brand/itarouter-symbol.svg`. Dừng bằng Ctrl+C; chạy lại khối khởi động để giữ nguyên cơ sở dữ liệu và khóa bí mật phiên.

Máy chủ lắng nghe trên mọi giao diện mạng. Đây là cấu hình phát triển cục bộ; không công khai trực tiếp lên internet. Xem [hướng dẫn](docs/development/LOCAL-RUN.md) để đổi cổng, thiết lập ban đầu và menu khách hàng. Ảnh Docker `latest` của dự án gốc không chứa các thay đổi ItaRouter.

## Ngôn ngữ

Giao diện hỗ trợ tiếng Anh, tiếng Trung giản thể và phồn thể, tiếng Pháp, tiếng Nhật, tiếng Hàn, tiếng Bồ Đào Nha Brazil, tiếng Nga, tiếng Tây Ban Nha và tiếng Việt. Nội dung chưa dịch sẽ hiển thị bằng tiếng Anh.

Tiếng Anh là ngôn ngữ mặc định và dự phòng. Lựa chọn đã lưu được ưu tiên hơn trình duyệt; sau đăng nhập, ngôn ngữ đã lưu trong tài khoản được áp dụng. Không dùng định vị IP. Một số nội dung quản trị và nội dung động vẫn bằng tiếng Anh.

<a id="contributing"></a>

## Đóng góp

Hãy mở một [issue](https://github.com/dodamworks/itarouter/issues) mô tả hành vi hoặc cải tiến mong muốn. Tận dụng giao diện và cài đặt có sẵn, giữ thay đổi gọn và kèm kết quả kiểm tra phù hợp. Giữ các thông báo gốc và không gửi thông tin xác thực, cơ sở dữ liệu hay nhật ký.

## Tài liệu

- [UPSTREAM.json](UPSTREAM.json): phiên bản New API cố định và các tệp đã sửa.
- [CHANGES.md](CHANGES.md): thay đổi của ItaRouter.
- [SOURCE.md](SOURCE.md): phạm vi mã nguồn và cách cung cấp mã tương ứng với phiên bản triển khai.
- [New API — upstream README](app/new-api/README.md)

---

Dựa trên New API theo [AGPLv3](LICENSE). Đọc [NOTICE gốc](NOTICE), [thông báo ItaRouter](ITAROUTER-NOTICE.md) và [thông báo bên thứ ba](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
