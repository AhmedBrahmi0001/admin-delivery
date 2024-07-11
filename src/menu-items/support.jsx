// assets
import { BookOutlined, PhoneOutlined, ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  BookOutlined,
  PhoneOutlined,
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'help-center',
      title: 'Help Center',
      type: 'item',
      url: '/support/help-center',
      icon: icons.BookOutlined
    },
    {
      id: 'contact-support',
      title: 'Contact Support',
      type: 'item',
      url: '/support/contact',
      icon: icons.PhoneOutlined
    }
  ]
};

export default support;
