// ===================================
// КОНФИГУРАЦИЯ FIREBASE
// ===================================

/**
 * ИНСТРУКЦИЯ ПО ПОЛУЧЕНИЮ КОНФИГУРАЦИИ:
 *
 * 1. Перейдите в Firebase Console: https://console.firebase.google.com/
 * 2. Создайте новый проект или выберите существующий
 * 3. Перейдите в настройки проекта (⚙️ → Project settings)
 * 4. Прокрутите вниз до раздела "Your apps"
 * 5. Нажмите на иконку </> (Web app)
 * 6. Зарегистрируйте приложение с именем "MangaHub"
 * 7. Скопируйте значения из firebaseConfig и замените плейсхолдеры ниже
 *
 * ВАЖНО: Не коммитьте реальные ключи в публичный репозиторий!
 * Для продакшена используйте переменные окружения или Firebase Hosting.
 */

export const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

/**
 * Проверка, настроен ли Firebase
 * Возвращает true, если конфигурация содержит реальные значения
 */
export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
           firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
           !firebaseConfig.apiKey.includes("YOUR_");
}

/**
 * Получение сообщения о необходимости настройки Firebase
 */
export function getConfigurationMessage() {
    return "Firebase не настроен. Сайт работает в гостевом режиме с локальным хранилищем. " +
           "Для включения авторизации через Google настройте Firebase согласно инструкции в FIREBASE_SETUP.md";
}