

//global
var dsnv = new DSNV();

getLocalStorage();// mỗi lần reload web => gọi lại hàm getLocalSrorage để lấy data


function getEle(id) {
  return document.getElementById(id);
}



function layThongTinNV() {


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
   */
  //flag <=> tạo cờ (boolean)
  var isvalid = true;

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





/**
 * Them NV
 */
function themNhanVien() {
  var nv = layThongTinNV();
  console.log(nv);
  if (nv) { // khác null hoặc có data dom  thì thực hiện
    dsnv.themNV(nv);

    console.log(dsnv.arr);
    renderTable(dsnv.arr);//render danh sach ra ngoai table
    setLocalStorage();//lưu danh sach xuong local storage
  }
}


function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];

    content += ` <tr>
   
     <td>${nv.taiKhoan}</td>
     <td>${nv.tenNV} </td>
     <td>${nv.email}</td>
     <td>${nv.ngayLam} </td>
     <td>${nv.chucVu} </td>
     <td>${nv.tongLuong.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </td>
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
  var nv = layThongTinNV();//lấy data thông tin mới sửa của nhan vien đó 
  if(nv){ // khác null hoặc có data dom thì thực hiện
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


