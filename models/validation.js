function getEle(id) {
    return document.getElementById(id);
}


function Validation() {

    this.kiemtraRong = function (value, errorId, mess) {
        if (value === "") {
            //show error
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";

            return false;
        } else {
            //hide error
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";

            return true;
        }

    };

    this.kiemtraChucVu = function (idselect, errorId, mess) {
        var slcChucVu = document.getElementById(idselect);
        if (slcChucVu.selectedIndex !== 0) {
            //true
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        } else {
            //false
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";
            return false;

        }
    };

    this.kiemtraDodaiKyTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }


    };

    this.kiemtraChuoiKiTu = function (value, errorId, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.checkPattern = function (value, errorId, mess, letter) {
        if (value.match(letter)) {
            //
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemtraMaNVTonTai = function (value, errorId, mess, listNV) {
        var isExist = false;

        for (var i = 0; i < listSV.length; i++) { // ktra co ton tai hay ko
            var nv = listNV[i];
            if (nv.taiKgoan === value) {
                isExist = true;
                break;
            }
        }


        if (isExist) { // isexist  co ton tai la true

            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false; // tra false
        } else {

            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;

        }

    };

    this.kiemtraLuongCoban = function (value, errorId, mess, min, max) {

        if (min <= value && value <= max) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }

    };

    this.kiemtraSoGioLam = function (value, errorId, mess, min, max) {
        if (min <= value && value <= max) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };


}