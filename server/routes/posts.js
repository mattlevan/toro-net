const express = require('express'),
      Post = require('../models/post')

// Functions imported with 'require' must be set to var, not const.
var checkAuth = require('./index.js').checkAuth

module.exports = (() => {

  'use strict';
  
  const router = express.Router();

  const postsProjection = {
      __v: false,
  }
  
  router.get('/', checkAuth, (req, res) => {
    Post.find({}, postsProjection, (err, posts) => {
      if (err) throw err
      else {
        res.json({ posts })
      }
    })
  })
  
  /* Endpoint: Delete single post based on new attempt. */
  router.get('/delete/:id', checkAuth, (req, res) => {
    Post.remove( Post.findById(req.params.id), postsProjection,
      (err, result) => {
      console.log('Endpoint: Delete Post')
      if (err) {
        console.log('Error in delete post')
        res.status(204).send() 
      }
      else {
        console.log('Success in Delete Post') //, result)
        res.status(200).send()
        //res.json({result})
      }
    })
  })
  
  /* Endpoint: Delete Many Posts Based on  */
  /* not working yet */
  /* ~TEMP~ Delete Many Posts */
  router.post('/deleteMany', checkAuth, (req, res) => {   
    /* json data */
    var errorsInDeleting=false
    console.log('Endpoint: Delete Many Posts')      
    for(var key in req.body.deleteIds) {
      var idToDelete = req.body.deleteIds[key]
      console.log('ID :  ', idToDelete )

      /* Delete One ID */
      Post.remove(Post.findById(idToDelete), postsProjection, 
        (err, result) => {
        if (err) {
          console.log('Failure (Error): Delete Post ', err)
          //res.status(204).send()//No record
        }
        if (!result) {//.length<1) {//} || result.length<1) {
          console.log('FAIL: No Results')
          console.log('FAIL: Did Not Delete ID: ', idToDelete)
          errorsInDeleting=true
          //res.status(204).send()//No record
        }
        else {
          console.log('Success in Delete Post')//, result)
          console.log('Deleted Post ID:', idToDelete )
          //res.status(200).send()
        }
      })

      /* try find [2] */
      // Post.find( Post.findById( idToDelete ) , function(err, posts) {
      //   if (err) throw err
      //   if (!posts || (posts.length<1) ) {
      //     console.log('Total Posts Found:  ', posts.length)
      //     console.log('No Post Found matching the keyword.')
      //     //res.json({ posts })   
      //   }
      //   else {
      //     console.log('Total Posts Found:  ', posts.length)
      //     console.log('')
      //     console.log('POSTS: ')
      //     console.log(' ',posts)    
      //     Post.remove( Post.findById( idToDelete ) ,(err, result) => {} )      
      //     //res.json({ posts })
      //   }        
      // })
      /*  */

    } //End for
    res.json({})       
  })
  
  router.post('/create', (req, res) => {
    const newPost = new Post({
      userId: req.user.id,
      username: req.user.username, 
      title: req.body.title,
      body: req.body.body,
      createdOn: new Date
    })
    Post.create(newPost, (err) => {
      if (err) {
        console.log('Error detected: ', err)
        res.status(409).send()
      }
      else {
        console.log('Post created successfully!')
        res.redirect('/')
      }
    })
  })
  
  router.put('/update/:id', checkAuth, (req, res, next) => {
    console.log("EndPoint : update Post")
    Post.update(Post.findById(req.params.id), req.body, (err, result) => {
    if (err) {
      console.log("Post record doesn't exist!")
      res.status(204).send()
    }
    else {
      console.log("success")
      res.status(200).send()
    }
    })
  })
  
  /* The User object returned by passport does not have userId, switched 
   * to username */
  router.get('/list/:username', checkAuth, (req, res) => {
    Post.find({ 'username': req.params.username }, (err, result) => {
      if (err) {
        console.log("Error: ", err)
        res.status(200).send()
      }
      else {
        console.log('Post Successfully Retrived')
        res.send(result)
      }
    })
  })    
  
  return router
})()
