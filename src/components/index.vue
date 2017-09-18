<template>
	<div id="index">
		list {{ $route.params.email }}
		<tabbar>
			<tabbar-item selected :link='route_list'>
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">Wechat</span>
			</tabbar-item>
			<tabbar-item :show-dot="showdot" :link="route_user_center">
				<img slot="icon" src="../assets/img/user.png">
				<span slot="label">Message</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem } from 'vux'

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
	    TabbarItem
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
			userinfo : {},
			showdot : false,
			route_list : "",
			route_user_center : "",
		}
	},
	methods: {
		
	}
}
</script>

<style>
	
</style>