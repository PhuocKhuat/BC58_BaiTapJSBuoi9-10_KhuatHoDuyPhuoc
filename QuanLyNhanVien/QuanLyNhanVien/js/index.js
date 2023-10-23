//1. IN RA TABLE DANH SÁCH NHÂN VIÊN KHI LOAD TRANG ~ 5 BƯỚC.

//B1. tạo 1 array rỗng bên .
var dSNhanVien = [];

//B1. Đưa từ LOCAL STORAGE lên giao diện.
var dataJson = localStorage.getItem('dsNhanVien_LOCAL');
if(dataJson != null){
    //B2. Chuyển JSON thành array vì JSON chưa sử dụng được trực tiếp.
    //B3. Kết quả của result là dSNV chưa có method.
    let result = JSON.parse(dataJson);
    //B4. Kết quả của dSNhanVien là dSNV có method.
    //MAP biến đổi result(object chưa có method) thành dSSV(object có method).
    dSNhanVien = result.map(function(item){
    return new NhanVien(
        item.taiKhoan,
        item.name,
        item.email,
        item.ngayLam,
        item.passWord,
        item.luongCB,
        item.chucVu,
        item.gioLam,
    )
    });
    //B5. Lấy array đi xử lý, lưu xuống dSNhanVien
    renderdSNhanVien(dSNhanVien);
}

//2. THÊM NHÂN VIÊN MỚI.
var nutThemNV = domID('btnThemNV').onclick = function(){ //8 BƯỚC (CÓ VALIDATE)
   //B1: Tạo 1 array rỗng ở ngoài.
   //B2: Lấy thông tin từ form (dom tới input).
   var _taiKhoan = domID('tknv').value;
   var _name = domID('name').value;
   var _email = domID('email').value;
   var _password = domID('password').value;
   var _ngayLam = domID('datepicker').value;
   var _luongCB = domID('luongCB').value*1;
   var _chucVu = domID('chucvu').value;
   var _gioLam = domID('gioLam').value*1;
   //B3: Tạo object tương ứng (dựa vào layout có 8 property và 2 method).
//    var nhanVien = {
//     taiKhoan: _taiKhoan,
//     name: _name,
//     email: _email,
//     ngayLam: _ngayLam,
//     passWord: _password,
//     luongCB: _luongCB,
//     chucVu: _chucVu,
//     gioLam: _gioLam,   
//    };
var nhanVien = new NhanVien(_taiKhoan, _name, _email, _ngayLam, _password, _luongCB, _chucVu, _gioLam);

//B4. VALIDATE:
//KHI ĐẾN HÀM CUỐI CÙNG ĐƯỢC NHẬP TRƯỚC DẤU & THÌ MỚI THỰC HIỆN CÁC HÀM SAU DẤU &&
  var kq = kiemTraNhap('tknv','tbTKNV',0) & kiemTraNhap("name","tbTen",1) & kiemTraNhap("email","tbEmail",2) & kiemTraNhap("password","tbMatKhau",3) & kiemTraNhap("datepicker","tbNgayy",4) & kiemTraNhap("luongCB","tbLuongCB",5) & kiemTraChucVu() & kiemTraNhap("gioLam","tbGiolam",7);
  kq = kq && kiemTraDoDai(nhanVien.taiKhoan,"tbTKNV",4,6,9) & kiemTraTenLaChu() & kiemTraEmail(nhanVien.email, 11) & kiemTraMatKhau(nhanVien.passWord, 12) & kiemTraSo(nhanVien.luongCB, "tbLuongCB", 13) & kiemTraSo(nhanVien.gioLam, "tbGiolam", 13) & kiemTraNTN(14);

// kq = kq 
// var isValid = kiemTraNhap("tknv","tbTKNV",0) && kiemTraDoDai(nhanVien.taiKhoan,"tbTKNV",4,6,9);
// isValid = isValid & kiemTraNhap("name","tbTen",1) && kiemTraTenLaChu(nhanVien.name);
// isValid = isValid & kiemTraNhap("email","tbEmail",2) && kiemTraEmail(nhanVien.email);
// isValid = isValid & kiemTraNhap("password","tbMatKhau",3) && kiemTraDoDai(nhanVien.passWord,"tbMatKhau",6,10,10);
// isValid = isValid & kiemTraNhap("datepicker","tbNgayy",4);
// isValid = isValid & kiemTraNhap("luongCB","tbLuongCB",5);
// isValid = isValid & kiemTraNhap("chucvu","tbChucVu",6) && kiemTraChucVu(nhanVien.chucVu);
// isValid = isValid & kiemTraNhap("gioLam","tbGiolam",7);
if(kq){
   //B5: Thêm nhân viên vào danh sách nhân viên.
   dSNhanVien.push(nhanVien); 
//B6: Chuyển array thành JSON.
var dataJson = JSON.stringify(dSNhanVien);
//B7: Lưu xuống LOCAL STORAGE.
localStorage.setItem('dsNhanVien_LOCAL',dataJson);  
//B8: render (tạo các thẻ tr tương ứng), lấy array đi xử lý, lưu xuống là dSNhanVien. 
renderdSNhanVien(dSNhanVien);
}
}

//3. XOÁ NHÂN VIÊN.
function xoaNhanVien(id){ //5 BƯỚC
    /**splice( vị trí cần xoá)
   * 1. Dựa theo tài khoản sẽ xoá nhân viên, tìm vị trí tK => findIndex.
   * 2. Sử dụng splice để remove.
   * 3. Update lại layout */
//B1: Tìm vị trí dựa vào id, dùng findIndex
var viTri = dSNhanVien.findIndex(function(item){
    return item.taiKhoan == id;
});
//B2: Xoá nhân viên dựa theo vị trí
dSNhanVien.splice(viTri,1);
//B3: Chuyển array thành JSON
var dataJson = JSON.stringify(dSNhanVien);
//B4: Lưu xuống LOCAL STORAGE
localStorage.setItem('dsNhanVien_LOCAL',dataJson);
//B5: render (tạo các thẻ tr tương ứng), lấy array đi xử lý, lưu xuống là dSNhanVien
renderdSNhanVien(dSNhanVien);
}

//4. VALIDATION:
/**
 * B1: Tạo 1 chuỗi rổng, kiểm tra giá trị với chuỗi rổng hoặc chiều dài chuỗi đó = 0.
 * B2: tạo 1 hàm kiểm tra.
 * B3: dom tới chỗ thông báo dưới input.
 */
// var mangThongBao = ["Vui lòng nhập tài khoản", "Vui lòng nhập họ tên", "Vui lòng nhập email", "Vui lòng nhập mật khẩu", "Vui lòng nhập ngày làm", "Vui lòng nhập lương", "Vui lòng nhập chức vụ", "Vui lòng nhập giờ làm", "Vui lòng nhập họ và tên là chữ cái", "Vui lòng nhập tài khoản từ 4 đến 6 kí tự", "Vui lòng nhập mật khẩu từ 6 đến 10 kí tự"];
// // function getEle(ele){
// //     return document.getElementById(ele);
// // }
// //Tạo 1 hàm có tham số truyền vào là idField, idThongBao, indexChuoiTB.
// function kiemTraNhap(idField, idThongBao, indexChuoiTB){
//     //dom tới bộ idField.
//     var field = domID(idField).value;
//     //dom tới bộ id thông báo.
//     var thongBao = domID(idThongBao);
//     //Nếu field là rỗng, thì sẽ hiện câu thông báo.
//     var kq = false;
//     if(field == "" || field == null){ //Hoặc ghi ten.length = 0
//        thongBao.innerHTML = mangThongBao[indexChuoiTB];
//        thongBao.style.display = "block";
//        //Nếu không nhập kq là sai trả về false.
//        kq = false;
//     } else {
//         thongBao.style.display = "none";
//        //Nếu nhập kq là đúng trả về true.
//         kq = true;
//     }
//     return kq; //phải trả kết quả về để addEventListener bên dưới hiểu và thực hiện các lệnh tiếp theo.
// }
// function kiemTraChucVu(){ //Kiểm tra phải chọn chức vụ.
//     var theSelect = domID('chucvu').value;
//     //dom tới bộ id thông báo.
//     var thongBao = domID('tbChucVu');
//     //Liên quan đến option, thì biến đã dom tới id bằng giá trị thẻ option bên HTML.
//     if(theSelect == 'Chọn chức vụ'){ //Thẻ select có 1 trường là selectedIndex
//        thongBao.innerHTML = mangThongBao[6];
//        thongBao.style.display = "block";
//     } else {
//         thongBao.style.display = "none";
//     }
// }
// function kiemTraTenLaChu(){
//     var mangTen = /^[A-Za-z]/;
//     var kiemTraTen = domID('name').value;
//     var thongBao = domID('tbTen');
//     //Biến kiemTraTen sẽ kiểm tra mangTen có giống như mảng tên đã khai báo bên trên không.
//     if(kiemTraTen.match(mangTen)){
//         thongBao.style.display = 'none';
//     } else{
//         thongBao.innerHTML = mangThongBao[8];
//         thongBao.style.display = 'block';
//     }
// }
// function kiemTraDoDai(idField, idThongBao, minLength, maxLength, indexChuoiTB){
//     var field = domID(idField).value;
//     var thongBao = domID(idThongBao);
//     if(field.length < minLength || field.length > maxLength){
//         thongBao.innerHTML = mangThongBao[indexChuoiTB];
//         thongBao.style.display = 'block';
//     } else {
//         thongBao.style.display = 'none';
//     }
// }
// //1 hàm sử dụng từ 2 id trở lên, mới dùng addEventListener. 
// //Khi ấn nút có 1 trình xử lý, định nghĩa nhiều sự kiện.
// domID('btnThemNV').addEventListener("click", function(){
//     //Gọi hàm kiemTraNhap, xem họ đã nhập chưa ?
//     //Muốn sử dụng lệnh IF trong addEventListener, hàm thuộc if phải return kq ở bên trên.
//     var kq = kiemTraNhap('tknv','tbTKNV',0);
//     if(kq){
//         kiemTraDoDai('tknv', 'tbTKNV', 4, 6, 9);
//     }
//     var kq1 = kiemTraNhap('name','tbTen',1);
//     if(kq1){
//         kiemTraTenLaChu();
//     }
//     kiemTraNhap('email','tbEmail',2);
//     var kq2 = kiemTraNhap('password','tbMatKhau',3);
//     if(kq2){
//         kiemTraDoDai('password', 'tbMatKhau', 6, 10, 10);
//     }
//     kiemTraNhap('datepicker','tbNgayy',4);
//     kiemTraNhap('luongCB','tbLuongCB',5);
//     kiemTraNhap('gioLam','tbGiolam',7);
//     kiemTraChucVu();
    
// });

//8A. SỬA NHÂN VIÊN:
function suaNhanVien(id){ //3 BƯỚC
  //B1: Tìm vị trí dựa theo id, dùng FINDINDEX
  var viTri = dSNhanVien.findIndex(function(item){
    return item.taiKhoan == id;
  });
  //B2: Lấy vị trí theo danh sách nhân viên.
  var nV = dSNhanVien[viTri];
  //B3: dom lên giao diện trở lại
  domID('tknv').readOnly = true;
  domID('tknv').value = nV.taiKhoan;
  domID('name').value = nV.name;
  domID('email').value = nV.email;
  domID('password').value = nV.passWord;
  domID('datepicker').value = nV.ngayLam;
  domID('luongCB').value = nV.luongCB;
  domID('chucvu').value = nV.chucVu;
  domID('gioLam').value = nV.gioLam;
}
//8B. CẬP NHẬT NHÂN VIÊN.
var btnCapNhat = domID('btnCapNhat').onclick = function(){ //9 BƯỚC (CÓ VALIDATE)   
   //B1: Lấy thông tin từ user - dom lên giao diện
   var _taiKhoan = domID('tknv').value;
   var _name = domID('name').value;
   var _email = domID('email').value;
   var _password = domID('password').value;
   var _ngayLam = domID('datepicker').value;
   var _luongCB = domID('luongCB').value*1;
   var _chucVu = domID('chucvu').value;
   var _gioLam = domID('gioLam').value*1;
   //B2: Tìm vị trí dựa theo _taiKhoan, dùng FINDINDEX.
   //DỰA VÀO TÀI KHOẢN TÌM, KHÔNG ĐƯỢC THAY ĐỔI TÀI KHOẢN, VÌ NHƯ THẾ KHI CẬP NHẬT BỊ ĐẢO LỘN.
  var viTri = dSNhanVien.findIndex(function(item){
    return item.taiKhoan == _taiKhoan;
  });
   //B3: Tạo object tương ứng
   var nhanVien = new NhanVien(_taiKhoan, _name, _email, _password, _ngayLam, _luongCB, _chucVu, _gioLam);
   //B4.VALIDATION:
   var kq = kiemTraNhap('tknv','tbTKNV',0) & kiemTraNhap("name","tbTen",1) & kiemTraNhap("email","tbEmail",2) & kiemTraNhap("password","tbMatKhau",3) & kiemTraNhap("datepicker","tbNgayy",4) & kiemTraNhap("luongCB","tbLuongCB",5) & kiemTraChucVu() & kiemTraNhap("gioLam","tbGiolam",7);
   kq = kq && kiemTraDoDai(nhanVien.taiKhoan,"tbTKNV",4,6,9) & kiemTraTenLaChu() & kiemTraEmail(nhanVien.email, 11) & kiemTraMatKhau(nhanVien.passWord, 12) & kiemTraSo(nhanVien.luongCB, "tbLuongCB", 13) & kiemTraSo(nhanVien.gioLam, "tbGiolam", 13) & kiemTraNTN(14);
   if(kq){
     //B5: Lấy vị trí trong ds Nhân viên
   dSNhanVien[viTri] = nhanVien;
   //B6: Xoá dựa theo vị trí trong dSNhanVien
   dSNhanVien.splice(viTri, 1, nhanVien);
   //B7: Chuyển array thành JSON
   var dataJson = JSON.stringify(dSNhanVien);
   //B8: Lưu xuống LOCAL STORAGE
   localStorage.setItem('dsNhanVien_LOCAL',dataJson);  
   //B9: render (tạo các thẻ tr tương ứng), lấy array đi xử lý, lưu xuống là dSNhanVien 
   renderdSNhanVien(dSNhanVien);
   };
}
//TÌM NHÂN VIÊN THEO LOẠI(xuất săc, giỏi, khá...) VÀ HIỂN THỊ
/**
 * B1. Khởi tạo các biến sẽ sử dụng.
 * B2. dom tới ô input lấy giá trị người dùng.
 * B3. Gán giá trị của tim thành chữ HOA.
 * B4. dom tới tên thẻ table trong toàn văn bản.
 * B5. dom tới tên thẻ tr trong toàn văn bản.
 * B6. Tạo vòng lặp for.
 * B7. dom tới thẻ td thứ 6 theo vị trí thứ i của thẻ tr.
 * B8. Nếu đúng là td.
 * B9. Lấy giá trị văn bản của phần tử td hiện tại.
 * B10. Nếu giá trị chữ hoa của txtValue tìm được vị trí chuỗi filter > -1, thì style = block, ngược lại style = none.
 */

var btnTimNV = domID('btnTimNV').onclick = function(){
  //B1. Khởi tạo các biến sẽ sử dụng.
  var tim, filter, table, tr, td, txtValue ;
  //B2. dom tới input lấy giá trị người dùng.
  tim = domID('searchName');
  //B3. Gán giá trị của tim thành chữ HOA.
  filter = tim.value.toUpperCase();
  //B4. dom tới tên thẻ table trong toàn văn bản. 
  table = document.getElementsByTagName('table');
  //B5. dom tới tên thẻ tr trong toàn văn bản. 
  tr = document.getElementsByTagName('tr');
  // td = document.getElementsByTagName("td");
  //B6. Tạo vòng lặp for.
  for(i=0; i< tr.length; i++){
    //B7. dom tới thẻ td thứ 6 theo vị trí thứ i của thẻ tr. 
    td = tr[i].getElementsByTagName("td")[6];
    //toUpperCase: khi nhập chữ hoa hoặc thường sẽ gợi ý các từ có chữ a dù ở đầu hoặc cuối.
    //Sử dụng phương thức indexOf() của lớp String để tìm vị trí của chuỗi filter trong giá trị của biến txtValue đã chuyển đổi.
    //So sánh vị trí tìm được với giá trị -1.
    //B8. Nếu đúng là td.
    if(td) {
      //B9. Lấy giá trị văn bản của phần tử td hiện tại.
      txtValue = td.textContent || td.innerText;
      //B10. Nếu giá trị chữ hoa txtValue tìm được vị trí chuỗi filter > -1, thì style = block, ngược lại style = none.
      if(txtValue.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display = "block";
        } else {
          tr[i].style.display = "none";
        }
  }
}
}

function domID(id){
    return document.getElementById(id);
}