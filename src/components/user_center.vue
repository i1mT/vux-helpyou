<template>
	<div id="user_center">
		<div class="vux-demo">
			<img class="logo" src="../assets/vux_logo.png">
			<p> {{ userinfo.username }}</p>
    	</div>
    	<divider>·</divider>
    	<group>
    		<cell title="设置个人信息" is-link @click.native="set_userinfo"></cell>
    	</group>
		<tabbar>
			<tabbar-item :link='route_list'>
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">清单</span>
			</tabbar-item>
			<tabbar-item selected :show-dot="showdot" :link="route_user_center">
				<img slot="icon" src="../assets/img/user.png">
				<span slot="label">个人</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, Cell } from 'vux'

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
	    Toast,
	    Tabbar,
	    TabbarItem,
	    Cell
	},
	data () {
		const get_userinfo_url = "http://localhost/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.email
		var userinfo = {},
			that = this
		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data 
			that.userinfo = userinfo
			that.route_list = "/list/email/" + that.userinfo.email
			that.route_user_center = "/user_center/email/" + that.userinfo.email
		})
		return {
			showdot: false,
			route_list: "",
			route_user_center : "",
			userinfo: {}
		}
	},
	methods: {
		set_userinfo: function () {
			this.$router.push({
				name: "set_userinfo",
				params: {
					email: this.userinfo.email
				}
			})
		}
	}
}
</script>

<style>
.vux-demo {
  text-align: center;
  margin-top: 20px;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>