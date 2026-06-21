<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "./composables/useTheme.js";
import TabBar from "./components/TabBar.vue";
import EditProfileModal from "./components/EditProfileModal.vue";
import SuccessModal from "./components/SuccessModal.vue";
import TermsModal from "./components/TermsModal.vue";

// Инициализация темы
const { currentTheme } = useTheme();

const route = useRoute();

const showSuccessModal = ref(false);
const showTermsModal = ref(false);
const showEditProfileModal = ref(false);

const userData = ref({
    name: "",
    username: "",
    reviewsLink: "",
});

const showTabBar = computed(() => {
    return ["/", "/profile", "/sell"].includes(route.path);
});

const handleCreateListing = (formData) => {
    console.log("📦 Новое объявление:", formData);
    showSuccessModal.value = true;
};

const handleOpenTerms = () => {
    showTermsModal.value = true;
};
const handleOpenEditProfile = (user) => {
    userData.value = user;
    showEditProfileModal.value = true;
};
const handleSaveProfile = (newUser) => {
    userData.value = newUser;
    localStorage.setItem("userData", JSON.stringify(newUser));
};
</script>

<template>
    <div class="app-container">
        <main class="content">
            <router-view
                @openTerms="handleOpenTerms"
                @openEditProfile="handleOpenEditProfile"
                @submit="handleCreateListing"
            />
        </main>

        <TabBar v-if="showTabBar" />

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
    background: var(--bg-primary);
}

.content {
    padding: 20px 16px 120px;
    max-width: 480px;
    margin: 0 auto;
}
</style>
