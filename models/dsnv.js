function DSNV() {
  //chứa các đối tượng sv
  this.arr = [];

  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  this._timVitri = function (taiKhoan) {
    /**
     * tìm vi trí 
     * tạo index =-1
     * 1.duyệt mảng arr => pick nv object 
     * 1.1 ktra taikhoan trùng nv.manv
     * true => cập nhật giá trị cho index từ 1 (phải cho index =1 tìm thấy tài khoản lần đầu tiên 
     * trường hợp 2 tài khoản giống nhau trùng số (vd tai khoan:01 ten: nam a,tai khoan:01 ten: nam b))
     */
    var index = -1; // 
    for (var i = 0; this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }

    return index;
  };

  this._xoaNV = function (taiKhoan) {
    var index = this._timVitri(taiKhoan);

    if (index !== -1) {
      //xóa phần tử mảng dựa vào index và số lượng phần tử cần xóa
      this.arr.splice(index, 1);//splice()thức thay đổi nội dung của một mảng bằng cách loại bỏ hoặc thay thế
    }
  }

  this.layThongTinChiTietNV = function (taiKhoan) {
    //tìm vị trí
    var index = this._timVitri(taiKhoan);

    if (index !== -1) {
      var nv = this.arr[index];//tìm dc và gán vào biến nv
      return nv;
    }
  };

  this.capNhatNV = function (nv) { //var nv =new nhanvien (1 doi tuong có tat ca data doi tuong đó )
    //tìm vị trí nv cần update
    var index = this._timVitri(nv.taiKhoan);

    if (index !== -1) {
      // update 
      this.arr[index] = nv;
      alert("CẬP NhẬT NHÂN VIÊN THÀNH CÔNG ");
    }
  };

  // this.timKiemNv =function (){};



}

DSNV.prototype.timKiemNV = function (keyword) { // this.timKiemNv =function (){};giống trên viết bên ngoài dễ fix
  /**
   * tạo mảng tìm iếm = []
   * duyệt mảng arr
   * keyword => convert ra chữ thường (trường hợp viết hoa toàn bộ)
   * nv.loai => convert chữ thường
   * so sánh keyword voi Loai
   * neu như keyword trùng loại
   * =>true => thêm nv dc tìm thấy vào mảng tìm kiếm 
    *trả về mảngtimkiem  
    */

  var mangTimKiem = []; //rỗng
  for (var i = 0; i < this.arr.length; i++) {
    var nv = this.arr[i]; //bien nv chua  từng chữ duyệt mảng
    var keywordLowercase = keyword.toLowerCase();
    var loaiNVLowerCase = nv.loai.toLowerCase();
    // if(keyword === nv.loai) {}
    if (loaiNVLowerCase.indexOf(keywordLowercase) !== -1) {
      mangTimKiem.push(nv); //push 1 doi tượng nv vào mảng
    }
  }
  return mangTimKiem;
};