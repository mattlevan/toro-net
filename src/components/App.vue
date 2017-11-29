<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#toroNav">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Toro Net</a>
        </div>
        <div class="collapse navbar-collapse" id="toroNav">
          <ul class="nav navbar-nav">
            <li v-if="!this.$store.state.user.displayName"><a href="/register">Register</a></li>
            <li v-if="this.$store.state.user.displayName"><a href="/logout">Logout</a></li>
            <li v-if="!this.$store.state.user.displayName"><a href="/login">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Toro Net'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #363636;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #363636;
}
.btn {
  border: 0;
  background: #860038;
  color: white;
  outline: 0;
}
.btn:active {
  background: #860038;
  outline: 0;
}
.btn:focus {
  background: #860038;
  outline: 0;
}
.btn:active:focus {
  background: #860038;
  outline: 0;
}
.btn-default {
  border: 0;
  background: #860038;
  color: white;
}
.btn-primary {
  border: 0;
  background: #860038;
  color: white;
}
.btn-primary:hover {
  background: #EFBA08;
  color: white;
}
.icon-bar {
  background: white;
  color: white;
}
</style>
