<template>
  <div id="app">
    <bo-container>
      <bo-header>Header</bo-header>
      <bo-main>Main</bo-main>
    </bo-container>

    <bo-container>
      <bo-header>Header</bo-header>
      <bo-main>Main</bo-main>
      <bo-footer>Footer</bo-footer>
    </bo-container>

    <bo-container>
      <bo-aside width="200px">Aside</bo-aside>
      <bo-main>Main</bo-main>
    </bo-container>

    <bo-container>
      <bo-header>Header</bo-header>
      <bo-container>
        <bo-aside width="200px">Aside</bo-aside>
        <bo-main>Main</bo-main>
      </bo-container>
    </bo-container>

    <bo-container>
      <bo-header>Header</bo-header>
      <bo-container>
        <bo-aside width="200px">Aside</bo-aside>
        <bo-container>
          <bo-main>Main</bo-main>
          <bo-footer>Footer</bo-footer>
        </bo-container>
      </bo-container>
    </bo-container>

    <bo-container>
      <bo-aside width="200px">Aside</bo-aside>
      <bo-container>
        <bo-header>Header</bo-header>
        <bo-main>Main</bo-main>
      </bo-container>
    </bo-container>

    <bo-container>
      <bo-aside width="200px">Aside</bo-aside>
      <bo-container>
        <bo-header>Header</bo-header>
        <bo-main>Main</bo-main>
        <bo-footer>Footer</bo-footer>
      </bo-container>
    </bo-container>

  </div>
</template>

<style>
.bo-header,
.bo-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.bo-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.bo-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .bo-container {
  margin-bottom: 40px;
}

.bo-container:nth-child(5) .bo-aside,
.bo-container:nth-child(6) .bo-aside {
  line-height: 260px;
}

.bo-container:nth-child(7) .bo-aside {
  line-height: 320px;
}
</style>