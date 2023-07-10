function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam,
  
  
  

) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.loai="";



  this.tinhtongLuong = function () {
    if (this.chucVu === "Giám đốc") {
      this.tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = this.luongCoBan;

    }
    return this.tongLuong;
  };

  this.xepLoai = function () {

    
    
    if (this.gioLam >= 192) {
      this.loai = "N viên xuất xắc ";
    } else if (this.gioLam >= 176) {
      this.loai = "N viên giỏi";
    } else if (this.gioLam >= 160) {
      this.loai = "N viên khá ";

    } else {
      this.loai = "N viên trung bình ";
    }
    return this.loai;
  };
}