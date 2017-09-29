<template>
	<div>
		<x-header>设置个人信息</x-header>
		<group>
		    <x-input title="名字" v-model="true_name"  placeholder="请填写快递单上的名字">{{ true_name }}</x-input>
		</group>
		<group title="性别">
			<radio :options="genders" :value="gender" @on-change="change"></radio>
		</group>
		<group>
			<x-input title="你的地址" v-model="address"  placeholder="要送到的寝室地址">{{ address }}</x-input>
			<x-input title="你的电话" v-model="tel"  placeholder="在快递单上的电话">{{ tel }}</x-input>
			<x-input title="饭卡照片" v-model="pic" :placeholder="file_input_state">
				<a slot="right" id="uploaderInput">
					<input type="file" ref="files" v-on:change="file_change" accept="image/*" multiple>{{ file_state }}
				</a>
			</x-input>
		</group>
		<group>
			<x-button type="primary" @click.native="submit" :show-loading="show_load">确认</x-button>
		</group>
		<toast v-model="toast_show" :type="toast_type">{{ toast_content }}</toast>
	</div>
</template>

<script>
import { Group, XInput, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, Cell, Radio } from 'vux'

export default {
	components: {
		XInput,
	    TabItem,
	    Group,
	    XButton,
	    Divider,
	    XHeader,
	    AjaxPlugin,
	    Toast,
	    Tabbar,
	    TabbarItem,
	    Cell,
	    Radio
	},
	data () {
		const get_userinfo_url = "http://www.iimt.me/helpyou-server/sql_class/user_operation.php?method=get_userinfo_by_email&email=" + this.$route.params.userinfo.email
		var userinfo = {},
			that = this,
			_email = this.$route.params.email
		AjaxPlugin.$http.get( get_userinfo_url ).then( ( res ) => {
			userinfo = res.data
			that.userinfo = userinfo
			that.true_name = userinfo.name
			that.tel = userinfo.tel
			that.address = userinfo.add
			that.gender = userinfo.gender
			//判断身份照片
			if( userinfo.valid_pic ){
				that.file_input_state = "已上传√"
				that.file_state = "更换图片"
			}
		})
		return {
			genders: [ {
				key: '1',
				value: "男神"
			},{
				key: '0',
				value: "女神"
			} ],
			gender: 0,
			true_name: "",
			address: "",
			tel: "",
			avatar_file: "",
			upload_file: {},
			select_avatar: "选择头像",
			show_load: false,
			toast_type: "success",
			toast_show: false,
			toast_content: "更新成功",
			pic: "",
			file_state: "选择文件",
			file_input_state: "未上传"
		}
	},
	methods: {
		submit: function () {
			var data = {
				email: this.$route.params.userinfo.email,
				true_name : this.true_name,
				gender : this.gender,
				address : this.address,
				tel : this.tel
			}
			this.show_load = true
			var that = this
			const url = "http://www.iimt.me/helpyou-server/sql_class/set_user_info.php?email="+data.email+"&true_name="+data.true_name+"&gender="+data.gender+"&tel="+data.tel+"&address="+data.address
			console.log(url)
			AjaxPlugin.$http.get( url ).then( (res) => {
				console.log( res.data )
				that.show_load = false
				if (!res.data){
					toast_type = "cancel"
					toast_content = "更新失败"
				}
				that.toast_show = true
			})
			//上传身份照片
			if (this.file_input_state == "已选择"){
				console.log("上传照片")
				var files = this.$refs.files.files[0]
				var form = new FormData()
				form.append("file",files)
				let id = this.$route.params.userinfo.stu_id
				let upload_url = "http://www.iimt.me/helpyou-server/functions/upload_pic.php?id=" + id
				AjaxPlugin.$http.post(upload_url, form).then( (res) => {
					console.log(res.data)
				})
			}
		},
		change: function ( val ) {
			this.gender = val
		},
		file_change: function () {
			this.file_input_state = "已选择"
			this.file_state = "更换图片"
		}
	}
}
</script>

<style>
#uploaderInput {
	height: 24px;
	overflow: hidden;
	background-color: #1AAD19;
	line-height: 1;
    font-size: 13px;
    padding: 0.2em 1.1em;
    text-align: center;
    border-radius: 5px;
    color: #fff;
}
#uploaderInput input {
	opacity: 0;
	width: 1px;
}
</style>