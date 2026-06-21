<script setup>
import { t } from "../locales/index.js";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
    emit("update:modelValue", false);

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <!-- Иконка успеха -->
                    <div class="modal-icon-wrapper">
                        <div class="success-ring"></div>
                        <svg
                            class="modal-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>

                    <h3 class="modal-title">{{ t("modals.success.title") }}</h3>
                    <p class="modal-text">{{ t("modals.success.text") }}</p>

                    <button class="modal-btn" @click="closeModal">
                        <svg
                            class="btn-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{{ t("modals.success.button") }}</span>
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--modal-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--accent-border);
    border-radius: 28px;
    padding: 40px 28px 32px;
    max-width: 320px;
    width: 100%;
    text-align: center;
    box-shadow:
        0 20px 60px var(--shadow),
        0 0 0 1px var(--accent-border),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Иконка успеха с анимацией */
.modal-icon-wrapper {
    position: relative;
    width: 90px;
    height: 90px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.success-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    box-shadow: 0 12px 32px var(--accent-glow);
    animation:
        successPulse 0.6s ease,
        ringPulse 2s ease-in-out infinite;
}

.success-ring::before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid var(--accent-2);
    opacity: 0.3;
    animation: ringExpand 2s ease-out infinite;
}

@keyframes successPulse {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes ringPulse {
    0%,
    100% {
        box-shadow: 0 12px 32px var(--accent-glow);
    }
    50% {
        box-shadow:
            0 12px 40px var(--accent-glow),
            0 0 0 8px var(--accent-soft);
    }
}

@keyframes ringExpand {
    0% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.4);
        opacity: 0;
    }
}

.modal-icon {
    position: relative;
    width: 44px;
    height: 44px;
    color: white;
    z-index: 1;
    animation: checkDraw 0.5s ease 0.3s both;
}

@keyframes checkDraw {
    0% {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        opacity: 0;
    }
    100% {
        stroke-dasharray: 100;
        stroke-dashoffset: 0;
        opacity: 1;
    }
}

.modal-title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 8px;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.modal-text {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 28px;
    line-height: 1.5;
}

.modal-btn {
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    color: white;
    border: none;
    border-radius: 14px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 8px 24px var(--accent-glow);
    position: relative;
    overflow: hidden;
}

.modal-btn::before {
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

.modal-btn:hover::before {
    left: 100%;
}

.modal-btn:active {
    transform: scale(0.98);
}

.btn-icon {
    width: 20px;
    height: 20px;
}

/* Анимации модалки */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    transform: scale(0.9) translateY(20px);
}

.modal-enter-from .modal-icon-wrapper,
.modal-leave-to .modal-icon-wrapper {
    transform: scale(0.5);
    opacity: 0;
}
</style>
