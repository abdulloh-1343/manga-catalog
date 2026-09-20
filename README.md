# 📚 MangaHub — Каталог манги с авторизацией через Google

Полнофункциональный веб-каталог манги с авторизацией через Google OAuth, синхронизацией данных в облаке и офлайн-поддержкой. Разработан на чистом HTML5, CSS3 и современном ванильном JavaScript (ES6+ модули) без использования фреймворков или сборщиков.

🌐 **Демо:** https://abdulloh-1343.github.io/manga-catalog/

---

## ✨ Основные возможности

### 🎯 Для пользователей

- **Полноценный гостевой режим** — все функции доступны без регистрации через `localStorage`
- **Авторизация через Google** — быстрый вход через Firebase Authentication
- **Автоматическая миграция данных** — при первом входе локальные закладки и история переносятся в облако
- **Умный каталог** с фильтрацией по жанрам, годам, статусу, рейтингу
- **Детальные страницы манги** с описанием, главами, отзывами и рекомендациями
- **Система отзывов и оценок** — публичные отзывы с 5-звездочным рейтингом
- **Личный профиль** — закладки, история чтения, ваши отзывы, настройки
- **Раздел новостей** индустрии манги с фильтрацией по категориям
- **Темная/светлая тема** с автоопределением по системным настройкам
- **Адаптивный дизайн** — работает на всех устройствах от смартфонов до десктопов
- **Офлайн-поддержка** — Firestore offline persistence через IndexedDB

### 🔧 Технические особенности

- **Чистый Vanilla JavaScript** — ES6+ модули, без фреймворков, без сборщиков
- **Firebase Integration:**
  - Authentication (Google OAuth с popup/redirect fallback)
  - Cloud Firestore (с правилами безопасности)
  - Offline Persistence (IndexedDB)
- **Двухслойное хранилище** — автоматическое переключение между `localStorage` (гости) и Firestore (авторизованные)
- **Процедурная генерация обложек** — CSS-градиенты из названий манги (нет зависимости от внешних изображений)
- **XSS-защита** — строгая санитизация пользовательского ввода
- **SEO-оптимизация** — семантический HTML5, мета-теги, JSON-LD микроразметка
- **GitHub Pages ready** — `.nojekyll`, относительные пути, нулевая конфигурация

---

## 🗂 Структура проекта

```
manga-catalog/
├── .nojekyll                  # Отключает Jekyll обработку на GitHub Pages
├── index.html                 # Главная страница
├── catalog.html               # Каталог с фильтрами
├── manga-detail.html          # Детальная страница манги
├── news.html                  # Новости индустрии
├── profile.html               # Профиль пользователя
│
├── css/
│   ├── styles.css             # Базовые стили, переменные, компоненты
│   └── additional-styles.css  # Стили для отдельных страниц
│
├── js/
│   ├── data.js                # Статический датасет, утилиты, функции поиска/фильтрации
│   ├── firebase-config.js     # Конфигурация Firebase (заполните реальными значениями!)
│   ├── storage.js             # Унифицированный слой хранения (localStorage ↔ Firestore)
│   ├── auth.js                # Авторизация через Google, управление сессией
│   ├── app.js                 # Общие компоненты (шапка, поиск, переключатель темы)
│   ├── catalog.js             # Логика страницы каталога
│   ├── manga-detail.js        # Логика детальной страницы
│   ├── news.js                # Логика страницы новостей
│   └── profile.js             # Логика профиля пользователя
│
├── firestore.rules            # Правила безопасности Firestore
├── FIREBASE_SETUP.md          # 🔥 Подробная инструкция по настройке Firebase
├── DEPLOY.md                  # 🚀 Пошаговое руководство по деплою на GitHub Pages
└── README.md                  # Этот файл
```

---

## 🚀 Быстрый старт

### Вариант 1: Локальный запуск (гостевой режим)

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/abdulloh-1343/manga-catalog.git
   cd manga-catalog
   ```

2. **Запустите локальный сервер:**
   
   С помощью Python:
   ```bash
   python -m http.server 8000
   ```
   
   С помощью Node.js (npx):
   ```bash
   npx serve
   ```
   
   С помощью VS Code: установите расширение "Live Server" и нажмите "Go Live"

3. **Откройте в браузере:**
   ```
   http://localhost:8000
   ```

Сайт будет работать в **гостевом режиме** с `localStorage`. Кнопка "Войти через Google" будет показываться, но авторизация не сработает без настройки Firebase.

---

### Вариант 2: Полноценный запуск с Firebase

1. **Настройте Firebase проект:**
   
   Следуйте подробной инструкции в `FIREBASE_SETUP.md`:
   - Создайте проект в Firebase Console
   - Включите Google Authentication
   - Создайте Firestore Database
   - Настройте правила безопасности
   - Добавьте домен в Authorized Domains

2. **Обновите конфигурацию:**
   
   Откройте `js/firebase-config.js` и замените плейсхолдеры на реальные значения из Firebase Console:
   ```javascript
   export const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789012",
       appId: "1:123456789012:web:abc123..."
   };
   ```

3. **Запустите сервер** (см. Вариант 1, шаг 2)

4. **Тестируйте авторизацию:**
   - Нажмите "Войти через Google"
   - Выберите Google-аккаунт
   - Данные из `localStorage` автоматически мигрируют в Firestore

---

### Вариант 3: Деплой на GitHub Pages

Следуйте полной инструкции в `DEPLOY.md`:

1. Создайте GitHub репозиторий `manga-catalog`
2. Загрузите код через `git push`
3. Активируйте GitHub Pages в настройках репозитория
4. Добавьте `your-username.github.io` в Firebase Authorized Domains
5. Готово! Сайт доступен по адресу `https://your-username.github.io/manga-catalog/`

---

## 🏗 Архитектура

### Слой данных (Data Layer)

**`data.js`** — статический датасет и утилиты:
- `MANGA_DATA` — массив с 8 тайтлами, жанрами, новостями
- `generateGradientFromTitle()` — создает уникальный CSS-градиент из строки
- `searchManga()`, `filterManga()`, `sortManga()` — функции для работы с каталогом
- `Utils` — хелперы для форматирования, экранирования HTML, рендера звезд и т.д.

### Слой хранилища (Storage Layer)

**`storage.js`** — унифицированный интерфейс для данных пользователя:

```javascript
// Работает одинаково для гостей (localStorage) и авторизованных (Firestore)
await getBookmarks()           // → [1, 5, 7]
await toggleBookmark(3)        // Добавляет/удаляет закладку
await getReadingProgress()     // → [{ mangaId: 1, currentChapter: 15 }, ...]
await setProgress(1, 20)       // Сохраняет прогресс чтения
await addReview(5, 4, "Отлично!") // Добавляет публичный отзыв
```

**Логика:**
- Если пользователь НЕ авторизован → `localStorage`
- Если пользователь авторизован → Firestore (`users/{uid}/*`, `reviews/{mangaId}/items/{uid}`)
- При первом входе → автоматическая миграция данных из localStorage в Firestore

### Слой авторизации (Auth Layer)

**`auth.js`** — управление сессией:
- `initAuth()` — инициализация Firebase Auth, рендер кнопки входа/аватара
- `signInWithGoogle()` — вход через popup (с fallback на redirect для мобильных)
- `signOutUser()` — выход из аккаунта
- `onAuthStateChange(callback)` — подписка на изменение состояния
- Автоопределение мобильных устройств для выбора метода авторизации

### Страницы (Pages)

- **`app.js`** — общий код для всех страниц (шапка, поиск, переключатель темы)
- **`catalog.js`** — фильтры, сортировка, пагинация, синхронизация URL
- **`manga-detail.js`** — детальная информация, список глав, отзывы, рейтинг
- **`news.js`** — новости с фильтрацией по категориям
- **`profile.js`** — вкладки (Закладки, Читаю, Отзывы, Настройки), гостевая стенка

---

## 🔐 Безопасность

### Firebase Security Rules

Правила в `firestore.rules` обеспечивают:
- Каждый пользователь имеет доступ только к своим данным (`users/{uid}/**`)
- Публичные отзывы может читать кто угодно, редактировать — только автор
- Валидация типов и длины полей (рейтинг 1-5, текст до 5000 символов)

### XSS Protection

Все пользовательские данные проходят через `Utils.escapeHtml()` перед вставкой в DOM:
```javascript
container.innerHTML = `<h1>${Utils.escapeHtml(manga.title)}</h1>`;
```

### API Key

Firebase API Key в `firebase-config.js` **не является секретом** — это публичный идентификатор проекта. Настоящий контроль доступа реализован через:
- Firestore Security Rules
- Authentication настройки (Authorized Domains)

Поэтому `firebase-config.js` безопасно коммитить в публичный репозиторий.

---

## 🎨 Дизайн и UX

### Темная/светлая тема

CSS-переменные в `:root` и `[data-theme="dark"]` обеспечивают мгновенное переключение:
```css
:root {
    --text-primary: #1d3557;
    --bg-primary: #ffffff;
}

[data-theme="dark"] {
    --text-primary: #e9ecef;
    --bg-primary: #0d1117;
}
```

Тема автоматически определяется через `prefers-color-scheme` и сохраняется в `localStorage`.

### Процедурная генерация обложек

Вместо внешних изображений используются CSS-градиенты:
```javascript
function generateGradientFromTitle(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 60) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 45%))`;
}
```

**Преимущества:**
- Нет битых ссылок
- Мгновенная загрузка
- Уникальность для каждого тайтла
- Нет проблем с авторскими правами

---

## 📱 Адаптивность

Responsive брейкпоинты:
- **Desktop:** > 968px (полная навигация, двухколоночные лейауты)
- **Tablet:** 640px - 968px (одноколоночные лейауты, упрощенная навигация)
- **Mobile:** < 640px (гамбургер-меню, вертикальные карточки)

CSS Grid и Flexbox обеспечивают гибкость без медиа-запросов где возможно:
```css
.manga-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
}
```

---

## 🧪 Тестирование

### Ручное тестирование

**Гостевой режим:**
1. Откройте сайт без авторизации
2. Добавьте закладки → проверьте DevTools → Application → Local Storage
3. Поставьте оценку → она должна сохраниться локально
4. Закройте и откройте браузер → данные должны сохраниться

**Авторизованный режим:**
1. Войдите через Google
2. Добавьте закладку → проверьте Firebase Console → Firestore → `users/{uid}/bookmarks`
3. Оставьте отзыв → проверьте `reviews/{mangaId}/items/{uid}`
4. Откройте сайт в режиме инкогнито → ваш отзыв должен быть виден публично

**Миграция данных:**
1. В гостевом режиме добавьте несколько закладок
2. Войдите через Google
3. Должен появиться toast "Мы нашли локальные данные..."
4. Нажмите "Перенести" → данные должны появиться в Firestore

### DevTools Network

Откройте вкладку Network и проверьте:
- Все `.js` и `.css` файлы загружаются с кодом 200
- Firebase SDK загружается с `www.gstatic.com`
- API-запросы к Firestore идут на `firestore.googleapis.com`

---

## 🛠 Обслуживание и обновления

### Добавление новой манги

Откройте `js/data.js` и добавьте объект в массив `MANGA_DATA.manga`:
```javascript
{
    id: 9,
    title: "Новый тайтл",
    titleAlt: "New Title",
    genres: ["Экшен", "Фантастика"],
    rating: 8.5,
    votes: 1200,
    chapters: 45,
    status: "ongoing",
    year: 2026,
    author: "Автор Имя",
    description: "Описание...",
    gradient: generateGradientFromTitle("Новый тайтл")
}
```

### Обновление стилей

Изменяйте CSS-переменные в `css/styles.css`:
```css
:root {
    --primary-color: #e63946;  /* Основной цвет */
    --border-radius: 12px;     /* Радиус скругления */
}
```

### Добавление новых функций

1. Создайте новый модуль в `js/`
2. Экспортируйте функции через `export`
3. Импортируйте в нужной странице через `import { ... } from './module.js'`
4. Не забудьте `<script type="module">` в HTML

---

## 🐛 Известные ограничения

1. **Статический датасет** — манга хранится в `data.js`, без админ-панели для добавления новых тайтлов
2. **Нет реального чтения глав** — клик по главе показывает `alert()` вместо ридера
3. **Простая система рекомендаций** — основана на совпадении жанров, без ML-алгоритмов
4. **Firestore Offline Persistence** — работает только в поддерживаемых браузерах (Chrome, Firefox, Safari; не работает в режиме инкогнито)

---

## 📜 Лицензия

MIT License — свободно используйте, изменяйте и распространяйте.

---

## 🤝 Контакты и поддержка

**GitHub:** https://github.com/abdulloh-1343/manga-catalog

**Issues:** https://github.com/abdulloh-1343/manga-catalog/issues

---

## 📚 Дополнительные ресурсы

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Cloud Firestore Guide](https://firebase.google.com/docs/firestore)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

🎉 **Спасибо за использование MangaHub!** Если проект был полезен, поставьте ⭐ на GitHub.

---

**Создано с помощью Claude Opus 4.6** 🤖
