//TẠO HÀM KIỂM TRA CHỨ CHƯA KIỂM TRA
//KIỂM TRA Ở BÊN JS
var mangThongBao = ["Vui lòng nhập tài khoản", "Vui lòng nhập họ tên", "Vui lòng nhập email", "Vui lòng nhập mật khẩu", "Vui lòng nhập ngày làm", "Vui lòng nhập lương", "Vui lòng nhập chức vụ", "Vui lòng nhập giờ làm", "Vui lòng nhập họ và tên là chữ cái", "Vui lòng nhập tài khoản từ 4 đến 6 kí tự", "Vui lòng nhập mật khẩu từ 6 đến 10 kí tự", "Email hợp lệ phải là name@domainName.com", "Mật khẩu chứa từ 6 đến 10 kí tự, 1 số, 1 chữ hoa, 1 chữ thường, 1 kí tự đặc biệt", "Vui lòng nhập số", "Kiểm tra định dạng tháng/ ngày/ năm"];
//KIỂM TRA TẤT CẢ KHÔNG ĐƯỢC ĐỂ TRỐNG
function kiemTraNhap(idField, idThongBao, indexChuoiTB){
    //dom tới bộ idField.
    var field = domID(idField).value; 
    //dom tới bộ id thông báo.
    //Nếu field là rỗng, thì sẽ hiện câu thông báo.
    if(field == "" || field == null){ //Hoặc ghi ten.length = 0
        domID(idThongBao).innerHTML = mangThongBao[indexChuoiTB];
       //Nếu không nhập kq là sai trả về false.
       return false;
    } else {
        domID(idThongBao).innerHTML = "";
       //Nếu nhập kq là đúng trả về true.
        return true;
    }
}
//KIỂM TRA PHẢI CHỌN CHỨC VỤ.
function kiemTraChucVu(){ 
    //dom tới bộ id thông báo.
    var theSelect = domID('chucvu').value;
    //Liên quan đến option, thì biến đã dom tới id bằng giá trị thẻ option bên HTML.
    if(theSelect == 'Chọn chức vụ'){ 
        domID('tbChucVu').innerHTML = mangThongBao[6];
       return false;
    } else {
        domID('tbChucVu').innerHTML = "";
        return true;
    }
}
//KIỂM TRA PHẢI LÀ CHỮ.
function kiemTraTenLaChu(){
    var field = domID('name').value;
    //Kiểm tra mảng là họ và tên là 2 từ trở lên không dấu vd: DUY PHUOC
    var mangTen = /^[a-zA-Z]+ [a-zA-Z]+$/;
    //Biến kiemTraTen sẽ kiểm tra mangTen có giống như mảng tên đã khai báo bên trên không.
    //match là lấy domID kiểm tra mangTen
    if(mangTen.test(field)){
        //Hợp lệ
        domID('tbTen').innerHTML = "";
        return true;
    } else{
        domID('tbTen').innerHTML = mangThongBao[8];
        return false;
    }
}
//KIỂM TRA THÁNG NGÀY NĂM
function kiemTraNTN(indexChuoiTB){
    var ngay = domID('datepicker').value;
    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(re.test(ngay)){
        domID('tbNgayy').innerHTML = "";
        return true;
    }
    domID('tbNgayy').innerHTML = mangThongBao[indexChuoiTB];
    return false;
}
//KIỂM TRA ĐỘ DÀI KÍ TỰ NHẬP.
function kiemTraDoDai(objectValue, idThongBao, minLength, maxLength, indexChuoiTB){
    var length = objectValue.length;
    if(minLength <= length && length <= maxLength){
        domID(idThongBao).innerHTML = "";
        return true;
    }  
    domID(idThongBao).innerHTML = mangThongBao[indexChuoiTB];
    return false;
}
//KIỂM TRA EMAIL.
function kiemTraEmail(objectValue, indexChuoiTB){
    //re LÀ ĐỊNH DẠNG EMAIL
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(re.test(objectValue)){
    //test là lấy re kiểm tra objectValue
    //Hợp lệ
    domID('tbEmail').innerHTML = "";
    return true;
  } 
  domID('tbEmail').innerHTML = mangThongBao[indexChuoiTB];
  return false;
}
//KIỂM TRA MẬT KHẨU.
function kiemTraMatKhau(objectValue, indexChuoiTB){
    const re = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/; 
    if(re.test(objectValue)){
        domID('tbMatKhau').innerHTML = "";
        return true;
    } 
    domID('tbMatKhau').innerHTML = mangThongBao[indexChuoiTB];
    return false;  
}
//KIỂM TRA SỐ
function kiemTraSo(objectValue, idThongBao, indexChuoiTB){
    const re = /\d+/;
    if(re.test(objectValue)){
        domID(idThongBao).innerHTML = "";
        return true;
    }
    domID(idThongBao).innerHTML = mangThongBao[indexChuoiTB];
    return false;
}

