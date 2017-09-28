<template>
	<div id="tfhhh">
		<x-header :left-options="{showBack: false}">统计</x-header>
		<input type="file" ref="files"></input>
		<x-button @click.native="upload">上传</x-button>
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
		return {
			files: ""
		}
	},
	methods: {
		upload: function () {
			var files = this.$refs.files.files[0]
			if(!files) return;
			var form = new FormData()
			form.append("file",files)

			let id = "123456"
			let url = "http://www.iimt.me/helpyou-server/functions/upload_pic.php?id=" + id
			AjaxPlugin.$http.post(url, form).then( (res) => {
				console.log(res.data)
			})
		},
		change: function () {
		}
	}
}
</script>

<style>

</style>