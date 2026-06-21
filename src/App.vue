<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import TabBar from "./components/TabBar.vue";
import EditProfileModal from "./components/EditProfileModal.vue";
import SuccessModal from "./components/SuccessModal.vue";
import TermsModal from "./components/TermsModal.vue";

const route = useRoute();

// Состояние модалок
const showSuccessModal = ref(false);
const showTermsModal = ref(false);
const showEditProfileModal = ref(false);

// Данные пользователя
const userData = ref({
    name: "",
    username: "",
    reviewsLink: "",
});

// Показывать таб-бар только на основных страницах
const showTabBar = computed(() => {
    return ["/", "/profile", "/sell"].includes(route.path);
});

// Обработка создания объявления
const handleCreateListing = (formData) => {
    console.log("📦 Новое объявление:", formData);
    showSuccessModal.value = true;
};

// Открытие условий использования
const handleOpenTerms = () => {
    showTermsModal.value = true;
};

// Открытие редактирования профиля
const handleOpenEditProfile = (user) => {
    userData.value = user;
    showEditProfileModal.value = true;
};

// Сохранение данных профиля
const handleSaveProfile = (newUser) => {
    userData.value = newUser;
    localStorage.setItem("userData", JSON.stringify(newUser));
};
</script>

<template>
    <div class="app-container">
        <!-- Основной контент через router-view -->
        <main class="content">
            <router-view
                @openTerms="handleOpenTerms"
                @openEditProfile="handleOpenEditProfile"
                @submit="handleCreateListing"
            />
        </main>

        <!-- Floating Tab Bar (показывается только на основных страницах) -->
        <TabBar v-if="showTabBar" />

        <!-- Модальные окна -->
        <EditProfileModal
            v-model="showEditProfileModal"
            :userData="userData"
            @save="handleSaveProfile"
        />
        <SuccessModal v-model="showSuccessModal" />
        <TermsModal v-model="showTermsModal" />
    </div>
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.content {
    padding: 20px 16px 120px;
    max-width: 480px;
    margin: 0 auto;
}
</style>
