<template>
	<div>
		<x-header>设置个人信息</x-header>
		<group>
		    <x-input title="名字" v-model="true_name"  placeholder="请填写快递单上的名字"></x-input>
		</group>
		<group title="性别">
			<radio :options="genders" value="gender" @on-change="change"></radio>
		</group>
		<group>
			<x-input title="你的地址" v-model="address"  placeholder="要送到的寝室地址"></x-input>
			<x-input title="上传头像" v-model="avatar_file">
				<div id="uploaderInput" slot="right">
					<input ref="upload_file" class="weui-uploader__input" v-on:change="upload_file_change" type="file" accept="image/*" multiple />{{ select_avatar }}
				</div>
			</x-input>
		</group>
		<group>
			<x-button type="primary" @click.native="submit">确认</x-button>
		</group>
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
		return {
			genders: [ {
				key: '1',
				value: "男神"
			},{
				key: '0',
				value: "女神"
			} ],
			gender: "",
			true_name: "",
			address: "",
			avatar_file: "",
			upload_file: {},
			select_avatar: "选择头像"
		}
	},
	methods: {
		upload_file_change: function () {
			if ( this.$refs.upload_file.files[0] ){
				this.avatar_file = this.$refs.upload_file.files[0]
				this.select_avatar = "已选择"
			}
		},
		submit: function () {
			var data = {
				true_name : this.true_name,
				gender : this.gender,
				address : this.address,
				avatar_file : this.avatar_file
			}
			console.log( data )
		},
		change: function ( value ) {
			console.log( value )
			this.gender = value
		}
	},
	watch: {
		
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
    padding: 0 1.32em;
    text-align: center;
    border-radius: 5px;
    color: #fff;
}
#uploaderInput input {
	opacity: 0;
	width: 1px;
}
</style>