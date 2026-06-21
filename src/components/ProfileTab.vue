<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { locale, toggleLanguage, t } from "../locales/index.js";
import { useTheme, themes, currentTheme } from "../composables/useTheme.js";

const emit = defineEmits(["openTerms", "openEditProfile"]);
const router = useRouter();
const { setTheme } = useTheme();

const user = ref({
    name: "",
    username: "",
    reviewsLink: "",
    photoUrl: "",
});

onMounted(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user;
        const fullName = [u.first_name, u.last_name].filter(Boolean).join(" ");
        const username = u.username ? `@${u.username}` : "";
        const saved = localStorage.getItem("userData");
        if (saved) {
            user.value = { ...JSON.parse(saved), photoUrl: u.photo_url || "" };
        } else {
            user.value = {
                name: fullName || "Пользователь",
                username: username || "Не указан",
                reviewsLink: "",
                photoUrl: u.photo_url || "",
            };
        }
    } else {
        const saved = localStorage.getItem("userData");
        user.value = saved
            ? JSON.parse(saved)
            : {
                  name: "Александр Иванов",
                  username: "@alexander",
                  reviewsLink: "",
                  photoUrl: "",
              };
    }
});

const getSettingsItems = () => [
    {
        id: 1,
        title: t("profile.settings.language.title"),
        value: t("profile.settings.language.value"),
        icon: "language",
        action: "language",
    },
    {
        id: 2,
        title: t("profile.settings.security.title"),
        value: t("profile.settings.security.value"),
        icon: "security",
        action: "security",
    },
    {
        id: 3,
        title: t("profile.settings.support.title"),
        value: t("profile.settings.support.value"),
        icon: "support",
        action: "support",
    },
    {
        id: 4,
        title: t("profile.settings.terms.title"),
        value: t("profile.settings.terms.value"),
        icon: "terms",
        action: "terms",
    },
];

const handleSettingsClick = (item) => {
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    if (item.action === "language") toggleLanguage();
    if (item.action === "terms") emit("openTerms");
    if (item.action === "support" && window.Telegram?.WebApp)
        window.Telegram.WebApp.openTelegramLink("https://t.me/your_support");
};

const handleEditProfile = () => {
    emit("openEditProfile", user.value);
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
};

const navigateToPay = () => {
    router.push("/pay");
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
};

const navigateToWithdraw = () => {
    router.push("/with");
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
};

const openReviewsLink = () => {
    if (!user.value.reviewsLink) return;
    if (window.Telegram?.WebApp)
        window.Telegram.WebApp.openLink(user.value.reviewsLink);
    else window.open(user.value.reviewsLink, "_blank");
};

// Список тем для выбора
const themeList = Object.entries(themes).map(([key, val]) => ({
    key,
    name: locale.current === "en" ? val.nameEn : val.name,
    icon: val.icon,
}));
</script>

<template>
    <div class="profile-tab">
        <!-- Карточка пользователя -->
        <div class="card user-card">
            <div class="avatar-wrapper">
                <img
                    v-if="user.photoUrl"
                    :src="user.photoUrl"
                    class="avatar-img"
                    alt="Avatar"
                />
                <div v-else class="avatar">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
            <div class="user-info">
                <h2 class="user-name">{{ user.name }}</h2>
                <div class="user-username">{{ user.username }}</div>
            </div>
            <button class="icon-btn" @click="handleEditProfile">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                </svg>
            </button>
        </div>

        <!-- Отзывы -->
        <div
            class="card reviews-card"
            v-if="user.reviewsLink"
            @click="openReviewsLink"
        >
            <div class="reviews-icon-wrapper">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                </svg>
            </div>
            <div class="reviews-content">
                <div class="reviews-title">{{ t("profile.reviews") }}</div>
                <div class="reviews-link">{{ user.reviewsLink }}</div>
            </div>
            <svg
                class="arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </div>

        <!-- Кнопки -->
        <div class="balance-actions">
            <button class="balance-btn primary" @click="navigateToPay">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
                <span>{{ t("pay.title") }}</span>
            </button>
            <button class="balance-btn secondary" @click="navigateToWithdraw">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                </svg>
                <span>{{ t("withdraw.title") }}</span>
            </button>
        </div>

        <!-- Выбор темы -->
        <div class="section">
            <h3 class="section-title">{{ t("profile.themeTitle") }}</h3>
            <div class="theme-grid">
                <button
                    v-for="theme in themeList"
                    :key="theme.key"
                    class="theme-option"
                    :class="{ active: currentTheme === theme.key }"
                    @click="setTheme(theme.key)"
                >
                    <span class="theme-emoji">{{ theme.icon }}</span>
                    <span class="theme-name">{{ theme.name }}</span>
                    <div v-if="currentTheme === theme.key" class="theme-check">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>

        <!-- Настройки -->
        <div class="section">
            <h3 class="section-title">{{ t("profile.title") }}</h3>
            <div class="settings-list">
                <button
                    v-for="item in getSettingsItems()"
                    :key="item.id"
                    class="card settings-item"
                    @click="handleSettingsClick(item)"
                >
                    <div class="settings-icon-wrapper">
                        <svg
                            v-if="item.icon === 'language'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path
                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                            />
                        </svg>
                        <svg
                            v-if="item.icon === 'security'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            />
                        </svg>
                        <svg
                            v-if="item.icon === 'support'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                            />
                        </svg>
                        <svg
                            v-if="item.icon === 'terms'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div class="settings-content">
                        <div class="settings-title">{{ item.title }}</div>
                        <div class="settings-value">{{ item.value }}</div>
                    </div>
                    <svg
                        class="arrow-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-tab {
    animation: fadeIn 0.4s ease;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    background: var(--bg-card);
    backdrop-filter: var(--card-blur);
    -webkit-backdrop-filter: var(--card-blur);
    border: 1px solid var(--accent-border);
    border-radius: 20px;
    box-shadow: 0 8px 32px var(--shadow);
}

.user-card {
    padding: 24px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
}
.avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px var(--accent-glow);
}
.avatar svg {
    width: 32px;
    height: 32px;
    color: white;
}
.avatar-img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
}
.avatar-wrapper {
    flex-shrink: 0;
}
.user-info {
    flex: 1;
    min-width: 0;
}
.user-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user-username {
    font-size: 14px;
    color: var(--accent-2);
    font-weight: 500;
}
.icon-btn {
    width: 40px;
    height: 40px;
    background: var(--accent-soft);
    border: 1px solid var(--accent-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--accent-2);
    flex-shrink: 0;
}
.icon-btn:active {
    transform: scale(0.95);
}
.icon-btn svg {
    width: 20px;
    height: 20px;
}

.reviews-card {
    padding: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
}
.reviews-card:active {
    transform: scale(0.98);
}
.reviews-icon-wrapper {
    width: 44px;
    height: 44px;
    background: linear-gradient(
        135deg,
        rgba(251, 191, 36, 0.2),
        rgba(245, 158, 11, 0.2)
    );
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.reviews-icon-wrapper svg {
    width: 22px;
    height: 22px;
    color: #fbbf24;
}
.reviews-content {
    flex: 1;
    min-width: 0;
}
.reviews-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}
.reviews-link {
    font-size: 13px;
    color: var(--accent-2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.balance-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
}
.balance-btn {
    padding: 16px;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
.balance-btn:active {
    transform: scale(0.98);
}
.balance-btn svg {
    width: 20px;
    height: 20px;
}
.balance-btn.primary {
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    color: white;
    box-shadow: 0 8px 24px var(--accent-glow);
}
.balance-btn.secondary {
    background: var(--bg-card);
    backdrop-filter: var(--card-blur);
    border: 1px solid var(--accent-border);
    color: var(--accent-2);
}

.section {
    margin-bottom: 24px;
}
.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text-primary);
}

/* Сетка тем */
.theme-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}
.theme-option {
    background: var(--bg-card);
    backdrop-filter: var(--card-blur);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    position: relative;
}
.theme-option.active {
    border-color: var(--accent-1);
    background: var(--accent-soft);
    box-shadow: 0 0 16px var(--accent-glow);
}
.theme-option:active {
    transform: scale(0.96);
}
.theme-emoji {
    font-size: 24px;
}
.theme-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    text-align: center;
}
.theme-check {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    background: var(--accent-1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.theme-check svg {
    width: 12px;
    height: 12px;
    color: white;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.settings-item {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    width: 100%;
    border-radius: 16px;
}
.settings-item:active {
    transform: scale(0.98);
    background: var(--accent-soft);
}
.settings-icon-wrapper {
    width: 40px;
    height: 40px;
    background: var(--accent-soft);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.settings-icon-wrapper svg {
    width: 20px;
    height: 20px;
    color: var(--accent-2);
}
.settings-content {
    flex: 1;
    min-width: 0;
}
.settings-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
}
.settings-value {
    font-size: 13px;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.arrow-icon {
    width: 20px;
    height: 20px;
    color: var(--text-muted);
    flex-shrink: 0;
}
</style>
