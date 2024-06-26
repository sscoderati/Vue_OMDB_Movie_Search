<script setup lang="ts">
import { useMovieStore } from "../store/movie.ts";
import { ref, watch } from "vue";
import MovieItem from "./MovieItem.vue";

const movieStore = useMovieStore();
const loading = ref(false);
const isMessage = ref(movieStore.message);
watch(
  () => movieStore.isLoading,
  () => {
    loading.value = movieStore.isLoading;
  },
);
watch(
  () => movieStore.message,
  () => {
    isMessage.value = movieStore.message;
  },
);
</script>

<template>
  <div class="movie-list">
    <div v-if="isMessage" class="message">
      {{ isMessage }}
    </div>
    <div v-else class="movies">
      <div v-for="movie in movieStore.movies" :key="movie.imdbID">
        <MovieItem v-bind="movie" />
      </div>
    </div>
    <span v-if="loading" class="loader"></span>
  </div>
</template>

<style scoped lang="scss">
@import "src/main.scss";
.movie-list {
  padding: 20px;
  border-radius: 4px;
  background-color: $bg-color;
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .message {
    color: $primary-color;
    font-size: 20px;
    text-align: center;
  }
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}
.loader {
  color: $primary-color;
  font-size: 5px;
  position: relative;
  display: flex;
  margin: 0 auto;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}

@keyframes bblFadInOut {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
