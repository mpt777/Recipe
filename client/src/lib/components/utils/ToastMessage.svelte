<script lang="ts">
	import { page } from '$app/stores';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { Message } from '$scripts/message';


	function createToasts(messages : []) {
		messages.forEach((element : Message) => {
			console.log("Trigger")
			toastStore.trigger({
				message: element.message,
				background: element.background,
				timeout: element.timeout,
				hoverable: element.hoverable,
				hideDismiss: element.hideDismiss,
				classes: element.classes
			});
		});
	}

	function setCookie(cname :string, cvalue:string, exdays:number) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname: string) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
			c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
			}
		}
		return "";
		}

	// not the best way to handle this. This code runs every time the page is updated, not when the cookie is created
	$: {
		$page;
		let messages = JSON.parse(getCookie("toastMessages") || "[]");
		createToasts(messages)
		setCookie("toastMessages", "", -1000000)
	}


</script>
<!-- {JSON.stringify(messages)} -->