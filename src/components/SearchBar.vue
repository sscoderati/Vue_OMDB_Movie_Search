<script setup lang="ts">
import { loadMovies, useMovieStore } from "../store/movie.ts";

const movieStore = useMovieStore();
</script>

<template>
  <div class="search">
    <input
      v-model="movieStore.title"
      placeholder="영화의 제목을 입력해보세요!"
      @keydown.enter="loadMovies(1)"
    />
    <button v-if="!movieStore.isLoading" class="btn" @click="loadMovies(1)">
      검색!
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "src/main.scss";
.search {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search input {
  flex-grow: 1;
  height: 50px;
  padding: 0 20px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 14px;
  color: $color-white;
  background-color: $color-black;
}

.search input::placeholder {
  color: $color-gray-300;
}

.search .btn {
  flex-grow: 1;
  max-width: 150px;
}
</style>
