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
    address: "Xóm Đồng Chằm - Xã Phú Lương - Tỉnh Thái Nguyên"
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
    date: "10.01.2026",
    mapsUrl: "https://maps.app.goo.gl/Z4sADbRjDEWJosMS8",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d231.71852137052832!2d105.7622925751557!3d21.68344145987334!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1svi!2s!4v1767148087447!5m2!1svi!2s"
  },
  
  // Tiệc nhà gái
  brideCeremony: {
    title: "Lễ Vu Quy",
    venue: "Tư Gia Nhà Gái",
    address: "Xóm Đồng Chằm - Xã Phú Lương - Tỉnh Thái Nguyên",
    time: "16 giờ 30",
    date: "09.01.2026",
    lunarDate: "21 tháng 11 năm Ất Tỵ",
    mapsUrl: "https://maps.app.goo.gl/y5JuyiXLw9PtXcon7"
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
