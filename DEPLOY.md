# 🚀 Развертывание на GitHub Pages

Это пошаговое руководство по публикации вашего сайта на GitHub Pages.

## ⚠️ ВАЖНЫЙ ПОРЯДОК ДЕЙСТВИЙ

**Сначала деплоим в гостевом режиме, потом подключаем Firebase!**

Это самый безопасный подход:
1. Убеждаемся, что сайт вообще открывается на GitHub Pages (пути не побились из-за подпапки `/manga-catalog/`)
2. Только потом настраиваем Firebase с правилами безопасности

## 📋 Предварительные требования

- Аккаунт GitHub (https://github.com)
- Git установлен на вашем компьютере
- ❌ Firebase пока **НЕ** настраиваем (это будет Шаг 6)

---

## Шаг 1: Подготовка проекта

### 1.1 Проверьте структуру файлов

Убедитесь, что в корне проекта `manga-catalog/` есть:

```
manga-catalog/
├── .nojekyll          ← Критически важен!
├── index.html
├── catalog.html
├── manga-detail.html
├── news.html
├── profile.html
├── css/
│   ├── styles.css
│   └── additional-styles.css
├── js/
│   ├── data.js
│   ├── firebase-config.js  ← С реальными значениями!
│   ├── storage.js
│   ├── auth.js
│   ├── app.js
│   ├── catalog.js
│   ├── manga-detail.js
│   ├── news.js
│   └── profile.js
├── firestore.rules
├── README.md
├── FIREBASE_SETUP.md
└── DEPLOY.md (этот файл)
```

### 1.2 Убедитесь, что firebase-config.js содержит ПЛЕЙСХОЛДЕРЫ

**На этом этапе `js/firebase-config.js` должен содержать плейсхолдеры:**

```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    // и т.д.
};
```

✅ Это **правильно** для первого деплоя. Сайт будет работать в гостевом режиме через `localStorage`.

❌ **НЕ** заполняйте реальные значения до Шага 6, когда настроим правила безопасности Firestore!

---

## Шаг 2: Создание GitHub репозитория

### 2.1 Создание репозитория через веб-интерфейс

1. Перейдите на https://github.com и войдите в аккаунт `abdulloh-1343`
2. Нажмите **"+"** в правом верхнем углу → **"New repository"**
3. Заполните форму:
   - **Repository name:** `manga-catalog` (обязательно точное совпадение!)
   - **Description:** (опционально) `📚 Полнофункциональный каталог манги с авторизацией через Google`
   - **Public** (выберите публичный репозиторий)
   - ❌ **НЕ** ставьте галочки "Initialize with README", "Add .gitignore", "Choose a license"
4. Нажмите **"Create repository"**

GitHub покажет инструкции — пока не закрывайте эту страницу.

---

## Шаг 3: Загрузка кода в репозиторий

### 3.1 Откройте терминал

Откройте терминал (Git Bash, Terminal, или CMD) и перейдите в папку проекта:

```bash
cd "C:\Users\madae\Desktop\пустая папка для экспериментов\manga-catalog"
```

### 3.2 Инициализация Git

Выполните следующие команды **по порядку**:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов в staging
git add .

# Создание первого коммита
git commit -m "Initial commit: Complete manga catalog with Firebase auth

- Full-featured responsive manga catalog
- Google OAuth authentication via Firebase
- Dual storage (localStorage for guests, Firestore for users)
- Dark/light theme with system preference
- Catalog with filters, sorting, pagination
- Manga detail pages with reviews and ratings
- User profiles with bookmarks and reading progress
- News section
- Complete documentation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Переименование ветки в main (если у вас master)
git branch -M main

# Добавление удаленного репозитория
git remote add origin https://github.com/abdulloh-1343/manga-catalog.git

# Отправка кода на GitHub
git push -u origin main
```

### 3.3 Проверка загрузки

1. Обновите страницу репозитория на GitHub
2. Вы должны увидеть все файлы проекта
3. Убедитесь, что файл `.nojekyll` присутствует в корне (он может быть скрыт в проводнике, но виден на GitHub)

---

## Шаг 4: Активация GitHub Pages

### 4.1 Настройка через веб-интерфейс

1. Перейдите в настройки репозитория:
   ```
   https://github.com/abdulloh-1343/manga-catalog/settings
   ```

2. В левом меню выберите **"Pages"**

3. В разделе **"Source"** (Источник):
   - **Branch:** выберите `main`
   - **Folder:** выберите `/ (root)`

4. Нажмите **"Save"**

5. GitHub начнет деплой. Через 1-2 минуты вверху появится сообщение:
   ```
   Your site is live at https://abdulloh-1343.github.io/manga-catalog/
   ```

### 4.2 Первая проверка (гостевой режим)

1. Перейдите по ссылке: https://abdulloh-1343.github.io/manga-catalog/
2. Сайт должен загрузиться и работать в гостевом режиме
3. Проверьте:
   - ✅ Главная страница отображается
   - ✅ Каталог работает с фильтрами
   - ✅ Детальные страницы манги открываются
   - ✅ Закладки сохраняются в `localStorage`
   - ✅ Темная/светлая тема переключается
   - ✅ В шапке видна кнопка "Войти через Google"

---

## Шаг 5: Проверка работы в гостевом режиме

### 5.1 Полное тестирование

Сайт должен **полностью работать** без Firebase:

1. **Главная страница:**
   - ✅ Загружается без ошибок
   - ✅ Карточки манги отображаются с градиентными обложками
   - ✅ Кнопка "Войти через Google" видна в шапке

2. **Каталог:**
   - ✅ Фильтры работают (жанры, годы, статус, рейтинг)
   - ✅ Сортировка применяется
   - ✅ Пагинация переключается

3. **Детальная страница:**
   - ✅ Открывается при клике на карточку
   - ✅ Показываются главы
   - ✅ Форма отзыва отображается
   - ✅ Кнопка "Добавить в закладки" работает (данные сохраняются в `localStorage`)

4. **Профиль:**
   - ✅ Показывает гостевое сообщение "Войдите через Google..."
   - ✅ НЕ показывает белый экран или ошибки

### 5.2 Проверка DevTools

Откройте DevTools (F12) → Console:

- ✅ Нет красных ошибок (кроме предупреждения о Firebase placeholders — это нормально)
- ✅ Все `.js` и `.css` файлы загрузились (вкладка Network)

### 5.3 Тест закладок в localStorage

1. Добавьте несколько тайтлов в закладки
2. Откройте DevTools → Application → Local Storage → `https://abdulloh-1343.github.io`
3. Там должен быть ключ `manga_bookmarks` с вашими закладками
4. Перезагрузите страницу (F5) — закладки должны сохраниться

**Если всё работает — переходите к Шагу 6 (настройка Firebase).**

**Если есть проблемы с путями или 404 ошибки — смотрите раздел "Решение проблем" в конце документа.**

---

## Шаг 6: Настройка Firebase (финальный этап)

### ⚠️ КРИТИЧНО: Порядок действий для безопасности

**НИКОГДА не выкладывайте реальный Firebase config до настройки правил безопасности!**

Если выложить конфиг с дефолтными правилами Firestore (`allow read, write: if true`), любой сможет писать в вашу базу данных.

### 6.1 Создание проекта Firebase

Откройте `FIREBASE_SETUP.md` и выполните **Шаги 1-2** (создание проекта, регистрация веб-приложения).

**НЕ КОПИРУЙТЕ конфигурацию в код пока! Сначала настроим безопасность.**

### 6.2 Настройка Authentication

Выполните `FIREBASE_SETUP.md` → **Шаг 3** (включение Google OAuth, добавление домена `abdulloh-1343.github.io`).

### 6.3 Создание Firestore Database

**КРИТИЧНО:** При создании выбирайте **Production mode**, а НЕ Test mode!

1. Firebase Console → Firestore Database → Create database
2. Выберите **"Start in production mode"**
   - ❌ **НЕ** выбирайте "Test mode" — это открытые правила на 30 дней!
3. Выберите регион (например, `europe-west1`)
4. Нажмите Enable

### 6.4 Публикация правил безопасности

**Делайте это ДО того, как обновите `firebase-config.js`!**

1. Firestore Database → Rules
2. Вставьте содержимое из `firestore.rules`:

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
4. Убедитесь, что правила применились (не должно быть красных ошибок)

### 6.5 Обновление конфигурации

**Только теперь** можно добавить реальные значения!

1. Скопируйте конфигурацию из Firebase Console (Шаг 2 регистрации приложения)
2. Откройте `js/firebase-config.js`
3. Замените плейсхолдеры:

```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyBcD3fGh1JkLmN0PqRsTuVwXyZ",              // Ваш реальный API Key
    authDomain: "mangahub-2026.firebaseapp.com",
    projectId: "mangahub-2026",
    storageBucket: "mangahub-2026.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9"
};

export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
           firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
           !firebaseConfig.apiKey.includes("YOUR_");
}
```

4. Сохраните файл

### 6.6 Коммит и деплой с Firebase

```bash
git add js/firebase-config.js
git commit -m "Enable Firebase authentication and Firestore

- Add real Firebase project configuration
- Firestore security rules already published
- Authorized domain configured

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

Подождите 1-2 минуты для применения изменений на GitHub Pages.

---

## Шаг 7: Финальная проверка с Firebase

### 7.1 Тестирование авторизации

1. Откройте сайт: https://abdulloh-1343.github.io/manga-catalog/
2. Нажмите **"Войти через Google"**
3. Выберите Google-аккаунт
4. После входа:
   - ✅ В шапке должен появиться ваш аватар
   - ✅ При переходе в профиль вы увидите свои данные
   - ✅ Если у вас были закладки в localStorage, появится toast с предложением мигрировать данные в облако

5. Проверьте Firebase Console → **Authentication** → **Users**
   - Там должна появиться запись с вашим email

### 7.2 Проверка безопасности

**Убедитесь, что правила работают:**

1. Откройте DevTools → Console
2. Вставьте и выполните:
   ```javascript
   // Импортируем модульный Firestore SDK
   import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
   
   // Получаем экземпляр Firestore
   const db = getFirestore();
   
   // Попытка записать в чужой профиль (должна провалиться с permission-denied)
   setDoc(doc(db, 'users', 'fake-uid-12345'), { test: 'hack attempt' })
     .then(() => {
       console.error('❌ ОПАСНОСТЬ: Правила не работают! Любой может писать в чужие профили!');
     })
     .catch((error) => {
       if (error.code === 'permission-denied') {
         console.log('✅ Правила работают корректно — запись в чужой профиль заблокирована');
       } else {
         console.warn('⚠️ Ошибка, но не permission-denied:', error.code, error.message);
       }
     });
   ```

3. **Ожидаемый результат:**
   ```
   ✅ Правила работают корректно — запись в чужой профиль заблокирована
   ```

4. **Если увидели красное сообщение "ОПАСНОСТЬ":**
   - ❌ **НЕ** продолжайте деплой
   - Вернитесь к Шагу 6.4 и убедитесь, что правила из `firestore.rules` опубликованы
   - Проверьте Firebase Console → Firestore → Rules — там должны быть правила с `request.auth.uid == userId`

---

## Шаг 8: Обновление сайта в будущем

### 8.1 Внесение изменений

1. Внесите изменения в файлы локально
2. Откройте терминал в папке проекта
3. Выполните команды:

```bash
# Проверка изменений
git status

# Добавление измененных файлов
git add .

# Создание коммита
git commit -m "Описание изменений"

# Отправка на GitHub
git push
```

### 8.2 Автоматический деплой

GitHub Pages автоматически пересоберет сайт после каждого `git push`. Обычно это занимает 1-2 минуты.

Проверить статус деплоя можно:
1. Перейдите в репозиторий на GitHub
2. Вкладка **"Actions"**
3. Последний workflow должен показывать зеленую галочку ✅

---

## 🔧 Решение проблем

### Проблема: Сайт не открывается (404)

**Причина:** GitHub Pages еще не закончил деплой, или неверно настроен source.

**Решение:**
1. Проверьте Settings → Pages: должен быть выбран `main` branch и `/ (root)` folder
2. Подождите 3-5 минут
3. Проверьте Actions → последний workflow должен быть завершен успешно
4. Убедитесь, что файл `.nojekyll` присутствует в корне репозитория

---

### Проблема: Ошибка "Failed to load module script"

**Причина:** Относительные пути не работают, или отсутствует `.nojekyll`.

**Решение:**
1. Убедитесь, что в корне репозитория есть файл `.nojekyll`
2. Все импорты в HTML должны использовать относительные пути:
   ```html
   <script type="module" src="./js/app.js"></script>
   ```
   (а не `/js/app.js` или `js/app.js`)
3. Сделайте коммит и push

---

### Проблема: "Firebase: Error (auth/unauthorized-domain)"

**Причина:** Домен GitHub Pages не добавлен в Authorized domains.

**Решение:**
1. Firebase Console → Authentication → Settings → Authorized domains
2. Добавьте `abdulloh-1343.github.io`
3. Подождите 2-3 минуты
4. Очистите кеш браузера (Ctrl+Shift+R / Cmd+Shift+R)

---

### Проблема: CSS или JS не загружаются

**Причина:** Неверные пути или Jekyll обработал файлы.

**Решение:**
1. Убедитесь, что `.nojekyll` присутствует
2. Проверьте пути в HTML:
   ```html
   <link rel="stylesheet" href="./css/styles.css">
   <script type="module" src="./js/app.js"></script>
   ```
3. Откройте DevTools (F12) → вкладка Network, проверьте какие файлы загружаются с ошибками
4. Если пути верные, попробуйте force-обновить: Settings → Pages → сменить branch на `none`, сохранить, затем обратно на `main`

---

### Проблема: Изменения не применяются после git push

**Причина:** GitHub Pages кеширует файлы, или браузер использует старую версию.

**Решение:**
1. Очистите кеш браузера: Ctrl+Shift+R (Windows/Linux) или Cmd+Shift+R (Mac)
2. Откройте режим инкогнито и проверьте там
3. Проверьте Actions на GitHub — деплой должен завершиться успешно
4. Подождите 3-5 минут — GitHub Pages иногда медленно обновляется

---

## 📊 Мониторинг и аналитика

### GitHub Actions

Каждый `git push` автоматически запускает workflow для деплоя:
- Перейдите в репозиторий → вкладка **"Actions"**
- Там вы увидите историю деплоев и их статус

### Firebase Analytics (опционально)

Если вы включили Google Analytics при создании проекта Firebase:
1. Firebase Console → Analytics → Dashboard
2. Здесь можно видеть количество пользователей, популярные страницы и т.д.

---

## 🎉 Готово!

Ваш сайт теперь доступен по адресу:
```
https://abdulloh-1343.github.io/manga-catalog/
```

**Основные возможности:**
- ✅ Работа в гостевом режиме без авторизации
- ✅ Авторизация через Google
- ✅ Синхронизация данных с Firestore
- ✅ Офлайн-поддержка с IndexedDB persistence
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Темная/светлая тема

**Следующие шаги:**
1. Поделитесь ссылкой с друзьями
2. Соберите обратную связь
3. Добавьте новые функции по мере необходимости
4. Используйте `git commit` и `git push` для обновлений

---

---

## 🔒 Важные замечания по безопасности

### API Key можно коммитить, НО...

**Firebase API Key НЕ является секретом** — это публичный идентификатор проекта. Его безопасно коммитить в публичный репозиторий.

**НО:** Безопасность обеспечивается правилами Firestore и настройками Authentication!

### ✅ Безопасная последовательность (как в этой инструкции):

1. Создать Firestore в **Production mode**
2. Опубликовать правила из `firestore.rules`
3. Только потом выложить конфиг с реальными значениями

### ❌ ОПАСНАЯ последовательность:

1. Создать Firestore в **Test mode** (правила `allow read, write: if true`)
2. Выложить конфиг с реальными значениями
3. **→ Любой сможет читать/писать в вашу базу данных!**

### Проверка правил после деплоя:

```bash
# Должно вывести ваши правила, а НЕ "allow read, write: if true"
firebase firestore:rules:get
```

Или проверьте в Firebase Console → Firestore → Rules.

---

## 📚 Дополнительные ресурсы

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Hosting](https://firebase.google.com/docs/hosting) (если захотите мигрировать с GitHub Pages)

Если возникнут вопросы — смотрите `README.md` для общего обзора проекта и архитектуры.
