<script setup>
import { locale, t } from "../locales/index.js";

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

// Юридический текст на двух языках
const termsContent = {
    ru: {
        sections: [
            {
                title: "1. Общие положения",
                content:
                    'Настоящее Пользовательское соглашение (далее — "Соглашение") регулирует отношения между платформой CryptoMarket (далее — "Платформа") и пользователем (далее — "Пользователь") по поводу использования сервиса.',
            },
            {
                title: "2. Предмет соглашения",
                content:
                    "Платформа предоставляет пользователю возможность размещать объявления о продаже цифровых активов, Telegram Stars и иных товаров. Платформа выступает исключительно как информационный посредник и не является стороной сделок между пользователями.",
            },
            {
                title: "3. Ответственность сторон",
                content: "3.1. Платформа не несет ответственности за:",
            },
            {
                title: "4. Запрещенные действия",
                content: "Пользователю запрещается:",
            },
            {
                title: "5. Интеллектуальная собственность",
                content:
                    "Все права на контент, дизайн, программное обеспечение и иные элементы Платформы принадлежат правообладателям и защищены законодательством об интеллектуальной собственности.",
            },
            {
                title: "6. Изменение условий",
                content:
                    "Платформа оставляет за собой право в любое время изменять условия настоящего Соглашения. Изменения вступают в силу с момента их публикации. Продолжение использования Платформы после внесения изменений означает согласие Пользователя с новыми условиями.",
            },
            {
                title: "7. Применимое право",
                content:
                    "Настоящее Соглашение регулируется действующим законодательством. Все споры подлежат разрешению в соответствии с законодательством юрисдикции местонахождения Платформы.",
            },
        ],
    },

    en: {
        sections: [
            {
                title: "1. General Provisions",
                content:
                    'This User Agreement (hereinafter — the "Agreement") governs the relationship between the CryptoMarket platform (hereinafter — the "Platform") and the user (hereinafter — the "User") regarding the use of the service.',
            },
            {
                title: "2. Subject of the Agreement",
                content:
                    "The Platform provides the User with the ability to post listings for the sale of digital assets, Telegram Stars, and other goods. The Platform acts exclusively as an information intermediary and is not a party to transactions between users.",
            },
            {
                title: "3. Liability of the Parties",
                content: "3.1. The Platform is not responsible for:",
            },
            {
                title: "4. Prohibited Actions",
                content: "The User is prohibited from:",
            },
            {
                title: "5. Intellectual Property",
                content:
                    "All rights to the content, design, software, and other elements of the Platform belong to the rights holders and are protected by intellectual property laws.",
            },
            {
                title: "6. Changes to Terms",
                content:
                    "The Platform reserves the right to change the terms of this Agreement at any time. Changes take effect from the moment of their publication. Continued use of the Platform after changes are made constitutes the User's acceptance of the new terms.",
            },
            {
                title: "7. Applicable Law",
                content:
                    "This Agreement is governed by applicable law. All disputes shall be resolved in accordance with the laws of the jurisdiction where the Platform is located.",
            },
        ],
    },
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <div class="modal-header">
                        <h2 class="modal-title">
                            {{ t("modals.terms.title") }}
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
                        <div
                            v-for="(section, index) in termsContent[
                                locale.current
                            ].sections"
                            :key="index"
                            class="terms-section"
                        >
                            <h3 class="section-title">{{ section.title }}</h3>
                            <p class="section-content">{{ section.content }}</p>

                            <!-- Список для раздела 3.1 -->
                            <ul
                                v-if="
                                    section.title.includes('3.1') ||
                                    section.title.includes('3.1')
                                "
                                class="terms-list"
                            >
                                <li>
                                    Действия третьих лиц, включая продавцов и
                                    покупателей;
                                </li>
                                <li>
                                    Убытки, возникшие в результате скама,
                                    мошенничества или недобросовестных действий
                                    других пользователей;
                                </li>
                                <li>
                                    Потерю средств, произошедшую не по вине
                                    Платформы;
                                </li>
                                <li>
                                    Технические сбои, вызванные действиями
                                    третьих лиц или форс-мажорными
                                    обстоятельствами;
                                </li>
                                <li>
                                    Содержание и достоверность информации,
                                    размещенной пользователями.
                                </li>
                            </ul>

                            <!-- Список для раздела 3.2 -->
                            <p
                                v-if="
                                    section.title.includes('3.2') ||
                                    section.title.includes('3.2')
                                "
                                class="section-content"
                            >
                                3.2. Платформа несет ответственность только за
                                надлежащее функционирование технического
                                обеспечения сервиса.
                            </p>

                            <!-- Список для раздела 4 -->
                            <ul
                                v-if="
                                    section.title.includes('4') ||
                                    section.title.includes('Prohibited')
                                "
                                class="terms-list"
                            >
                                <li>
                                    Размещать объявления о продаже незаконных
                                    товаров и услуг;
                                </li>
                                <li>
                                    Использовать Платформу для отмывания денег
                                    или финансирования незаконной деятельности;
                                </li>
                                <li>
                                    Распространять ложную, вводящую в
                                    заблуждение информацию;
                                </li>
                                <li>
                                    Нарушать права интеллектуальной
                                    собственности третьих лиц;
                                </li>
                                <li>
                                    Использовать автоматизированные средства для
                                    взаимодействия с Платформой без разрешения;
                                </li>
                                <li>
                                    Совершать действия, направленные на
                                    дестабилизацию работы сервиса.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button class="modal-btn" @click="closeModal">
                        {{ t("modals.terms.close") }}
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
    border-radius: 24px;
    max-width: 500px;
    width: 100%;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow:
        0 20px 60px rgba(139, 92, 246, 0.3),
        0 0 0 1px rgba(192, 132, 252, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modal-header {
    padding: 24px 24px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(139, 92, 246, 0.15);
    flex-shrink: 0;
}

.modal-title {
    font-size: 22px;
    font-weight: 800;
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
    overflow-y: auto;
    flex: 1;
}

.modal-body::-webkit-scrollbar {
    width: 6px;
}

.modal-body::-webkit-scrollbar-track {
    background: rgba(139, 92, 246, 0.05);
    border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
}

.terms-section {
    margin-bottom: 24px;
}

.terms-section:last-child {
    margin-bottom: 0;
}

.section-title {
    font-size: 16px;
    font-weight: 700;
    color: #c084fc;
    margin-bottom: 10px;
}

.section-content {
    font-size: 14px;
    line-height: 1.6;
    color: #cbd5e1;
    margin-bottom: 12px;
}

.terms-list {
    list-style: none;
    padding-left: 0;
    margin: 12px 0;
}

.terms-list li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.6;
    color: #cbd5e1;
}

.terms-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c084fc;
    font-size: 18px;
    line-height: 1.4;
}

.modal-btn {
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    color: white;
    border: none;
    border-radius: 14px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 16px 24px 24px;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
    flex-shrink: 0;
}

.modal-btn:active {
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
