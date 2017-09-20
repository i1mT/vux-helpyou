<template>
	<div id="tfhhh">
		<x-header :left-options="{showBack: false}">统计</x-header>
		<div style="text-align:center; margin-top:10px">
			<p class="demo2">用户数</p>
		    <countup :start-val="0" :end-val="user_num" :duration="1" class="demo1"></countup>
		    <divider>·</divider>
		    <p class="demo2">未接单数</p>
		    <countup :end-val="list_num" :duration="1" class="demo1"></countup>
		    <br>
    	</div>
		<tabbar id="tabbar">
			<tabbar-item link="/tfhhh" class="tab">
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">管理端</span>
			</tabbar-item>
			<tabbar-item selected class="tab">
				<img slot="icon" src="../assets/img/list.png">
				<span slot="label">统计</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, ViewBox,Checker,CheckerItem,FormPreview,Confirm,Countup } from 'vux'

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
	    ViewBox,
	    Checker,
	    CheckerItem,
	    FormPreview,
	    Confirm,
	    Countup
	},
	data () {
		var that = this
		const url = "http://www.iimt.me/helpyou-server/sql_class/get_count.php"
		AjaxPlugin.$http.get( url ).then( ( res ) => {
			this.user_num = res.data.user_num
			this.list_num = res.data.list_num
		})
		return {
			user_num: "0",
			list_num: "0"
		}
	},
	methods: {
		
	}
}
</script>

<style>
#tabbar {
	position: fixed;
	bottom: 0;
}
.selecte {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.selecte-selected {
  border: 1px solid green;
}
.checker {
	text-align: center;
}
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 6em;
  color: #04BE02;
}
.demo2 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 2rem;
  color: #04BE02;
  line-height: 1;
}
</style>