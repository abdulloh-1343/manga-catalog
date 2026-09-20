# 🔥 Настройка Firebase для MangaHub

Это подробное руководство по настройке Firebase для вашего приложения манга-каталога.

## 📋 Что вам понадобится

- Аккаунт Google
- 10-15 минут свободного времени

---

## Шаг 1: Создание проекта Firebase

1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Нажмите **"Добавить проект"** (Add project)
3. Введите название проекта, например: `mangahub-2026` или `manga-catalog-app`
4. (Опционально) Отключите Google Analytics, если не планируете его использовать
5. Нажмите **"Создать проект"** и дождитесь завершения

---

## Шаг 2: Регистрация веб-приложения

1. На странице проекта выберите **"Добавить приложение"** → **Web** (значок `</>`).
2. Введите псевдоним приложения, например: `MangaHub Web App`
3. ✅ **ВАЖНО:** Поставьте галочку **"Also set up Firebase Hosting"**
4. Нажмите **"Зарегистрировать приложение"**

Firebase покажет вам объект конфигурации. Скопируйте его — он понадобится позже.

Пример:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBcD3fGh1JkLmN0PqRsTuVwXyZ",
  authDomain: "mangahub-2026.firebaseapp.com",
  projectId: "mangahub-2026",
  storageBucket: "mangahub-2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9"
};
```

---

## Шаг 3: Настройка Firebase Authentication

### 3.1 Включение Google-провайдера

1. В левом меню выберите **Build** → **Authentication**
2. Нажмите **"Get started"** (если Authentication еще не активирован)
3. Перейдите на вкладку **"Sign-in method"**
4. Найдите **Google** в списке провайдеров
5. Нажмите на него, затем переведите переключатель в положение **"Enable"**
6. Укажите **Project public-facing name** (например, "MangaHub")
7. Укажите **Project support email** (ваш email)
8. Нажмите **"Save"**

### 3.2 Добавление авторизованных доменов

1. На той же странице Authentication перейдите на вкладку **"Settings"**
2. Прокрутите до раздела **"Authorized domains"**
3. **Проверьте наличие localhost:**
   - По умолчанию там уже должен быть `localhost` и `*.firebaseapp.com` — это нужно для локальной разработки
   - ✅ Если `localhost` есть в списке — всё в порядке
   - ❌ Если `localhost` отсутствует — нажмите **"Add domain"** и добавьте `localhost`
   
4. Нажмите **"Add domain"** и добавьте ваш GitHub Pages домен:
   ```
   abdulloh-1343.github.io
   ```
5. **Итого в списке должно быть минимум 3 домена:**
   - `localhost` (для локальной разработки)
   - `*.firebaseapp.com` (для Firebase Hosting, если будете использовать)
   - `abdulloh-1343.github.io` (ваш GitHub Pages)

6. Сохраните изменения

> **Почему это важно:** Firebase будет разрешать OAuth popup/redirect только с этих доменов. Без этого пользователи не смогут войти на продакшене.

---

## Шаг 4: Настройка Cloud Firestore

### 4.1 Создание базы данных

1. В левом меню выберите **Build** → **Firestore Database**
2. Нажмите **"Create database"**
3. Выберите режим запуска:
   - **Production mode** (рекомендуется) — правила безопасности по умолчанию запрещают все чтения/записи
4. Выберите регион (ближайший к вашей аудитории), например:
   - `europe-west1` (Бельгия)
   - `us-central1` (Айова)
5. Нажмите **"Enable"**

### 4.2 Настройка правил безопасности

1. Перейдите на вкладку **"Rules"**
2. Замените содержимое на правила из файла `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Личные данные пользователя
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Публичные отзывы
    match /reviews/{mangaId}/items/{userId} {
      allow read: if true;
      allow create, update: if request.auth != null 
                            && request.auth.uid == userId
                            && request.resource.data.rating is int
                            && request.resource.data.rating >= 1 
                            && request.resource.data.rating <= 5
                            && request.resource.data.text is string
                            && request.resource.data.text.size() > 0
                            && request.resource.data.text.size() <= 5000;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Нажмите **"Publish"**

> **Что делают эти правила:**
> - Коллекция `users/{uid}/*` доступна только владельцу
> - Отзывы в `reviews/{mangaId}/items/{uid}` может читать кто угодно, но редактировать — только автор
> - Валидация: рейтинг 1–5, текст до 5000 символов

### 4.3 Включение Offline Persistence (опционально, но рекомендуется)

IndexedDB persistence уже включен в коде (`storage.js`), никаких дополнительных действий в консоли не требуется.

---

## Шаг 5: Обновление конфигурации в проекте

1. Откройте файл `js/firebase-config.js` в вашем проекте
2. Замените плейсхолдеры на реальные значения из **Шага 2**:

```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyBcD3fGh1JkLmN0PqRsTuVwXyZ",              // Ваш реальный API Key
    authDomain: "mangahub-2026.firebaseapp.com",           // Ваш authDomain
    projectId: "mangahub-2026",                            // Ваш projectId
    storageBucket: "mangahub-2026.appspot.com",           // Ваш storageBucket
    messagingSenderId: "123456789012",                     // Ваш messagingSenderId
    appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9"       // Ваш appId
};

export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
           firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
           !firebaseConfig.apiKey.includes("YOUR_");
}
```

3. Сохраните файл

---

## ✅ Проверка настройки

### Локальное тестирование

1. Откройте `index.html` локально (через Live Server в VS Code или любой другой локальный сервер)
2. Нажмите кнопку **"Войти через Google"**
3. Выберите Google-аккаунт
4. После успешного входа должен появиться ваш аватар в шапке

### Проверка в Firebase Console

1. Откройте **Authentication** → вкладка **"Users"**
2. После первого входа здесь должна появиться запись с вашим email

---

## 🔒 Важные замечания по безопасности

### ✅ Что МОЖНО коммитить в Git:
- `firebase-config.js` с реальными значениями
- API Key, projectId, authDomain — это **публичные** идентификаторы

### ❌ Что НЕЛЬЗЯ коммитить:
- Firebase Admin SDK private keys (`.json` файлы с `private_key`)
- Database secrets
- Service account credentials

> **Почему API Key безопасен?** Firebase API Key не является секретом — он идентифицирует ваш проект, но все права доступа контролируются правилами безопасности Firestore и настройками Authentication. Даже если кто-то узнает ваш API Key, он не сможет получить доступ к данным, защищенным правилами.

---

## 🆘 Решение проблем

### Ошибка: "Firebase: Error (auth/unauthorized-domain)"

**Причина:** Домен не добавлен в Authorized domains.

**Решение:**
1. Authentication → Settings → Authorized domains
2. Добавьте `abdulloh-1343.github.io`
3. Подождите 1-2 минуты для применения изменений

---

### Ошибка: "Missing or insufficient permissions"

**Причина:** Правила Firestore не опубликованы или содержат ошибку.

**Решение:**
1. Firestore Database → Rules
2. Проверьте, что правила из раздела 4.2 корректно скопированы
3. Нажмите "Publish"

---

### Popup блокируется браузером

**Причина:** Браузер блокирует всплывающие окна.

**Решение:** Приложение автоматически переключится на redirect-метод. Просто следуйте инструкциям на экране.

---

## 📚 Дополнительные ресурсы

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)

---

**Готово!** Теперь ваше приложение полностью настроено для работы с Firebase. Переходите к `DEPLOY.md` для публикации на GitHub Pages.
