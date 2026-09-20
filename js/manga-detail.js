// ===================================
// ДЕТАЛЬНАЯ СТРАНИЦА МАНГИ
// ===================================

import { MANGA_DATA, Utils, generateChapters, getRecommendations } from './data.js';
import { getBookmarks, toggleBookmark, isBookmarked, getPublicReviews, addReview } from './storage.js';
import { initAuth, isAuthenticated } from './auth.js';

let currentManga = null;
let currentChapters = [];
let selectedRating = 0;

// ===================================
// ИНИЦИАЛИЗАЦИЯ
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
    // Инициализация авторизации
    await initAuth();

    // Загрузка данных манги
    loadMangaDetails();
});

function loadMangaDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = parseInt(urlParams.get('id'));

    if (!mangaId) {
        window.location.href = './catalog.html';
        return;
    }

    currentManga = MANGA_DATA.manga.find(m => m.id === mangaId);

    if (!currentManga) {
        window.location.href = './catalog.html';
        return;
    }

    renderMangaHeader();
    renderMangaDescription();
    renderChapters();
    renderReviews();
    renderRelatedManga();
    initButtons();
}

// ===================================
// РЕНДЕРИНГ
// ===================================

function renderMangaHeader() {
    const container = document.getElementById('mangaHeader');
    if (!container) return;

    container.innerHTML = `
        <div class="manga-cover-large" style="background: ${currentManga.gradient}"></div>
        <div class="manga-header-info">
            <h1 class="manga-title-main">${Utils.escapeHtml(currentManga.title)}</h1>
            <p class="manga-title-alt">${Utils.escapeHtml(currentManga.titleAlt)}</p>
            <div class="manga-rating-block">
                <div class="rating-stars">
                    ${Utils.renderStars(currentManga.rating)}
                </div>
                <span class="rating-number">${currentManga.rating}</span>
                <span class="rating-votes">(${Utils.formatNumber(currentManga.votes)} голосов)</span>
            </div>
            <div class="manga-card-genres">
                ${currentManga.genres.map(genre => `
                    <span class="genre-tag">${Utils.escapeHtml(genre)}</span>
                `).join('')}
            </div>
        </div>
    `;
}

function renderMangaDescription() {
    const container = document.getElementById('mangaDescription');
    if (!container) return;
    container.innerHTML = `<p>${Utils.escapeHtml(currentManga.description)}</p>`;
}

function renderChapters() {
    currentChapters = generateChapters(currentManga.id, currentManga.chapters);
    const container = document.getElementById('chaptersList');
    if (!container) return;

    container.innerHTML = currentChapters.map(chapter => `
        <div class="chapter-item" onclick="alert('Чтение главы ${chapter.id}')">
            <div class="chapter-title">${Utils.escapeHtml(chapter.title)}</div>
            <div class="chapter-meta">${chapter.date}</div>
        </div>
    `).join('');
}

async function renderReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;

    // Загружаем публичные отзывы из Firestore/localStorage
    const reviews = await getPublicReviews(currentManga.id);

    if (reviews.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Пока нет отзывов. Будьте первым!</p>';
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author"><strong>${Utils.escapeHtml(review.authorName || 'Аноним')}</strong></span>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p class="review-text">${Utils.escapeHtml(review.text)}</p>
        </div>
    `).join('');
}

function renderRelatedManga() {
    const container = document.getElementById('relatedManga');
    if (!container) return;

    const related = getRecommendations(currentManga, 4);
    container.innerHTML = related.map(manga => `
        <div class="related-item" onclick="window.location.href='./manga-detail.html?id=${manga.id}'"
             style="cursor: pointer; padding: 0.5rem; display: flex; gap: 1rem; align-items: center;">
            <div style="width: 50px; height: 70px; background: ${manga.gradient}; border-radius: 4px;"></div>
            <div>
                <div style="font-weight: 600;">${Utils.escapeHtml(manga.title)}</div>
                <div style="color: var(--text-muted); font-size: 0.85rem;">⭐ ${manga.rating}</div>
            </div>
        </div>
    `).join('');
}

// ===================================
// КНОПКИ И ДЕЙСТВИЯ
// ===================================

function initButtons() {
    // Закладки
    const bookmarkBtn = document.getElementById('addToBookmarks');
    if (bookmarkBtn) {
        updateBookmarkButton();
        bookmarkBtn.addEventListener('click', async () => {
            await toggleBookmark(currentManga.id);
            updateBookmarkButton();
        });
    }

    // Рейтинг звёздами
    initStarRating();

    // Отправка отзыва
    const submitBtn = document.getElementById('submitReview');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitReviewHandler);
    }
}

async function updateBookmarkButton() {
    const btn = document.getElementById('addToBookmarks');
    if (!btn) return;

    const bookmarked = await isBookmarked(currentManga.id);
    btn.innerHTML = `<span class="btn-icon">${bookmarked ? '❤️' : '🤍'}</span> ${bookmarked ? 'В закладках' : 'Добавить в закладки'}`;
}

function initStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStars();
        });

        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.textContent = i <= index ? '★' : '☆';
            });
        });
    });

    document.querySelector('.star-rating')?.addEventListener('mouseleave', updateStars);
}

function updateStars() {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        star.textContent = index < selectedRating ? '★' : '☆';
        star.classList.toggle('active', index < selectedRating);
    });
}

async function submitReviewHandler() {
    const text = document.getElementById('reviewText')?.value.trim();

    if (selectedRating === 0) {
        alert('Пожалуйста, поставьте оценку');
        return;
    }

    if (!text) {
        alert('Пожалуйста, напишите отзыв');
        return;
    }

    await addReview(currentManga.id, selectedRating, text);

    // Сброс формы
    selectedRating = 0;
    updateStars();
    document.getElementById('reviewText').value = '';

    // Перерендер отзывов
    renderReviews();
}