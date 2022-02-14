import Vue from 'vue'
import Router from 'vue-router'
import editor from '../page/editor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: editor
    }
  ]
})