<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
    emit("update:modelValue", false);
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <div class="modal-icon-wrapper">
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

                    <h3 class="modal-title">Объявление создано!</h3>
                    <p class="modal-text">
                        Ваш товар скоро появится на площадке
                    </p>

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
                        <span>Отлично!</span>
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
    border-radius: 28px;
    padding: 40px 28px 32px;
    max-width: 320px;
    width: 100%;
    text-align: center;
    box-shadow:
        0 20px 60px rgba(139, 92, 246, 0.3),
        0 0 0 1px rgba(192, 132, 252, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modal-icon-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
        0 12px 32px rgba(139, 92, 246, 0.5),
        0 0 0 8px rgba(139, 92, 246, 0.1);
    animation: successPulse 0.6s ease;
}

@keyframes successPulse {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.modal-icon {
    width: 40px;
    height: 40px;
    color: white;
}

.modal-title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 8px;
    color: #f1f5f9;
}

.modal-text {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 28px;
    line-height: 1.5;
}

.modal-btn {
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
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
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.modal-btn:active {
    transform: scale(0.98);
}

.btn-icon {
    width: 20px;
    height: 20px;
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
    transform: scale(0.9) translateY(20px);
}
</style>
