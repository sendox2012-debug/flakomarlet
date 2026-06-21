<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { locale, toggleLanguage, t } from "../locales/index.js";

const emit = defineEmits(["openTerms", "openEditProfile"]);
const router = useRouter();

// Данные пользователя
const user = ref({
    name: "",
    username: "",
    reviewsLink: "",
    photoUrl: "",
});

// Загрузка данных при монтировании
onMounted(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
        const tgUser = tg.initDataUnsafe.user;
        const fullName = [tgUser.first_name, tgUser.last_name]
            .filter(Boolean)
            .join(" ");
        const username = tgUser.username ? `@${tgUser.username}` : "";

        const savedUser = localStorage.getItem("userData");

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            user.value = {
                ...parsedUser,
                photoUrl: tgUser.photo_url || "",
            };
        } else {
            user.value = {
                name: fullName || "Пользователь",
                username: username || "Не указан",
                reviewsLink: "",
                photoUrl: tgUser.photo_url || "",
            };
        }
    } else {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
            user.value = JSON.parse(savedUser);
        } else {
            user.value = {
                name: "Александр Иванов",
                username: "@alexander",
                reviewsLink: "",
                photoUrl: "",
            };
        }
    }
});

// Пункты меню настроек
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

// Обработка клика по пункту меню
const handleSettingsClick = (item) => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    if (item.action === "language") {
        toggleLanguage();
    }

    if (item.action === "terms") {
        emit("openTerms");
    }

    if (item.action === "support") {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.openTelegramLink(
                "https://t.me/your_support",
            );
        }
    }
};

// Открытие редактирования профиля
const handleEditProfile = () => {
    emit("openEditProfile", user.value);

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    }
};

// Переход на страницу пополнения
const navigateToPay = () => {
    router.push("/pay");

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    }
};

// Переход на страницу вывода
const navigateToWithdraw = () => {
    router.push("/with");

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    }
};

// Открытие ссылки на отзывы
const openReviewsLink = () => {
    if (!user.value.reviewsLink) return;

    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openLink(user.value.reviewsLink);
    } else {
        window.open(user.value.reviewsLink, "_blank");
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
};
</script>

<template>
    <div class="profile-tab">
        <!-- Карточка пользователя -->
        <div class="user-card">
            <div class="avatar-wrapper">
                <img
                    v-if="user.photoUrl"
                    :src="user.photoUrl"
                    class="avatar-img"
                    alt="Avatar"
                />
                <div v-else class="avatar">
                    <svg
                        class="avatar-icon"
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

            <button class="edit-btn" @click="handleEditProfile">
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

        <!-- Ссылка на отзывы -->
        <div
            class="reviews-card"
            v-if="user.reviewsLink"
            @click="openReviewsLink"
        >
            <div class="reviews-icon-wrapper">
                <svg
                    class="reviews-icon"
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

            <button class="reviews-arrow">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>

        <!-- Кнопки пополнения и вывода -->
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

        <!-- Меню настроек -->
        <div class="settings-section">
            <h3 class="section-title">{{ t("profile.title") }}</h3>

            <div class="settings-list">
                <button
                    v-for="item in getSettingsItems()"
                    :key="item.id"
                    class="settings-item"
                    @click="handleSettingsClick(item)"
                >
                    <div class="settings-icon-wrapper">
                        <svg
                            v-if="item.icon === 'language'"
                            class="settings-icon"
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
                            class="settings-icon"
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
                            class="settings-icon"
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
                            class="settings-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>

                    <div class="settings-content">
                        <div class="settings-title">{{ item.title }}</div>
                        <div class="settings-value">{{ item.value }}</div>
                    </div>

                    <div class="settings-arrow">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
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

.user-card {
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 24px;
    padding: 24px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
    position: relative;
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

.avatar-img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.avatar-icon {
    width: 32px;
    height: 32px;
    color: white;
}

.user-info {
    flex: 1;
    min-width: 0;
}

.user-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
    color: #f1f5f9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.user-username {
    font-size: 14px;
    color: #c084fc;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.edit-btn {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #c084fc;
    flex-shrink: 0;
}

.edit-btn:active {
    transform: scale(0.95);
    background: rgba(139, 92, 246, 0.25);
}

.edit-btn svg {
    width: 20px;
    height: 20px;
}

.reviews-card {
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.reviews-card:active {
    transform: scale(0.98);
    background: rgba(139, 92, 246, 0.15);
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
    flex-shrink: 0;
}

.reviews-icon {
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
    margin-bottom: 4px;
    color: #f1f5f9;
}

.reviews-link {
    font-size: 13px;
    color: #c084fc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reviews-arrow {
    width: 20px;
    height: 20px;
    color: #64748b;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.reviews-arrow svg {
    width: 100%;
    height: 100%;
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
    transition: all 0.3s ease;
}

.balance-btn:active {
    transform: scale(0.98);
}

.balance-btn.primary {
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    color: white;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.balance-btn.secondary {
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    color: #c084fc;
}

.balance-btn svg {
    width: 20px;
    height: 20px;
}

.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #f1f5f9;
}

.settings-section {
    margin-bottom: 24px;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.settings-item {
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    width: 100%;
}

.settings-item:active {
    transform: scale(0.98);
    background: rgba(139, 92, 246, 0.15);
}

.settings-icon-wrapper {
    width: 40px;
    height: 40px;
    background: linear-gradient(
        135deg,
        rgba(139, 92, 246, 0.2),
        rgba(192, 132, 252, 0.2)
    );
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.settings-icon {
    width: 20px;
    height: 20px;
    color: #c084fc;
}

.settings-content {
    flex: 1;
    min-width: 0;
}

.settings-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 2px;
    color: #f1f5f9;
}

.settings-value {
    font-size: 13px;
    color: #94a3b8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.settings-arrow {
    width: 20px;
    height: 20px;
    color: #64748b;
    flex-shrink: 0;
}

.settings-arrow svg {
    width: 100%;
    height: 100%;
}
</style>
