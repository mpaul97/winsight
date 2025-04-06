<script setup>
import MyLogo from '@/components/MyLogo.vue';

import { Card } from 'primevue';
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h2>Welcome to Basketball Analysis!</h2>
    </div>
    <div class="menu">
      <h3>Link 1</h3>
      <h3>Link 2</h3>
      <h3>Link 3</h3>
    </div>
    <div class="content card-container">
      <Card class="card">
        <template #title>Card 1</template>
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
        <template #title>Card 2</template>
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
        <template #title>Card 3</template>
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
  display: grid;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  padding: 1rem;
}
.home-container > div {
  padding: 1rem;
  background-color: var(--color-background-mute);
}
.home-container > div.header {
  grid-area: header;
  display: flex;
}
.home-container > div.menu {
  grid-area: menu;
}
.home-container > div.content {
  grid-area: content;
}
.home-container > div.footer {
  grid-area: footer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.card-container {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 1rem;
}
.card {
  background-color: var(--color-background) !important;
}
</style>
