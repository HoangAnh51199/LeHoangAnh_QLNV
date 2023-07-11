

//global
var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();// mỗi lần reload web => gọi lại hàm getLocalSrorage để lấy data



function getEle(id) {
  return document.getElementById(id);
}



function layThongTinNV(isADD) { //thêm isADD :true là thêm data,false là cập nhật


  /**
     * Dom lay thong tin tu cac the input
     */
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;



  /**
   * validation
   * isvalid true nhập data đúng ngược lại là false trương hợp tkhoan:isvalid =false ,tên:isvalid = true ,isvalid cuối cùng dc thay thế = true nên tính ra true hết là sai(chỉ quan tâm giá trị cuối củng nên thay bằng dấu isvadlid &=) 
   */
  //flag <=> tạo cờ (boolean)
  var isvalid = true;

  if (isADD) {//ktra bien isADD true làm trong {} ,false bỏ qua
    //validation taiKhoan
    isvalid &= validation.kiemtraRong(taiKhoan, "txtErrorTK", "(*) vui lòng nhập tài khoản") &&
      validation.kiemtraDodaiKyTu(
        taiKhoan,
        "txtErrorTK",
        "(*) vui long nhap  tu 4-6 ký số ",
        4,
        6
      ) &&
      validation.kiemtraMaNVTonTai(
        taiKhoan,
        "txtErrorTK",
        "(*) mã nhân viên đã tồn tại",
        dsnv.arr // biến list nv
      );
  }



  //vd:isvalid = false kế tiếp true isvalid =false && true =false cuối cùng ,có 1 cái false thì ko nhân data nhanthongtinnhanvien 


  isvalid &= validation.kiemtraRong(
    tenNV,
    "txtErrorHoTen",
    "(*) vui lòng nhập tên nhân viên"
  ) &&
    validation.kiemtraChuoiKiTu(
      tenNV,
      "txtErrorHoTen",
      "(*) vui long nhập đúng chuỗi ký tự",

    );


  isvalid &= validation.kiemtraRong(
    email,
    "txtErrorEmail",
    "(*) vui lòng nhập email "
  ) &&
    validation.checkPattern(
      email,
      "txtErrorEmail",
      "(*) vui lòng nhập email đúng dịnh dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );


  isvalid &= validation.kiemtraRong(
    matKhau,
    "txtErrorMatKhau",
    "(*) vui lòng nhập mật khẩu"
  ) &&
    validation.checkPattern(
      matKhau,
      "txtErrorMatKhau",
      "(*) vui lòng nhập mật khẩu đúng định dạng",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    );

  isvalid &= validation.kiemtraRong(
    ngayLam,
    "txtErrorNgayLam",
    "(*) vui lòng nhập ngày làm"
  );

  isvalid &= validation.kiemtraRong(
    luongCoBan,
    "txtErrorLuongCB",
    "(*) vui lòng nhập lương cơ bản"
  ) &&
    validation.kiemtraLuongVaSoGioLam(
      luongCoBan,
      "txtErrorLuongCB",
      "(*) vui lòng nhập trong khoảng 1tr -20 tr",
      1e6,
      20e6

    );

  isvalid &= validation.kiemtraChucVu(
    "chucvu",
    "txtErrorChucVu",
    "(*) vui lòng nhập chức vụ"
  );

  isvalid &= validation.kiemtraRong(
    gioLam,
    "txtErrorGioLam",
    "(*) vui lòng nhập giờ làm"
  ) &&
    validation.kiemtraLuongVaSoGioLam(
      gioLam,
      "txtErrorGioLam",
      "(*) vui lòng nhập giờ làm trong khoảng 80-200 h/1 tháng",
      80,
      200
    );






  if (isvalid) { //true tạo đối tượng 

    //Tạo đối tượng sv từ lớp đối tượng nhanVien
    var nv = new NhanVien(
      taiKhoan,
      tenNV,
      email,
      matKhau,
      ngayLam,
      luongCoBan,
      chucVu,
      gioLam,


    );

    //tinh DTB
    nv.tinhtongLuong();
    nv.xepLoai();



    console.log(nv.xepLoai());
    return nv;
  };

  return null; //khi validatin sai

}

function nutMoFormNhapLieu() {

  getEle("tknv").disabled = false;// thoát block tài khoản phần input đang bị khóa xám 
  getEle("formNhap").reset();//reset form về ban đầu trống input
  getEle("btnCapNhatNV").style.display = "none";
  getEle("btnThemNV").style.display = "inline-block";

}



/**
 * Them NV
 */
function themNhanVien() {


  var nv = layThongTinNV(true); //true cho biến isADD sẽ thực hiên validation
  console.log(nv);
  if (nv) { // khác null hoặc có data dom  thì thực hiện
    dsnv.themNV(nv);

    console.log(dsnv.arr);
    renderTable(dsnv.arr);//render danh sach ra ngoai table
    setLocalStorage();//lưu danh sach xuong local storage
    getEle("btnDong").click(); //out form ra 
  }
}


function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];




    //Fomart VN
    var VND = new Intl.NumberFormat('VN-vn', {
      //  style: 'currency',
      //  currency: 'VND'
    });

    //

    content += ` <tr>
   
     <td>${nv.taiKhoan}</td>
     <td>${nv.tenNV} </td>
     <td>${nv.email}</td>
     <td>${nv.ngayLam} </td>
     <td>${nv.chucVu} </td>
     
     <td>
     <div class="d-flex ">
     
     ${VND.format(nv.tongLuong)}
     
     <span style='font: -webkit-mini-control;
    font-size: 25px;'>&#8363; </span>   
      </div>
      </td>
  
     <td>${nv.loai}</td>
     <td>
     <button class="btn btn-info" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
     <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
 </td>
    </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}


/**
 * xóa Nhanvien
 */

function xoaNV(taiKhoan) {
  // console.log(123);
  // console.log(taiKhoan);
  dsnv._xoaNV(taiKhoan);
  console.log(dsnv.arr); //tìm dc vi tri xoa và thực hien xóa 
  renderTable(dsnv.arr); // render lại màn hình sau xóa
  setLocalStorage(); // lưu data sau khi xóa trên localstorage
}

function suaNV(taikhoan) {
  //console.log(taikhoan);
  var nv = dsnv.layThongTinChiTietNV(taikhoan);
  console.log(nv);
  if (nv) { // nếu tìm thấy data dom thì thực hiện tiếp 
    //dom tới các thẻ input => show info nv
    var callbuttonThem = getEle("btnThem");
    callbuttonThem.click(); //mở from nhập liệu khi bấm nút button  sửa 

    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;//khóa khóa chính  ko cho sửa chửa khóa chính 

    getEle("name").value = nv.tenNV
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;

    //dom btncapnhatnv => show 
    getEle("btnCapNhatNV").style.display = "inline-block";

    //dom btnthemnv => hide 
    getEle("btnThemNV").style.display = "none";
  }

}

/**
 * cập nhật 
 */

getEle("btnCapNhatNV").onclick = function () {
  //lấy thông tin user
  var nv = layThongTinNV(false);//lấy lại data mới thông tin mới sửa của nhan vien đó ,false của biến isADD bỏ qua validation ktra ký tự
  if (nv) { // khác null hoặc có data dom thì thực hiện
    console.log(nv); // xem thông tin mới sửa lại
    dsnv.capNhatNV(nv)  //functon capnhat ben dsnv.js

    renderTable(dsnv.arr); // render lại màn hình cập nhật du lieu mới 
    setLocalStorage(); // lưu vào local storage

    getEle("btnDong").click(); //out ra

  }

};


/**
 * tìm kiếm 
 * callback function: hàm nhận tham số ,tham số là 1 hàm khác 
 */


// getEle("txtSearch").addEventListener("keyup",function(){
// console.log(213);
// }); //keyup có thể thay hành động click ke tiep function()

function SearchNV() {
  // console.log(213);
  var txtSearch = getEle("txtSearch").value;
  console.log(txtSearch);
  var mangTimKiem = dsnv.timKiemNV(txtSearch); // mảngtkiem chứa các đối tượng nv đang tìm
  console.log(mangTimKiem);
  renderTable(mangTimKiem);//render ra màn hình table
}

getEle("txtSearch").addEventListener("keyup", SearchNV);


function getLocalStorage() {
  if (localStorage.getItem("DSNV")) { //nếu trường hợp data null tren local storage thì ko làm ,có thì thực hiện trong {}
    var dataString = localStorage.getItem("DSNV");
    var dataJson = JSON.parse(dataString);//convert string to json
    dsnv.arr = dataJson;//nạp data vào mẢNG 
    renderTable(dsnv.arr);//render xuất ra màn hình table 
  }

}

function setLocalStorage() { //lưu data xuống local tren web 
  //covert json => string 
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}


