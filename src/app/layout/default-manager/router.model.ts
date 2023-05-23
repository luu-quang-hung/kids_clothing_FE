export const items = [
  { text: 'Thống kê', icon: 'fa fa-home', path: 'dashboard', expanded: false },
  {
    text: 'Quản lý sản phẩm ', icon: 'fa fa-list', path: '', expanded: false, children: [
      { text: 'Sản phẩm', path: 'quan-ly-san-pham', expanded: false },
      { text: 'Chi tiết số lượng sản phẩm', path: 'quan-ly-so-luong', expanded: false },
      {
        text: 'Kích cỡ sản phẩm',
        path: 'quan-ly-size',
        expanded: false,
      },
      {
        text: 'Danh mục sản phẩm',
        path: 'quan-ly-danh-muc-san-pham',
        expanded: false,
      },
      {
        text: 'Màu sắc sản phẩm',
        path: 'quan-ly-thuoc-tinh',
        expanded: false,
      },

    ]
  },
  {
    text: 'Quản lý sự kiện ', icon: 'fa fa-list', path: '', expanded: false, children: [
      {
        text: 'Quản lý sự kiện',
        path: 'quan-ly-event',
        expanded: false,
      },
      {
        text: 'Quản lý voucher',
        path: 'quan-ly-voucher',
        expanded: false,
      },
    ]

  },

  { text: 'Quản lý tài khoản', icon: 'fa fa-users', path: 'quan-ly-tai-khoan', expanded: false },
  { text: 'Quản khách hàng ', icon: 'fa fa-users', path: 'quan-ly-khach-hang', expanded: false },
  { text: 'Quản lý đơn hàng', icon: 'fa fa-check-square', path: 'quan-ly-don-hang', expanded: false },
]
