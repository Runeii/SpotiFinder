<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
body {
  margin: 0;
  font-size: 1rem;
  line-height:1.5;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
.page {
  text-align: center;
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
.leftpane {
  cursor: pointer;
  position: fixed;
  right:50%;
  top:0;
  width:50%;
  height:0;
  background-color:rgb(223,142,115);
  transition:all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.5s;
  padding:0 0 0 5%;
  font-size:2.25rem;
  color:white;
  overflow: hidden;
}
.leftpane img {
  height:100vh;
  min-width:50vw;
  object-fit: cover;
  position: absolute;
  left:50%;
  top:0;
  transform: translateX(-50%);
  filter:blur(5px);
}
.leftpane .info {
  position: absolute;
  left:50%;
  top:50%;
  transform: translateX(-50%) translateY(-50%);
}
.leftpane h1 {
  margin:0;
  text-shadow:1px 1px 1px #333;
}
.rightpane {
  position: fixed;
  right:0;
  bottom:0;
  width:50%;
  height:0;
  background-color: rgb(243, 220, 206);
  transition:all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.5s;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  padding:0;
  margin: 0;
}
.rightpane.list > a {
  width:100%;
  text-decoration: none;
  color:#333;
}
.rightpane.list li {
  width:100%;
  color:#333;
  text-align:left;
  padding:2.25rem;
  font-size:2.25rem;
  border: 1.5rem solid rgb(243, 220, 206);
  border-bottom:1px solid rgba(50,50,50,0.3);
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor:pointer;
}
.rightpane.list li:hover {
  background-color:rgba(50,50,50,0.1);
  border: 1.5rem solid rgba(50,50,50,0);
  border-bottom:1px solid rgba(50,50,50,0.3);
  border-top: none;
}
.rightpane.list li h3 {
  margin:0;
  font-size:3.375rem;
}
.connected > * {
  height:100%;
}
.connected .rightpane {
  padding:1.5rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
