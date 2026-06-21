<script setup>
import { t } from "../locales/index.js";
const links = [
    {
        id: 1,
        titleKey: "home.links.channel.title",
        descKey: "home.links.channel.description",
        url: "https://t.me/your_channel",
        icon: "channel",
    },
    {
        id: 2,
        titleKey: "home.links.chat.title",
        descKey: "home.links.chat.description",
        url: "https://t.me/your_chat",
        icon: "chat",
    },
    {
        id: 3,
        titleKey: "home.links.support.title",
        descKey: "home.links.support.description",
        url: "https://t.me/your_support",
        icon: "support",
    },
];
const handleClick = (link) => {
    if (window.Telegram?.WebApp)
        window.Telegram.WebApp.openTelegramLink(link.url);
    else window.open(link.url, "_blank");
    if (window.Telegram?.WebApp?.HapticFeedback)
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
};
</script>

<template>
    <div class="home-tab">
        <div class="welcome-section">
            <div class="welcome-badge">
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
            <h1 class="welcome-title">
                {{ t("home.welcome") }}
                <span class="gradient-text">{{ t("home.projectName") }}</span>
            </h1>
            <p class="welcome-desc">{{ t("home.description") }}</p>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                </div>
                <div class="stat-value">10K+</div>
                <div class="stat-label">{{ t("home.stats.users") }}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                </div>
                <div class="stat-value">50K+</div>
                <div class="stat-label">{{ t("home.stats.deals") }}</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">{{ t("home.resources") }}</h2>
            <div class="links-list">
                <button
                    v-for="link in links"
                    :key="link.id"
                    class="card link-card"
                    @click="handleClick(link)"
                >
                    <div class="link-icon-wrap">
                        <svg
                            v-if="link.icon === 'channel'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                            />
                        </svg>
                        <svg
                            v-if="link.icon === 'chat'"
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
                            v-if="link.icon === 'support'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <div class="link-content">
                        <div class="link-title">{{ t(link.titleKey) }}</div>
                        <div class="link-desc">{{ t(link.descKey) }}</div>
                    </div>
                    <svg
                        class="arrow"
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

        <div class="section">
            <h2 class="section-title">{{ t("home.features.title") }}</h2>
            <div class="features-grid">
                <div
                    class="card feature-card"
                    v-for="(f, i) in ['security', 'speed', 'support']"
                    :key="i"
                >
                    <div class="feature-icon">
                        <svg
                            v-if="f === 'security'"
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
                            v-if="f === 'speed'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <svg
                            v-if="f === 'support'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                            />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <div class="feature-title">
                            {{ t(`home.features.${f}.title`) }}
                        </div>
                        <div class="feature-text">
                            {{ t(`home.features.${f}.text`) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-tab {
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
    border: 1px solid var(--accent-border);
    border-radius: 20px;
    box-shadow: 0 8px 32px var(--shadow);
}
.welcome-section {
    text-align: center;
    margin-bottom: 32px;
    padding: 24px 16px;
}
.welcome-badge {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px var(--accent-glow);
}
.welcome-badge svg {
    width: 32px;
    height: 32px;
    color: white;
}
.welcome-title {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 16px;
    color: var(--text-primary);
}
.gradient-text {
    background: linear-gradient(
        135deg,
        var(--accent-1),
        var(--accent-2),
        var(--accent-3)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.welcome-desc {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-secondary);
    max-width: 320px;
    margin: 0 auto;
}
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 32px;
}
.stat-card {
    padding: 20px;
    text-align: center;
}
.stat-card:active {
    transform: scale(0.98);
}
.stat-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 12px;
    background: var(--accent-soft);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.stat-icon svg {
    width: 20px;
    height: 20px;
    color: var(--accent-2);
}
.stat-value {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.stat-label {
    font-size: 13px;
    color: var(--text-secondary);
}
.section {
    margin-bottom: 32px;
}
.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text-primary);
}
.links-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.link-card {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    width: 100%;
    text-align: left;
}
.link-card:active {
    transform: scale(0.98);
}
.link-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.link-icon-wrap svg {
    width: 24px;
    height: 24px;
    color: white;
}
.link-content {
    flex: 1;
    min-width: 0;
}
.link-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}
.link-desc {
    font-size: 13px;
    color: var(--text-secondary);
}
.arrow {
    width: 20px;
    height: 20px;
    color: var(--text-muted);
    flex-shrink: 0;
}
.features-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.feature-card {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
}
.feature-icon {
    width: 44px;
    height: 44px;
    background: var(--accent-soft);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.feature-icon svg {
    width: 22px;
    height: 22px;
    color: var(--accent-2);
}
.feature-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}
.feature-text {
    font-size: 13px;
    color: var(--text-secondary);
}
</style>
