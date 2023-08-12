<script setup lang="ts">
import { Movie } from "../store/movie.ts";
import { ref } from "vue";

const movie = defineProps<Movie>();
const isInfoShown = ref(false);
</script>

<template>
  <RouterLink :to="`/movie/${movie.imdbID}`">
    <div
      class="movie-item"
      :style="{ backgroundImage: `url(${movie.Poster})` }"
      @mouseover="isInfoShown = true"
      @mouseleave="isInfoShown = false"
    >
      <div v-if="isInfoShown" class="info">
        <div class="year">
          {{ movie.Year }}
        </div>
        <div class="title">
          {{ movie.Title }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import "src/main.scss";
a {
  text-decoration: none;
}
.movie-item {
  width: 200px;
  height: 300px;
  border-radius: 4px;
  background-color: $color-black;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(14, 14, 14, 0.1);
  }

  .info {
    width: 100%;
    height: 100%;
    padding: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: $color-white;
    .year,
    .title {
      width: 100%;
      background-color: $bg-color;
    }
  }
}
</style>
