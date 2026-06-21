<script setup>
import { reactive } from "vue";
import { t } from "../locales/index.js";

const emit = defineEmits(["submit"]);

const form = reactive({
    title: "",
    description: "",
    price: "",
    currency: "USDT",
});

const handleSubmit = () => {
    if (!form.title || !form.description || !form.price) return;

    const formData = { ...form };
    emit("submit", formData);

    // Очистка формы
    form.title = "";
    form.description = "";
    form.price = "";
    form.currency = "USDT";

    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
};
</script>

<template>
    <div class="sell-tab">
        <!-- Заголовок -->
        <div class="header">
            <h1 class="header-title">
                {{ t("sell.title") }}
                <span class="gradient-text">{{ t("sell.titleGradient") }}</span>
            </h1>
            <p class="header-subtitle">{{ t("sell.subtitle") }}</p>
        </div>

        <!-- Форма -->
        <form class="sell-form" @submit.prevent="handleSubmit">
            <!-- Название товара -->
            <div class="form-group">
                <label class="form-label">
                    <svg
                        class="label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                        />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    {{ t("sell.form.name.label") }}
                </label>
                <input
                    v-model="form.title"
                    type="text"
                    class="form-input"
                    :placeholder="t('sell.form.name.placeholder')"
                    required
                />
            </div>

            <!-- Описание -->
            <div class="form-group">
                <label class="form-label">
                    <svg
                        class="label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <line x1="17" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="17" y1="18" x2="3" y2="18" />
                    </svg>
                    {{ t("sell.form.description.label") }}
                </label>
                <textarea
                    v-model="form.description"
                    class="form-textarea"
                    :placeholder="t('sell.form.description.placeholder')"
                    rows="4"
                    required
                ></textarea>
            </div>

            <!-- Цена и валюта -->
            <div class="form-row">
                <div class="form-group flex-1">
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
                        {{ t("sell.form.price.label") }}
                    </label>
                    <input
                        v-model="form.price"
                        type="number"
                        class="form-input"
                        :placeholder="t('sell.form.price.placeholder')"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div class="form-group flex-1">
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
                        {{ t("sell.form.currency.label") }}
                    </label>
                    <div class="select-wrapper">
                        <select v-model="form.currency" class="form-select">
                            <option value="USDT">USDT</option>
                            <option value="Stars">Telegram Stars</option>
                        </select>
                        <svg
                            class="select-arrow"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>{{ t("sell.submit") }}</span>
            </button>
        </form>
    </div>
</template>

<style scoped>
.sell-tab {
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

/* Заголовок */
.header {
    margin-bottom: 28px;
}

.header-title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 6px;
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

.header-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
}

/* Форма */
.sell-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-row {
    display: flex;
    gap: 12px;
}

.flex-1 {
    flex: 1;
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

.form-input,
.form-textarea,
.form-select {
    background: var(--bg-input);
    backdrop-filter: var(--card-blur);
    -webkit-backdrop-filter: var(--card-blur);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 15px;
    color: var(--text-primary);
    transition: all 0.3s ease;
    font-family: inherit;
    width: 100%;
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: var(--text-muted);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;
    border-color: var(--accent-1);
    background: var(--accent-soft);
    box-shadow: 0 0 0 4px var(--accent-soft);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.select-wrapper {
    position: relative;
}

.form-select {
    appearance: none;
    cursor: pointer;
    padding-right: 44px;
}

.select-arrow {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--text-muted);
    pointer-events: none;
}

/* Кнопка отправки */
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
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px var(--accent-glow);
    margin-top: 8px;
    position: relative;
    overflow: hidden;
}

.submit-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.6s ease;
}

.submit-btn:hover::before {
    left: 100%;
}

.submit-btn:active {
    transform: scale(0.98);
}

.btn-icon {
    width: 20px;
    height: 20px;
}
</style>
