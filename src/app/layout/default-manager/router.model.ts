export const items = [
  { text: 'Dashboard', icon: 'fa fa-home', path: 'dashboard', expanded: false },
  {
    text: 'Danh sách sản phẩm ', icon: 'fa fa-list', path: '', expanded: false, children: [
      { text: 'Quản lý sản phẩm', path: 'quan-ly-san-pham', expanded: false },
      { text: 'Quản lý số lượng', path: 'quan-ly-so-luong', expanded: false },
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