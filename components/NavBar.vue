<template>
  <nav class="navbar">
    <NuxtLink to="/" class="brand">О.Батсайхан</NuxtLink>

    <div class="nav-container">
      <div class="nav-links">
        <NuxtLink to="/about">Намтар</NuxtLink>
        <NuxtLink to="/books">Ном</NuxtLink>
        <NuxtLink to="/interviews">Ярилцлага</NuxtLink>
        <NuxtLink to="/talks">Яриа</NuxtLink>
        <NuxtLink to="/articles">Нийтлэл</NuxtLink>
        <NuxtLink to="/media">Media</NuxtLink>
        <NuxtLink to="/contact">Холбогдох</NuxtLink>
      </div>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <NuxtLink to="/search" class="search-container" style="text-decoration: none;">
          <span style="font-size: 14px; margin-right: 5px; color: #777;">🔍</span>
          <input
            type="text"
            class="search-input"
            placeholder="Хайлт..."
            @click.prevent="goToSearch"
            @focus="goToSearch"
            readonly
          />
        </NuxtLink>

        <NuxtLink to="/books/cart" class="cart-icon">
          <span>🛒</span>
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
          <span v-if="totalItems === 0">Сагс</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter()
const { totalItems } = useCart()

function goToSearch() {
  router.push('/search')
}
</script>
