//TẠO LỚP ĐỐI TƯỢNG NHÂN VIÊN
function NhanVien(_taiKhoan, _name, _email, _ngayLam, _password, _luongCB, _chucVu, _gioLam){
    this.taiKhoan = _taiKhoan;
    this.name = _name;
    this.email = _email;
    this.ngayLam = _ngayLam;
    this.passWord = _password;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    //5.XÂY DỰNG PHƯƠNG THỨC TÍNH TỔNG LƯƠNG CHO ĐỐI TƯỢNG NHÂN VIÊN.
    this.tinhTongLuong = function(){
        //Có function() thì nhớ trả return.
        if(this.chucVu == 'Sếp'){
            var tongLuong1 = this.luongCB*3;
            return tongLuong1;
        }
        else if(this.chucVu == 'Trưởng phòng'){
            var tongLuong2 = this.luongCB*2;
            return tongLuong2;
        } else if(this.chucVu == 'Nhân viên'){
            var tongLuong3 = this.luongCB*1;
            return tongLuong3;
        }
    };
    //6. XÂY DỰNG PHƯƠNG THỨC XẾP LOẠI CHO ĐỐI TƯỢNG NHÂN VIÊN.
    this.xepLoai = function(){
        if(this.gioLam >= 192){
            return "Nhân viên xuất sắc";
        }
        else if(this.gioLam >= 176){
            return "Nhân viên giỏi";
        }
        else if(this.gioLam >= 160){
            return "Nhân viên khá";
        }
        else if(this.gioLam >0 && this.gioLam < 160){
            return "Nhân viên trung bình";
        }
    };
}