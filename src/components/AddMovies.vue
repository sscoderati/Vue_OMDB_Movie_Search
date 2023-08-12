<script setup lang="ts">
import { useMovieStore } from "../store/movie.ts";
import { ref, watch } from "vue";
const movieStore = useMovieStore();
const isMovieLeft = ref(true);

watch(
  () => movieStore.page,
  () => {
    const { page, maxPage } = movieStore;
    isMovieLeft.value = maxPage > page;
  },
);
</script>

<template>
  <button
    v-if="isMovieLeft && movieStore.maxPage"
    class="btn add-more-movies"
    @click="movieStore.searchMovies(movieStore.page + 1)"
  >
    더 보기!
  </button>
</template>

<style scoped lang="scss">
.add-more-movies {
  width: 100%;
  margin: 20px auto;
  display: block;
}
</style>
