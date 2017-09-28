// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import register from './components/register'
import login from './components/login'
import validate_email from './components/validate_email'
import index from './components/index'
import list from './components/list'
import user_center from './components/user_center'
import set_userinfo from './components/set_userinfo'
import admin from './components/tfhhh'
import count from './components/count'
import test from './components/test'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)

const routes = [
	{
		path: '/',
		component: login },
	{
		path: '/register',
		component: register
	},
	{
		path: '/validate_email/username/:username/password/:password/email/:email',
		name: 'validate_email',
		component: validate_email
	},
	{
		path: '/index/email/:email',
		component: index
	},
	{
		path: '/list/email/:email',
		component: list
	},
	{
		path: '/user_center/email/:email',
		component: user_center
	},
	{
		path: '/set_userinfo/userinfo/:userinfo',
		name: "set_userinfo",
		component: set_userinfo
	},{
		path: '/tfhhh',
		component: admin
	},{
		path: '/count',
		component: count
	},
	{
		path: '/test',
		component: test
	}
]

const router = new VueRouter({
  routes
})


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  data: {
  }
}).$mount('#app-box')
