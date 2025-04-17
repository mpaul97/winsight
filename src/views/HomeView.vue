<script setup>
import MyLogo from '@/components/MyLogo.vue';
import { Card } from 'primevue';
import HttpService from '../services/HttpService';
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h2>Welcome to Basketball Analysis!</h2>
    </div>
    <div class="content card-container"
      v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
    >
      <Card class="card">
        <template #title>
          <i class="pi pi-chart-line" :style="'color: #bc4749'"></i>
          <h2>Comprehensize Charts</h2>
        </template>
        <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer non ligula id mauris accumsan dictum quis in massa. S
              ed sit amet lacus id sem posuere fermentum in in eros.
              Fusce maximus tellus eget magna finibus, ut accumsan erat varius.
              Nunc vel ipsum vitae tortor feugiat ultricies ut vel nunc.
            </p>
        </template>
      </Card>
      <Card class="card">
        <template #title>
          <i class="pi pi-table" :style="'color: #a7c957'"></i>
          <h2>Dynamic Tables</h2>
        </template>
        <template #content>
            <p class="m-0">
              Aenean aliquet rhoncus lorem vel faucibus.
              Maecenas suscipit suscipit nibh, quis congue nunc bibendum non. Integer efficitur,
              libero at ultrices tincidunt, orci nisl scelerisque risus,
              eu lobortis lacus neque in enim. Aenean blandit ligula nec enim vehicula,
              ac rutrum purus semper. Cras odio nibh, finibus a aliquam et, bibendum et massa.
              Sed lobortis fringilla ligula, sed suscipit arcu porta id.
            </p>
        </template>
      </Card>
      <Card class="card">
        <template #title>
          <i class="pi pi-ticket" :style="'color: #f2e8cf'"></i>
          <h2>Betting Analysis</h2>
        </template>
        <template #content>
            <p class="m-0">
              Fusce sagittis mi vel tincidunt facilisis.
              Proin massa nibh, tincidunt a libero ac, maximus finibus magna.
              Aliquam interdum ipsum a purus condimentum, at cursus dolor pulvinar.
              Etiam molestie posuere ultricies. Nulla accumsan placerat consectetur.
              Vestibulum scelerisque consequat turpis eget placerat.
              Nulla varius massa sit amet nisi vulputate auctor.
            </p>
        </template>
      </Card>
    </div>
    <div class="footer">
      <p>Footer</p>
      <MyLogo my-size='3rem' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  async created() {
    HttpService.set_all_players();
  },
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.home-container > div {
  width: 80%;
  padding: 1rem;
  color: var(--color-heading);
}
.home-container > div.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-container > div.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.home-container > div.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 30%;
  background-color: var(--color-background-mute) !important;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
}
.card:hover {
  cursor: pointer;
  border: 1px solid var(--color-border-hover);
  transform: scale(1.02);
  transition: all 200ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card .pi {
  font-size: 4rem;
  padding-bottom: 2rem;
}
@media (max-width: 1280px) {
  .home-container > div.content {
    flex-direction: column;
    width: 80%;
    justify-content: center;
    gap: 2rem;
  }
  .card {
    width: 100%;
  }
}
</style>
