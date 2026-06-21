<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { t } from "../locales/index.js";

const route = useRoute();
const router = useRouter();

const tabs = [
    { id: "home", path: "/", labelKey: "nav.home" },
    { id: "profile", path: "/profile", labelKey: "nav.profile" },
    { id: "sell", path: "/sell", labelKey: "nav.sell" },
];

// Активная вкладка определяется по текущему пути
const isActive = (path) => route.path === path;

const switchTab = (path) => {
    if (route.path !== path) {
        router.push(path);
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
};
</script>

<template>
    <nav class="tab-bar-wrapper">
        <div class="tab-bar">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                class="tab-item"
                :class="{ active: isActive(tab.path) }"
                @click="switchTab(tab.path)"
            >
                <div class="tab-icon-container">
                    <!-- Иконка Главная -->
                    <svg
                        v-if="tab.id === 'home'"
                        class="tab-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>

                    <!-- Иконка Профиль -->
                    <svg
                        v-if="tab.id === 'profile'"
                        class="tab-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        />
                    </svg>

                    <!-- Иконка Продать -->
                    <svg
                        v-if="tab.id === 'sell'"
                        class="tab-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path
                            d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                        />
                    </svg>
                </div>
                <span class="tab-label">{{ t(tab.labelKey) }}</span>
            </button>
        </div>
    </nav>
</template>

<style scoped>
.tab-bar-wrapper {
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar {
    background: rgba(30, 27, 75, 0.6);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 28px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow:
        0 8px 32px rgba(139, 92, 246, 0.15),
        0 2px 8px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 8px;
    position: relative;
    overflow: hidden;
}

.tab-bar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(139, 92, 246, 0.5),
        rgba(192, 132, 252, 0.5),
        rgba(139, 92, 246, 0.5),
        transparent
    );
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: rgba(148, 163, 184, 0.8);
    cursor: pointer;
    padding: 8px 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    border-radius: 16px;
}

.tab-item.active {
    color: #c084fc;
}

.tab-item.active::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        135deg,
        rgba(139, 92, 246, 0.2),
        rgba(192, 132, 252, 0.15)
    );
    border-radius: 16px;
    animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.tab-item.active::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #c084fc);
    border-radius: 2px;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        transform: translateX(-50%) translateY(-8px);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

.tab-icon-container {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
}

.tab-item.active .tab-icon-container {
    transform: scale(1.15) translateY(-2px);
}

.tab-icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease;
}

.tab-item.active .tab-icon {
    filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.6));
}

.tab-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
}

.tab-item.active .tab-label {
    color: #e9d5ff;
}
</style>
