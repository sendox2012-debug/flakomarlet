<script setup>
import { t } from '../locales/index.js'

// Ссылки на ресурсы проекта
const links = [
  {
    id: 1,
    titleKey: 'home.links.channel.title',
    descriptionKey: 'home.links.channel.description',
    url: 'https://t.me/your_channel',
    icon: 'channel',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 2,
    titleKey: 'home.links.chat.title',
    descriptionKey: 'home.links.chat.description',
    url: 'https://t.me/flakomarkets',
    icon: 'chat',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    titleKey: 'home.links.support.title',
    descriptionKey: 'home.links.support.description',
    url: 'https://t.me/tg+sendo',
    icon: 'support',
    gradient: 'from-fuchsia-500 to-violet-600'
  }
]

// Обработка клика по ссылке
const handleLinkClick = (link) => {
  console.log('Открытие ссылки:', link.url)
  
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.openTelegramLink(link.url)
  } else {
    window.open(link.url, '_blank')
  }
  
  if (window.Telegram?.WebApp?.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
  }
}
</script>

<template>
  <div class="home-tab">
    <!-- Приветственный блок -->
    <div class="welcome-section">
      <div class="welcome-badge">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      
      <h1 class="welcome-title">
        {{ t('home.welcome') }}
        <span class="gradient-text">{{ t('home.projectName') }}</span>
      </h1>
      
      <p class="welcome-description">
        {{ t('home.description') }}
      </p>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-value">10K+</div>
        <div class="stat-label">{{ t('home.stats.users') }}</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="stat-value">50K+</div>
        <div class="stat-label">{{ t('home.stats.deals') }}</div>
      </div>
    </div>

    <!-- Ссылки на ресурсы -->
    <div class="links-section">
      <h2 class="section-title">{{ t('home.resources') }}</h2>
      
      <div class="links-list">
        <button 
          v-for="link in links" 
          :key="link.id"
          class="link-card"
          @click="handleLinkClick(link)"
        >
          <div class="link-icon-wrapper" :class="link.gradient">
            <svg v-if="link.icon === 'channel'" class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            
            <svg v-if="link.icon === 'chat'" class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            
            <svg v-if="link.icon === 'support'" class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          
          <div class="link-content">
            <div class="link-title">{{ t(link.titleKey) }}</div>
            <div class="link-description">{{ t(link.descriptionKey) }}</div>
          </div>
          
          <div class="link-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Преимущества -->
    <div class="features-section">
      <h2 class="section-title">{{ t('home.features.title') }}</h2>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div class="feature-title">{{ t('home.features.security.title') }}</div>
          <div class="feature-text">{{ t('home.features.security.text') }}</div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="feature-title">{{ t('home.features.speed.title') }}</div>
          <div class="feature-text">{{ t('home.features.speed.text') }}</div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="feature-title">{{ t('home.features.support.title') }}</div>
          <div class="feature-text">{{ t('home.features.support.text') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили остаются такими же, как в предыдущей версии */
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

.welcome-section {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px 16px;
}

.welcome-badge {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #8b5cf6, #c084fc);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 24px rgba(139, 92, 246, 0.4),
    0 0 0 1px rgba(192, 132, 252, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 8px 24px rgba(139, 92, 246, 0.4),
      0 0 0 1px rgba(192, 132, 252, 0.2);
  }
  50% {
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.6),
      0 0 0 1px rgba(192, 132, 252, 0.3),
      0 0 0 8px rgba(139, 92, 246, 0.1);
  }
}

.badge-icon {
  width: 32px;
  height: 32px;
  color: white;
}

.welcome-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  color: #f1f5f9;
}

.gradient-text {
  background: linear-gradient(135deg, #a78bfa, #c084fc, #e879f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-description {
  font-size: 15px;
  line-height: 1.6;
  color: #94a3b8;
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
  background: rgba(30, 27, 75, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:active {
  transform: scale(0.98);
}

.stat-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(192, 132, 252, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 20px;
  height: 20px;
  color: #c084fc;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #a78bfa, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 13px;
  color: #94a3b8;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #f1f5f9;
}

.links-section {
  margin-bottom: 32px;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-card {
  background: rgba(30, 27, 75, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.link-card:active {
  transform: scale(0.98);
  background: rgba(139, 92, 246, 0.15);
}

.link-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.link-icon-wrapper.from-violet-500 {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.link-icon-wrapper.from-purple-500 {
  background: linear-gradient(135deg, #a855f7, #ec4899);
}

.link-icon-wrapper.from-fuchsia-500 {
  background: linear-gradient(135deg, #d946ef, #8b5cf6);
}

.link-icon {
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
  margin-bottom: 4px;
  color: #f1f5f9;
}

.link-description {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.4;
}

.link-arrow {
  width: 20px;
  height: 20px;
  color: #64748b;
  flex-shrink: 0;
}

.link-arrow svg {
  width: 100%;
  height: 100%;
}

.features-section {
  margin-bottom: 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.feature-card {
  background: rgba(30, 27, 75, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.feature-card:active {
  transform: scale(0.98);
}

.feature-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(192, 132, 252, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon svg {
  width: 22px;
  height: 22px;
  color: #c084fc;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #f1f5f9;
}

.feature-text {
  font-size: 13px;
  color: #94a3b8;
}
</style>