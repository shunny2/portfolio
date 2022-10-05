import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import ptBRJson from './translations/ptBR.json'
import enJson from './translations/en.json'
import esJson from './translations/es.json'

const DETECTION_OPTIONS = {
    order: ['navigator']
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: DETECTION_OPTIONS,
        interpolation: {
            escapeValue: false
        },
        resources: {
            ptBR: ptBRJson,
            en: enJson,
            es: esJson
        },
        fallbackLng: "ptBR"
    })

export default i18n;