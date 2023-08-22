<template>
  <div class="container">
    <div class="poster skeleton"></div>
    <div class="specs">
      <div class="title skeleton"></div>
      <div class="labels skeleton"></div>
      <div class="plot skeleton"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/main.scss";
.container {
  display: flex;
  gap: 70px;
}
.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background-color: $bg-color;
}
.skeleton::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transform: translateX(-100%);
  animation: skeleton-loader 2s infinite;
}
.poster {
  flex-shrink: 0;
  width: 500px;
  height: 750px;
  border-radius: 10px;
  background-size: cover;
  background-color: $color-black;
}
.specs {
  flex-grow: 1;
}
.title {
  height: 70px;
  margin-bottom: 30px;
}
.labels {
  height: 30px;
  margin-bottom: 30px;
}
.plot {
  width: 80%;
  height: 400px;
}
@keyframes skeleton-loader {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
