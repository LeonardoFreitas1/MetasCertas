import antdSA from 'antd/lib/locale-provider/ca_ES';
import appLocaleData from 'react-intl/locale-data/es';
import saMessages from '../locales/pt_BR.json';

const saLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'pt',
  data: appLocaleData
};
export default saLang;
