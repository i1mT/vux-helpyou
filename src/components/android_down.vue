<template>
	<div >
		<x-header :left-options="{showBack: true}">下载安卓版</x-header>
		<p class="tip">复制下载链接到浏览器中打开</p>
		<p class="con">
			http://www.iimt.me/helpyou/helpyou.apk
		</p>
	</div>
</template>

<script>
import { Group, XInput, Tab, TabItem, XButton, Divider, XHeader, AjaxPlugin, Toast, Tabbar, TabbarItem, Cell, Qrcode  } from 'vux'
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
	    Cell,
	    Qrcode
	}
}
</script>
<style>
	p.tip {
		text-align: center;
		font-size: 1.2em;
		text-align: center;
		padding: 1em 0;
	}
	p.con {
		text-align: center;
		padding: 0 1em;
		word-wrap:break-word;
		font-size: 1.4em;
		height: 8em;
		border: none;
		color: #1AAD19;
		text-decoration: underline;
		font-weight: bold;
	}
</style>