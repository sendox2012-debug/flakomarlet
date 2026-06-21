<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { t } from "../locales/index.js";

const router = useRouter();

const form = reactive({
    currency: "USDT",
    amount: "",
});

const quickAmounts = [10, 50, 100, 500];

const setQuickAmount = (amount) => {
    form.amount = amount.toString();

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
};

const handleSubmit = () => {
    if (!form.amount || parseFloat(form.amount) <= 0) {
        return;
    }

    const url = `https://t.me/flacomarketbot?start=pay_${form.amount}`;

    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openTelegramLink(url);
    } else {
        window.open(url, "_blank");
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
};

const goBack = () => {
    router.push("/profile");

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
};
</script>

<template>
    <div class="pay-page">
        <!-- Заголовок с кнопкой назад -->
        <div class="header">
            <button class="back-btn" @click="goBack">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <div class="header-content">
                <h1 class="header-title">
                    {{ t("pay.title") }}
                    <span class="gradient-text">{{
                        t("pay.titleGradient")
                    }}</span>
                </h1>
                <p class="header-subtitle">{{ t("pay.subtitle") }}</p>
            </div>
        </div>

        <!-- Форма -->
        <form class="pay-form" @submit.prevent="handleSubmit">
            <!-- Выбор валюты -->
            <div class="form-group">
                <label class="form-label">
                    <svg
                        class="label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {{ t("pay.currency") }}
                </label>
                <div class="currency-selector">
                    <button
                        type="button"
                        class="currency-option"
                        :class="{ active: form.currency === 'USDT' }"
                        @click="form.currency = 'USDT'"
                    >
                        <span class="currency-icon">💎</span>
                        <span>USDT</span>
                    </button>
                    <button
                        type="button"
                        class="currency-option"
                        :class="{ active: form.currency === 'Stars' }"
                        @click="form.currency = 'Stars'"
                    >
                        <span class="currency-icon">⭐</span>
                        <span>Telegram Stars</span>
                    </button>
                </div>
            </div>

            <!-- Сумма -->
            <div class="form-group">
                <label class="form-label">
                    <svg
                        class="label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path
                            d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                        />
                    </svg>
                    {{ t("pay.amount") }}
                </label>
                <input
                    v-model="form.amount"
                    type="number"
                    class="form-input"
                    :placeholder="t('pay.amountPlaceholder')"
                    step="0.01"
                    min="0"
                    required
                />
            </div>

            <!-- Быстрый выбор -->
            <div class="form-group">
                <label class="form-label">{{ t("pay.quickAmounts") }}</label>
                <div class="quick-amounts">
                    <button
                        v-for="amount in quickAmounts"
                        :key="amount"
                        type="button"
                        class="quick-amount-btn"
                        @click="setQuickAmount(amount)"
                    >
                        {{ amount }}
                    </button>
                </div>
            </div>

            <!-- Кнопка отправки -->
            <button type="submit" class="submit-btn">
                <svg
                    class="btn-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
                <span>{{ t("pay.submit") }}</span>
            </button>
        </form>
    </div>
</template>

<style scoped>
.pay-page {
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

.header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 28px;
}
.back-btn {
    width: 40px;
    height: 40px;
    background: var(--bg-card);
    backdrop-filter: var(--card-blur);
    border: 1px solid var(--accent-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--accent-2);
    flex-shrink: 0;
}
.back-btn svg {
    width: 20px;
    height: 20px;
}
.header-title {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
}
.gradient-text {
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.header-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
}

.pay-form,
.withdraw-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.form-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
}
.label-icon {
    width: 16px;
    height: 16px;
}

.currency-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.currency-option {
    background: var(--bg-card);
    backdrop-filter: var(--card-blur);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 15px;
    font-weight: 600;
}
.currency-option.active {
    background: var(--accent-soft);
    border-color: var(--accent-1);
    color: var(--accent-2);
    box-shadow: 0 0 0 4px var(--accent-soft);
}

.form-input {
    background: var(--bg-input);
    backdrop-filter: var(--card-blur);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 15px;
    color: var(--text-primary);
    font-family: inherit;
    width: 100%;
}
.form-input::placeholder {
    color: var(--text-muted);
}
.form-input:focus {
    outline: none;
    border-color: var(--accent-1);
    background: var(--accent-soft);
    box-shadow: 0 0 0 4px var(--accent-soft);
}

.quick-amounts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
.quick-amount-btn {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-2);
    cursor: pointer;
}
.quick-amount-btn:active {
    background: var(--accent-soft);
}

.submit-btn {
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    color: white;
    border: none;
    border-radius: 16px;
    padding: 18px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 8px 24px var(--accent-glow);
    margin-top: 8px;
}
.submit-btn:active {
    transform: scale(0.98);
}
.btn-icon {
    width: 20px;
    height: 20px;
}
</style>
