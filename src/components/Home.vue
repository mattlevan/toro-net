<template>
  <div class="container" v-if="this.$store.state.user.displayName">
    <h4>Welcome {{this.$store.state.user.username}}! What's happening?</h4>
    <br>
    <form @submit.prevent="validateBeforeSubmit" id="post" action="/posts/create" method="post">
      <div class="form-group" :class="{'has-error': errors.has('title') }" >
        <label for="title" class="pull-left">Title</label>
        <input name="title" id="title" v-validate="'required'" data-vv-delay="500" type="text" data-vv-as="title" placeholder="Title" class="form-control">
        <p class="text-danger" align="left" v-if="errors.has('title')">{{ errors.first('title') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('body') }" >
        <label for="body" class="pull-left">Body</label>
        <textarea name="body" id="body" v-validate="'required'" data-vv-delay="500" type="text" data-vv-as="body" placeholder="Body" class="form-control" rows=5>
        </textarea>
        <p class="text-danger" align="left" v-if="errors.has('body')">{{ errors.first('body') }}</p>
      </div>
    </form>
    <button class="btn btn-primary" form="post" type="submit">Post</button>
    <hr>
    <div class="postContainer" v-if="this.userPosts">
      <h4>Your posts: {{this.userPosts}}</h4>
    </div>
    <div class="noPostsContainer" v-else> You have no posts :( </div>
  </div>
  <div class="container" v-else>
    <h4>Click the bull to login.</h4>
    <div >
    <a href="/login"><img src="https://i.imgur.com/bGlcYmy.png"/></a> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: {
    postsRetrieved: false,
    userPosts: {},
  },
  methods: {
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result) {
          document.querySelector('#post').submit()
          // Do we want to store posts in the VueX store?
          // this.$store.dispatch('addPost', this.$store.state.posts)
          return
        }
      })
    }, 
    getPostsFromDB(){
      if (!this.postsRetrieved) {
        const userName = this.$store.state.user.username
        this.$store.dispatch('getPosts', userName).then(res => {
          // this.userPosts = Object.assign({}, this.userPosts, this.$store.state.posts)
          console.log("STATE POSTS: ", this.$store.state.posts['0'])
        }, err => {
          console.log("Error", err)
        })

        this.postsRetrieved = true
      }
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  },
  updated() {
    this.getPostsFromDB()
  }
}
</script>
