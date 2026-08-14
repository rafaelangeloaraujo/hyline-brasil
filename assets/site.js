const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const siteHeader = document.querySelector(".site-header");
const utilityBar = document.querySelector(".utility-bar");

if (siteHeader) {
  const headerSpacer = document.createElement("div");
  headerSpacer.className = "site-header-spacer";
  siteHeader.before(headerSpacer);

  const updateHeaderState = () => {
    const utilityHeight = utilityBar ? utilityBar.offsetHeight : 0;
    const shouldFixMenu = window.scrollY >= utilityHeight;
    siteHeader.classList.toggle("is-menu-fixed", shouldFixMenu);
    siteHeader.classList.toggle("is-scrolled", shouldFixMenu);
    headerSpacer.style.height = shouldFixMenu ? `${siteHeader.offsetHeight}px` : "0px";
  };
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", updateHeaderState);
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const stateDetail = document.querySelector("[data-state-detail]");
const statePins = document.querySelectorAll(".state-pin");
const defaultStateDetail = stateDetail ? stateDetail.innerHTML : "";
let pinnedStateButton = null;
const pageLang = document.body?.dataset.lang || "pt";
const uiText = {
  pt: {
    selectedState: "Estado selecionado",
    backToMap: "Voltar ao mapa",
    defaultRole: "Atendimento comercial",
    representativeAlt: "representante",
    representativeName: "Representante Hy-Line",
    openWhatsapp: "Abrir WhatsApp para",
    dollar: "Dólar",
    euro: "Euro",
    pound: "Libra",
    exchangeUnavailable: "Atualização indisponível",
    exchangeError: "Não foi possível carregar as cotações agora.",
    closing: "Fechamento",
    videoTitle: "Vídeo institucional",
    cookieNotice: "Aviso de cookies",
    cookieTitle: "Permissão de cookies",
    cookieText: "Usamos cookies para melhorar sua experiência, entender a navegação no site e apoiar o atendimento da Hy-Line do Brasil.",
    decline: "Recusar",
    acceptCookies: "Aceitar cookies",
  },
  en: {
    selectedState: "Selected state",
    backToMap: "Back to map",
    defaultRole: "Commercial support",
    representativeAlt: "representative",
    representativeName: "Hy-Line representative",
    openWhatsapp: "Open WhatsApp for",
    dollar: "Dollar",
    euro: "Euro",
    pound: "Pound",
    exchangeUnavailable: "Update unavailable",
    exchangeError: "Exchange rates could not be loaded right now.",
    closing: "Close",
    videoTitle: "Institutional video",
    cookieNotice: "Cookie notice",
    cookieTitle: "Cookie permission",
    cookieText: "We use cookies to improve your experience, understand site navigation and support Hy-Line Brazil service.",
    decline: "Decline",
    acceptCookies: "Accept cookies",
  },
  es: {
    selectedState: "Estado seleccionado",
    backToMap: "Volver al mapa",
    defaultRole: "Atención comercial",
    representativeAlt: "representante",
    representativeName: "Representante Hy-Line",
    openWhatsapp: "Abrir WhatsApp para",
    dollar: "Dólar",
    euro: "Euro",
    pound: "Libra",
    exchangeUnavailable: "Actualización no disponible",
    exchangeError: "No fue posible cargar las cotizaciones ahora.",
    closing: "Cierre",
    videoTitle: "Video institucional",
    cookieNotice: "Aviso de cookies",
    cookieTitle: "Permiso de cookies",
    cookieText: "Usamos cookies para mejorar su experiencia, entender la navegación en el sitio y apoyar la atención de Hy-Line Brasil.",
    decline: "Rechazar",
    acceptCookies: "Aceptar cookies",
  },
}[pageLang] || {};
const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}[char]));

const whatsappHref = (phone) => {
  const digits = String(phone || "").replace(/\D+/g, "");
  if (!digits) return "";
  const normalized = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${normalized}`;
};

const whatsappPhoneLink = (phone) => {
  const href = whatsappHref(phone);
  if (!href) return "";
  return `<a class="whatsapp-phone" href="${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="${escapeHtml(uiText.openWhatsapp)} ${escapeHtml(phone)}"><img class="whatsapp-mini" src="/assets/whatsapp-icon.png" alt="" aria-hidden="true">${escapeHtml(phone)}</a>`;
};

const resetStateSelection = () => {
  const stage = document.querySelector("[data-representatives-stage]");
  pinnedStateButton = null;
  if (stage) stage.classList.remove("is-engaged");
  statePins.forEach((item) => {
    item.classList.remove("is-active");
    item.setAttribute("aria-pressed", "false");
  });
  if (stateDetail) stateDetail.innerHTML = defaultStateDetail;
};

const renderState = (button) => {
  if (!stateDetail || !button) return;
  let state = {};
  try {
    state = JSON.parse(button.dataset.state || "{}");
  } catch (error) {
    state = {};
  }
  pinnedStateButton = button;
  statePins.forEach((item) => item.classList.remove("is-active"));
  statePins.forEach((item) => item.setAttribute("aria-pressed", item === pinnedStateButton ? "true" : "false"));
  button.classList.add("is-active");
  const stage = button.closest("[data-representatives-stage]");
  if (stage) stage.classList.add("is-engaged");
  const reps = Array.isArray(state.representatives) ? state.representatives : [];
  const cards = reps.map((rep) => {
    const phone = rep.phone ? whatsappPhoneLink(rep.phone) : "";
    const email = rep.email ? `<a href="mailto:${escapeHtml(rep.email)}">${escapeHtml(rep.email)}</a>` : "";

    return `
      <article class="rep-card">
        <img src="${escapeHtml(rep.photo || "assets/rep-placeholder.svg")}" alt="Foto de ${escapeHtml(rep.name || uiText.representativeAlt)}">
        <div>
          <strong>${escapeHtml(rep.name || uiText.representativeName)}</strong>
          <small>${escapeHtml(rep.role || uiText.defaultRole)}</small>
          ${phone}
          ${email}
        </div>
      </article>
    `;
  }).join("");
  stateDetail.innerHTML = `
    <div class="state-detail-header">
      <span>${escapeHtml(uiText.selectedState)}</span>
      <h3>${escapeHtml(state.name || "")} <small>${escapeHtml(state.code || "")}</small></h3>
      <p>${escapeHtml(state.region || "")}</p>
      <button class="state-back-button" type="button" data-state-back>${escapeHtml(uiText.backToMap)}</button>
    </div>
    ${cards}
  `;
};

statePins.forEach((button) => {
  button.addEventListener("click", () => renderState(button));
});

stateDetail?.addEventListener("click", (event) => {
  if (event.target.closest("[data-state-back]")) resetStateSelection();
});

const activeState = document.querySelector(".state-pin.is-active");
if (activeState) renderState(activeState);

const currencyPanel = document.querySelector("[data-currency-panel]");
if (currencyPanel) {
  const currencyLabels = {
    USDBRL: uiText.dollar,
    EURBRL: uiText.euro,
    GBPBRL: uiText.pound,
  };
  const formatMoney = (value) => Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formatDate = (timestamp) => {
    if (!timestamp) return uiText.exchangeUnavailable;
    return new Date(Number(timestamp) * 1000).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("Falha ao carregar câmbio")))
    .then((rates) => {
      currencyPanel.innerHTML = Object.entries(currencyLabels).map(([key, label]) => {
        const rate = rates[key] || {};
        const variation = Number(rate.pctChange || 0);
        const variationClass = variation >= 0 ? "is-up" : "is-down";
        return `<article class="currency-card">
          <span>${label}</span>
          <strong>${formatMoney(rate.bid)}</strong>
          <small>${escapeHtml(uiText.closing)}: ${formatMoney(rate.ask || rate.bid)}</small>
          <em class="${variationClass}">${variation.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</em>
          <small>${formatDate(rate.timestamp)}</small>
        </article>`;
      }).join("");
    })
    .catch(() => {
      currencyPanel.innerHTML = `<p>${escapeHtml(uiText.exchangeError)}</p>`;
    });
}

const technicalSearch = document.querySelector("[data-technical-search]");
const technicalTabs = document.querySelectorAll("[data-technical-filter]");
let activeTechnicalCategory = "todos";

const updateTechnicalCards = () => {
  const query = technicalSearch ? technicalSearch.value.trim().toLowerCase() : "";
  document.querySelectorAll("[data-technical-card]").forEach((card) => {
    const text = card.textContent.toLowerCase();
    const category = card.dataset.category || "";
    const matchesQuery = query === "" || text.includes(query);
    const matchesCategory = activeTechnicalCategory === "todos" || category === activeTechnicalCategory;
    card.hidden = !matchesQuery || !matchesCategory;
  });
};

if (technicalSearch) {
  technicalSearch.addEventListener("input", updateTechnicalCards);
}

technicalTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeTechnicalCategory = button.dataset.technicalFilter || "todos";
    technicalTabs.forEach((item) => item.classList.toggle("is-active", item === button));
    updateTechnicalCards();
  });
});

document.querySelectorAll("[data-product-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    if (!card) return;
    const isOpen = card.classList.toggle("is-open");
    button.firstChild.textContent = isOpen ? "Ocultar detalhes " : "Ver detalhes ";
  });
});

document.querySelectorAll("[data-video-src]").forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.videoSrc;
    if (!source) return;
    const iframe = document.createElement("iframe");
    iframe.src = source;
    iframe.title = button.getAttribute("aria-label") || uiText.videoTitle;
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const cookieConsentKey = "hyline_cookie_consent";
if (!localStorage.getItem(cookieConsentKey)) {
  const cookieBanner = document.createElement("section");
  cookieBanner.className = "cookie-consent";
  cookieBanner.setAttribute("aria-label", uiText.cookieNotice);
  cookieBanner.innerHTML = `
    <div>
      <strong>${escapeHtml(uiText.cookieTitle)}</strong>
      <p>${escapeHtml(uiText.cookieText)}</p>
    </div>
    <div class="cookie-consent-actions">
      <button type="button" class="cookie-decline">${escapeHtml(uiText.decline)}</button>
      <button type="button" class="cookie-accept">${escapeHtml(uiText.acceptCookies)}</button>
    </div>
  `;
  document.body.appendChild(cookieBanner);

  const closeCookieBanner = (value) => {
    localStorage.setItem(cookieConsentKey, value);
    cookieBanner.classList.add("is-hidden");
    window.setTimeout(() => cookieBanner.remove(), 250);
  };

  cookieBanner.querySelector(".cookie-accept").addEventListener("click", () => closeCookieBanner("accepted"));
  cookieBanner.querySelector(".cookie-decline").addEventListener("click", () => closeCookieBanner("declined"));
}
