<script setup>
import { useRoute, useRouter } from "vue-router";
import { t } from "../locales/index.js";

const route = useRoute();
const router = useRouter();
const tabs = [
    { id: "home", path: "/", labelKey: "nav.home" },
    { id: "profile", path: "/profile", labelKey: "nav.profile" },
    { id: "sell", path: "/sell", labelKey: "nav.sell" },
];
const isActive = (path) => route.path === path;
const switchTab = (path) => {
    if (route.path !== path) router.push(path);
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
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
                    <svg
                        v-if="tab.id === 'home'"
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
                    <svg
                        v-if="tab.id === 'profile'"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <svg
                        v-if="tab.id === 'sell'"
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
    background: var(--tab-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 28px;
    border: 1px solid var(--accent-border);
    box-shadow: 0 8px 32px var(--shadow);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 8px;
    position: relative;
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
        var(--accent-2),
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
    color: var(--text-muted);
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 16px;
    position: relative;
}
.tab-item.active {
    color: var(--accent-2);
}
.tab-item.active::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--accent-soft);
    border-radius: 16px;
}
.tab-item.active::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-1), var(--accent-3));
    border-radius: 2px;
    box-shadow: 0 0 12px var(--accent-glow);
}
.tab-icon-container {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}
.tab-item.active .tab-icon-container {
    transform: scale(1.15) translateY(-2px);
}
.tab-icon-container svg {
    width: 24px;
    height: 24px;
}
.tab-item.active .tab-icon-container svg {
    filter: drop-shadow(0 0 8px var(--accent-glow));
}
.tab-label {
    font-size: 11px;
    font-weight: 600;
    position: relative;
    z-index: 1;
}
.tab-item.active .tab-label {
    color: var(--accent-3);
}
</style>
