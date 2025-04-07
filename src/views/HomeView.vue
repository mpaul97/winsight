<script setup>
import MyLogo from '@/components/MyLogo.vue';

import { Card } from 'primevue';

localStorage.clear();
console.info('localStorage cleared!');
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h2>Welcome to Basketball Analysis!</h2>
    </div>
    <div class="content card-container">
      <Card class="card">
        <template #title>
          <i class="pi pi-chart-line"></i>
        </template>
        <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer non ligula id mauris accumsan dictum quis in massa. S
              ed sit amet lacus id sem posuere fermentum in in eros.
              Fusce maximus tellus eget magna finibus, ut accumsan erat varius.
              Nunc vel ipsum vitae tortor feugiat ultricies ut vel nunc.
              Nulla id elementum tellus. Phasellus id lorem at lorem interdum euismod sed eget dolor.
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
        </template>
      </Card>
      <Card class="card">
        <template #title>
          <i class="pi pi-table"></i>
        </template>
        <template #content>
            <p class="m-0">
              Aenean aliquet rhoncus lorem vel faucibus.
              Maecenas suscipit suscipit nibh, quis congue nunc bibendum non. Integer efficitur,
              libero at ultrices tincidunt, orci nisl scelerisque risus,
              eu lobortis lacus neque in enim. Aenean blandit ligula nec enim vehicula,
              ac rutrum purus semper. Cras odio nibh, finibus a aliquam et, bibendum et massa.
              Sed lobortis fringilla ligula, sed suscipit arcu porta id.
              Integer erat magna, pretium ac sodales nec, aliquam eget tortor.
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              Fusce faucibus nec ipsum quis vehicula. Duis est urna, convallis non odio a, tristique tempor est.
            </p>
        </template>
      </Card>
      <Card class="card">
        <template #title>
          <i class="pi pi-ticket"></i>
        </template>
        <template #content>
            <p class="m-0">
              Fusce sagittis mi vel tincidunt facilisis.
              Proin massa nibh, tincidunt a libero ac, maximus finibus magna.
              Aliquam interdum ipsum a purus condimentum, at cursus dolor pulvinar.
              Etiam molestie posuere ultricies. Nulla accumsan placerat consectetur.
              Vestibulum scelerisque consequat turpis eget placerat.
              Nulla varius massa sit amet nisi vulputate auctor.
              Aenean efficitur, ante eu rutrum bibendum, arcu justo viverra leo, at vehicula nulla risus ac enim.
              Curabitur faucibus sodales viverra. Aenean dignissim quis massa nec posuere.
              Sed auctor iaculis nulla in vestibulum.
              Suspendisse porta, arcu eu hendrerit molestie, nisi orci dictum neque, id placerat lectus sapien et lorem.
              Duis vestibulum molestie ex, id dictum nunc. Vestibulum leo felis, ultricies quis elementum non, consequat a risus.
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

<style>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.home-container > div {
  padding: 1rem;
  background-color: var(--color-background-mute);
  color: var(--color-heading);
}
.home-container > div.header {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-container > div.content {
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.home-container > div.footer {
  height: 10%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 30%;
  background-color: var(--color-background) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  text-align: center;
  padding: 1rem;
}
.card .pi {
  font-size: 5rem;
  padding-bottom: 2rem;
}
</style>
