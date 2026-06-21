<script setup>
import { ref, watch } from "vue";
import { t } from "../locales/index.js";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    userData: {
        type: Object,
        default: () => ({ name: "", username: "", reviewsLink: "" }),
    },
});

const emit = defineEmits(["update:modelValue", "save"]);

const form = ref({
    name: "",
    username: "",
    reviewsLink: "",
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            form.value = { ...props.userData };
        }
    },
);

const closeModal = () => {
    emit("update:modelValue", false);
};

const saveProfile = () => {
    emit("save", { ...form.value });
    closeModal();

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <div class="modal-header">
                        <h2 class="modal-title">
                            {{ t("editProfile.title") }}
                        </h2>
                        <button class="close-btn" @click="closeModal">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div class="modal-body">
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
                                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                    />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                {{ t("editProfile.name") }}
                            </label>
                            <input
                                v-model="form.name"
                                type="text"
                                class="form-input"
                                placeholder="Введите имя"
                            />
                        </div>

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
                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                                    />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                                {{ t("editProfile.username") }}
                            </label>
                            <input
                                v-model="form.username"
                                type="text"
                                class="form-input"
                                placeholder="@username"
                            />
                        </div>

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
                                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                                    />
                                    <path
                                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                                    />
                                </svg>
                                {{ t("editProfile.reviewsLink") }}
                            </label>
                            <input
                                v-model="form.reviewsLink"
                                type="url"
                                class="form-input"
                                :placeholder="
                                    t('editProfile.reviewsPlaceholder')
                                "
                            />
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button class="cancel-btn" @click="closeModal">
                            {{ t("editProfile.cancel") }}
                        </button>
                        <button class="save-btn" @click="saveProfile">
                            {{ t("editProfile.save") }}
                        </button>
                    </div>
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
    background: rgba(15, 10, 31, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: rgba(30, 27, 75, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 24px;
    max-width: 400px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow:
        0 20px 60px rgba(139, 92, 246, 0.3),
        0 0 0 1px rgba(192, 132, 252, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modal-content::-webkit-scrollbar {
    width: 6px;
}

.modal-content::-webkit-scrollbar-track {
    background: rgba(139, 92, 246, 0.05);
    border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
}

.modal-header {
    padding: 24px 24px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(139, 92, 246, 0.15);
    position: sticky;
    top: 0;
    background: rgba(30, 27, 75, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1;
}

.modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #f1f5f9;
}

.close-btn {
    width: 32px;
    height: 32px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #c084fc;
}

.close-btn:active {
    transform: scale(0.95);
    background: rgba(139, 92, 246, 0.2);
}

.close-btn svg {
    width: 18px;
    height: 18px;
}

.modal-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    color: #94a3b8;
}

.label-icon {
    width: 16px;
    height: 16px;
}

.form-input {
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 15px;
    color: #f1f5f9;
    transition: all 0.3s ease;
    font-family: inherit;
    width: 100%;
}

.form-input::placeholder {
    color: #64748b;
}

.form-input:focus {
    outline: none;
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

.modal-actions {
    padding: 16px 24px 24px;
    display: flex;
    gap: 12px;
    position: sticky;
    bottom: 0;
    background: rgba(30, 27, 75, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(139, 92, 246, 0.15);
}

.cancel-btn {
    flex: 1;
    background: rgba(30, 27, 75, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 12px;
    padding: 14px;
    font-size: 15px;
    font-weight: 600;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cancel-btn:active {
    transform: scale(0.98);
    background: rgba(139, 92, 246, 0.1);
}

.save-btn {
    flex: 1;
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 15px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.save-btn:active {
    transform: scale(0.98);
}

/* Анимации */
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
    transform: scale(0.95) translateY(20px);
}
</style>
