export const items = [
  { text: 'Dashboard', icon: 'fa fa-home', path: 'dashboard', expanded: false },
  { text: 'Quản lý sản phẩm', icon: 'fa fa-product-hunt', path: 'quan-ly-san-pham', expanded: false },
  { text: 'Quản lý số lượng', icon: 'fa fa-tint', path: 'quan-ly-so-luong', expanded: false },
  {
    text: 'Danh sách danh mục', icon: 'fa fa-list', path: '', expanded: false, children: [
      {
        text: 'Quản lý size',
        path: 'quan-ly-size',
        expanded: false,
      },
      {
        text: 'Quản lý danh mục sản phẩm',
        path: 'quan-ly-danh-muc-san-pham',
        expanded: false,
      },
      {
        text: 'Quản lý màu sắc',
        path: 'quan-ly-thuoc-tinh',
        expanded: false,
      },
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
  { text: 'Quản lý đơn hàng', icon: 'fa fa-check-square', path: 'quan-ly-don-hang', expanded: false },
]