function renderdSNhanVien(dSNhanVien){
  //Tạo 1 chuỗi rỗng:
var contentHTML = "";
//Duyệt mảng:
for(i =0; i< dSNhanVien.length; i++){
  //Lấy vị trí trong dSNhanVien
    var nVien = dSNhanVien[i];
    //Thêm các thẻ tr
    //Những dòng từ 10 đến 21 là những dòng xuất hiện trên giao diện
    var tRString = `
    <table>
    <tr>
    <td>${nVien.taiKhoan}</td>
    <td>${nVien.name}</td>
    <td>${nVien.email}</td>
    <td>${nVien.ngayLam}</td>
    <td>${nVien.chucVu}</td>
    <td>${nVien.tinhTongLuong()}</td>
    <td>${nVien.xepLoai()}</td>
    <td>
    <button class="btn btn-danger" onclick ="xoaNhanVien('${nVien.taiKhoan}')">Xoá</button>
    <button class="btn btn-warning" data-toggle="modal"
    data-target="#myModal" onclick ="suaNhanVien('${nVien.taiKhoan}')">Sửa</button>
    </td>
    </tr>
    </table>`
    contentHTML += tRString;
}
//B6: dom tới kết quả cần hiện lên layout.
domID('tableDanhSach').innerHTML = contentHTML;
}

