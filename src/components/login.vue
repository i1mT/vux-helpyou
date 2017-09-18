<template>
	<div id="login">
		<x-header></x-header>
		<div class="vux-demo">
	      <img class="logo" src="../assets/vux_logo.png">
	      <h3>{{ msg }}</h3>
	    </div>
	    <group class='tab-0'>
	      <x-input title="邮箱" v-model="email"  placeholder="请输入邮箱" ></x-input>
	      <x-input title="密码" v-model="password" placeholder="请输入密码" type="password"></x-input>
	    </group>
	    <divider></divider>
	    <x-button type="primary" @click.native="login">登陆</x-button>
	    <toast v-model="toast_show" type="cancel">邮箱与密码不匹配</toast>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast } from 'vux'

export default {
	components: {
		XInput,
	    Tab,
	    TabItem,
	    Group,
	    XButton,
	    Divider,
	    XHeader,
	    AjaxPlugin,
	    Toast
	},
	data () {
		return {
			msg: "登陆",
			email: "",
			password: "",
			toast_show: false
		}
	},
	methods: {
		login: function () {
			const email = this.email,
				  password = this.password
			const url = "http://localhost/helpyou-server/sql_class/user_operation.php?method=login&password="+ password +"&email="+email
			var state
			AjaxPlugin.$http.get(url).then( (res) => {
				state = res.data
				if(!state) this.toast_show = true
				else{
					this.$router.push("/list/email/" + email)
				}
			})
		}
	}
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>