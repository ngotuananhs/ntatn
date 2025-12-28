export const weddingData = {
  // Thông tin cô dâu chú rể
  groom: {
    name: "Tuấn Anh",
    fullName: "Ngô Minh Đức - Tuấn Anh",
    father: "Ngô Minh Đức",
    mother: "Lưu Thị Hoa",
    address: "Xóm 7 Liên Hồng - Vô Tranh - Phú Lương - Thái Nguyên"
  },
  bride: {
    name: "Thảo Nguyên",
    fullName: "Hoàng Doãn Thái - Thảo Nguyên",
    father: "Hoàng Doãn Thái",
    mother: "Chu Thuý Vân",
    address: "Xóm Đồng Chân - Xã Phú Lương - Tỉnh Thái Nguyên"
  },
  
  // Thông tin đám cưới
  wedding: {
    date: "10.01.2026",
    dayOfWeek: "Thứ Bảy",
    lunarDate: "22 tháng 11 năm Ất Tỵ",
    year: 2026,
    month: 1,
    day: 10
  },
  
  // Tiệc nhà trai
  groomCeremony: {
    title: "Lễ Thành Hôn",
    venue: "Tư Gia Nhà Trai",
    address: "Xóm 7 Liên Hồng - Vô Tranh - Phú Lương - Thái Nguyên",
    time: "09 giờ 30",
    date: "10.01.2026"
  },
  
  // Tiệc nhà gái
  brideCeremony: {
    title: "Tiệc Mừng Lễ Thành Hôn",
    venue: "Sân Trường Tiểu Học Vô Tranh",
    address: "Xóm 7 Liên Hồng - Vô Tranh - Phú Lương - Thái Nguyên",
    time: "",
    date: "10.01.2026"
  },
  
  // Thông điệp
  message: {
    invitation: "Trân trọng kính mời",
    groomSide: "Tới dự bữa cơm thân mật mừng lễ thành hôn của hai con chúng tôi",
    closing: "Sự hiện diện của Quý vị là niềm vinh hạnh của gia đình chúng tôi!",
    welcome: "Rất hân hạnh được đón tiếp!"
  },
  
  // Monogram
  monogram: {
    letters: "A ♡ N",
    date: "10.01.26"
  }
};

export type WeddingData = typeof weddingData;
