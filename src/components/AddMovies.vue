<script setup lang="ts">
import { useMovieStore } from "../store/movie.ts";
import { ref, watch } from "vue";
const movieStore = useMovieStore();
const hasNextPage = ref(true);
const isShowMoreBtnVisible = () => {
  return (
    hasNextPage.value &&
    movieStore.maxPage &&
    !movieStore.isLoading &&
    movieStore.isNormal === "True"
  );
};
watch(
  () => movieStore.page,
  () => {
    const { page, maxPage } = movieStore;
    hasNextPage.value = maxPage > page;
  },
);
</script>

<template>
  <button
    @click="movieStore.searchMovies(movieStore.page + 1)"
    v-if="isShowMoreBtnVisible()"
    class="btn show-more-movies"
  >
    더 보기!
  </button>
</template>

<style scoped lang="scss">
.show-more-movies {
  width: 100%;
  margin: 20px auto;
  display: block;
}
</style>
