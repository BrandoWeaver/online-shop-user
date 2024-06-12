import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  kh: {
    translation: {
      "Select Lanuage": "ជ្រើសរើសភាសា",
      Logout: "ចាកចេញ",
      "Sign In": "ចូលគណនី",
      "You are not signed In": "អ្នកមិនទាន់បានបង្កើតគណនីទេ",
      Language: "ភាសា",
      "About Us": "អំពីយើង",
      "Term Of Use": "គោលការណ៍ប្រើប្រាស់",
      "Dark Mode": "របៀបងងឹត",
      "FOLLOW US": "តាមដានយើង",
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
// index.tsx
// import i18n from 'i18next';
// import XHRBackend from 'i18next-xhr-backend';
// import { initReactI18next } from 'react-i18next';

// i18n
//   .use(XHRBackend)
//   .use(initReactI18next)
//   .init({
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//       crossDomain: false, // Add this line
//     },
//     lng: 'en',
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
