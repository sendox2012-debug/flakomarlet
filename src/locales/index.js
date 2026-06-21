import { reactive } from "vue";

export const locale = reactive({
  current: "ru",
});

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      profile: "Профиль",
      sell: "Продать",
    },

    home: {
      welcome: "Добро пожаловать в",
      projectName: "FlakoMarket", // ← ИЗМЕНЕНО
      description:
        "Безопасная платформа для торговли цифровыми активами и Telegram Stars. Покупайте, продавайте и управляйте своими средствами с легкостью.",
      stats: {
        users: "Пользователей",
        deals: "Сделок",
      },
      resources: "Наши ресурсы",
      links: {
        channel: {
          title: "Telegram канал",
          description: "Новости и обновления проекта",
        },
        chat: {
          title: "Чат сообщества",
          description: "Общайтесь с другими пользователями",
        },
        support: {
          title: "Поддержка",
          description: "Помощь и ответы на вопросы",
        },
      },
      features: {
        title: "Почему мы?",
        security: {
          title: "Безопасность",
          text: "Защита средств на всех этапах",
        },
        speed: {
          title: "Быстрота",
          text: "Мгновенные транзакции",
        },
        support: {
          title: "Поддержка",
          text: "24/7 помощь пользователям",
        },
      },
    },

    profile: {
      title: "Профиль",
      edit: "Редактировать",
      reviews: "Мои отзывы",
      reviewsEmpty: "Ссылка не указана",
      settings: {
        language: {
          title: "Язык",
          value: "Русский",
        },
        security: {
          title: "Безопасность",
          value: "Двухфакторная аутентификация",
        },
        support: {
          title: "Поддержка",
          value: "Связаться с нами",
        },
        terms: {
          title: "Условия использования",
          value: "Правовая информация",
        },
      },
      logout: "Выйти из аккаунта",
    },

    editProfile: {
      title: "Редактировать профиль",
      name: "Имя",
      username: "Никнейм",
      reviewsLink: "Ссылка на отзывы",
      reviewsPlaceholder: "https://example.com/reviews",
      save: "Сохранить",
      cancel: "Отмена",
    },

    pay: {
      title: "Пополнение",
      titleGradient: "баланса",
      subtitle: "Выберите валюту и сумму пополнения",
      currency: "Валюта",
      amount: "Сумма",
      amountPlaceholder: "Введите сумму",
      submit: "Пополнить баланс",
      quickAmounts: "Быстрый выбор",
    },

    withdraw: {
      title: "Вывод",
      titleGradient: "средств",
      subtitle: "Выберите валюту и сумму вывода",
      currency: "Валюта",
      amount: "Сумма",
      amountPlaceholder: "Введите сумму",
      submit: "Вывести средства",
      quickAmounts: "Быстрый выбор",
    },

    sell: {
      title: "Создать",
      titleGradient: "объявление",
      subtitle: "Разместите товар на площадке",
      form: {
        name: {
          label: "Название товара",
          placeholder: "Введите название",
        },
        description: {
          label: "Описание",
          placeholder: "Подробное описание товара",
        },
        price: {
          label: "Цена",
          placeholder: "0.00",
        },
        currency: {
          label: "Валюта",
        },
      },
      submit: "Создать объявление",
    },

    modals: {
      success: {
        title: "Объявление создано!",
        text: "Ваш товар скоро появится на площадке",
        button: "Отлично!",
      },
      terms: {
        title: "Условия использования",
        close: "Закрыть",
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      sell: "Sell",
    },

    home: {
      welcome: "Welcome to",
      projectName: "FlakoMarket", // ← ИЗМЕНЕНО
      description:
        "Secure platform for trading digital assets and Telegram Stars. Buy, sell and manage your funds with ease.",
      stats: {
        users: "Users",
        deals: "Deals",
      },
      resources: "Our Resources",
      links: {
        channel: {
          title: "Telegram Channel",
          description: "News and project updates",
        },
        chat: {
          title: "Community Chat",
          description: "Connect with other users",
        },
        support: {
          title: "Support",
          description: "Help and answers to questions",
        },
      },
      features: {
        title: "Why us?",
        security: {
          title: "Security",
          text: "Protection of funds at all stages",
        },
        speed: {
          title: "Speed",
          text: "Instant transactions",
        },
        support: {
          title: "Support",
          text: "24/7 user assistance",
        },
      },
    },

    profile: {
      title: "Profile",
      edit: "Edit",
      reviews: "My Reviews",
      reviewsEmpty: "Link not set",
      settings: {
        language: {
          title: "Language",
          value: "English",
        },
        security: {
          title: "Security",
          value: "Two-factor authentication",
        },
        support: {
          title: "Support",
          value: "Contact us",
        },
        terms: {
          title: "Terms of Use",
          value: "Legal information",
        },
      },
      logout: "Log out",
    },

    editProfile: {
      title: "Edit Profile",
      name: "Name",
      username: "Username",
      reviewsLink: "Reviews Link",
      reviewsPlaceholder: "https://example.com/reviews",
      save: "Save",
      cancel: "Cancel",
    },

    pay: {
      title: "Top Up",
      titleGradient: "Balance",
      subtitle: "Select currency and amount to top up",
      currency: "Currency",
      amount: "Amount",
      amountPlaceholder: "Enter amount",
      submit: "Top Up Balance",
      quickAmounts: "Quick Select",
    },

    withdraw: {
      title: "Withdraw",
      titleGradient: "Funds",
      subtitle: "Select currency and amount to withdraw",
      currency: "Currency",
      amount: "Amount",
      amountPlaceholder: "Enter amount",
      submit: "Withdraw Funds",
      quickAmounts: "Quick Select",
    },

    sell: {
      title: "Create",
      titleGradient: "listing",
      subtitle: "Place your product on the marketplace",
      form: {
        name: {
          label: "Product Name",
          placeholder: "Enter name",
        },
        description: {
          label: "Description",
          placeholder: "Detailed product description",
        },
        price: {
          label: "Price",
          placeholder: "0.00",
        },
        currency: {
          label: "Currency",
        },
      },
      submit: "Create Listing",
    },

    modals: {
      success: {
        title: "Listing Created!",
        text: "Your product will appear on the marketplace soon",
        button: "Great!",
      },
      terms: {
        title: "Terms of Use",
        close: "Close",
      },
    },
  },
};

export const toggleLanguage = () => {
  locale.current = locale.current === "ru" ? "en" : "ru";
};

export const t = (key) => {
  const keys = key.split(".");
  let value = translations[locale.current];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
