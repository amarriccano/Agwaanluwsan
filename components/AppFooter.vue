<template>
  <footer class="footer">
    <div class="footer-links">
      <NuxtLink to="/about">Намтар</NuxtLink>
      <NuxtLink to="/books">Ном</NuxtLink>
      <NuxtLink to="/interviews">Ярилцлага</NuxtLink>
      <NuxtLink to="/talks">Яриа</NuxtLink>
      <NuxtLink to="/articles">Нийтлэл</NuxtLink>
      <NuxtLink to="/media">Media</NuxtLink>
      <NuxtLink to="/contact">Холбогдох</NuxtLink>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ year }} BATSAIKHAN OOKHNOI. ALL RIGHTS RESERVED. &nbsp;|&nbsp; CREATED BY <strong style="color: rgba(255,255,255,0.8);">RENNAB</strong></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
