<script lang="ts" setup>
import { ref } from "vue";
import { accountStore } from "../../stores/accountStore";

const account = accountStore();

const emit = defineEmits(["alert"]);

const email = ref("");
const password = ref("");
const registerForm = ref(false);
const keepLogin = ref(true);

const submit = () => {
	if (registerForm.value) return account.createUser(email.value, password.value);
	account.standardSignIn(email.value, password.value);
};
</script>

<template>
	<div class="fixed h-screen w-screen flex items-start justify-center overflow-y-auto scrollbar">
		<div
			class="border border-black dark:border-primary-600 rounded-sm shadow-md bg-white dark:bg-neutral-700 w-full p-4 my-1 sm:my-[10vh] text-neutral-700 dark:text-white max-w-lg"
		>
			<div class="flex justify-center">
				<img src="..\..\assets\logo.svg" alt="Logo" class="h-36" />
			</div>
			<p class="text-center pb-2 text-2xl">
				{{ registerForm ? "Sign up for your Account" : "Log in to Shopping Chef" }}
			</p>
			<form v-on:submit.prevent="submit" class="my-5">
				<div class="pb-5">
					<input
						required
						v-model="email"
						type="text"
						class="block w-full p-2 rounded-sm shadow bg-neutral-100 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-800 placeholder:text-neutral-500 border-2 focus:border-collapse focus:border-primary-500 outline-none transition-all duration-500"
						placeholder="Email"
					/>
				</div>

				<div class="pb-5">
					<input
						required
						v-model="password"
						type="password"
						class="block w-full p-2 rounded-sm shadow bg-neutral-100 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-800 placeholder:text-neutral-500 border-2 focus:border-collapse focus:border-primary-500 outline-none transition-all duration-500"
						placeholder="Password"
					/>
				</div>
				<div class="pb-5 pl-1 flex flex-row justify-between" v-if="!registerForm">
					<input v-model="keepLogin" id="keep-ceckbox" class="check" type="checkbox" />
					<label for="keep-ceckbox">keep me logged in</label>
					<a href="#" class="text-blue-500 focus-visible-primary">Forgot your password?</a>
				</div>

				<div class="pb-5 pl-1 flex flex-row justify-between" v-if="registerForm">
					<input required id="terms-ceckbox" class="check" type="checkbox" />
					<label for="terms-ceckbox" c>I agree to the&nbsp;<a href="#" class="text-blue-500 focus-visible-primary">Terms and Conditions</a></label>
				</div>

				<button
					type="submit"
					required
					class="bg-primary-600 hover:bg-primary-700 p-2 w-full text-white rounded-sm focus-visible:bg-primary-700 focus-visible-primary transition-all ease-in-out duration-200"
				>
					{{ registerForm ? "Sign up" : "Log In" }}
				</button>
			</form>
			<div class="text-center border-b border-neutral-500 dark:border-neutral-200" style="line-height: 0px">
				<span
					class="p-1 text-xs tracking-wide text-neutral-500 dark:text-neutral-200 text-inherit uppercase bg-white dark:bg-neutral-700"
					style="line-height: 0px"
				>
					Or
				</span>
			</div>
			<div class="mt-5 mb-3 relative flex flex-wrap justify-around items-center">
				<button
					@click="account.googleSignIn"
					id="googleAuth"
					class="before:bg-[url('src/assets/auth/google.svg')] before:w-5 before:h-5 before:mr-2 before:bg-no-repeat before:bg-cover before:content-[''] shadow hover:bg-primary-500 hover:dark:bg-primary-700 hover:shadow-lg hover:text-white focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible-primary rounded-sm bg-neutral-100 dark:bg-neutral-800 h-10 w-80 grow-0 flex items-center justify-center font-semibold whitespace-nowrap mb-2 transition-all ease-in-out duration-200 google-icon"
				>
					{{ registerForm ? "Sign up " : "Continue " }} with Google
				</button>
			</div>
			<div class="text-center border-b border-neutral-500 dark:border-neutral-200"></div>
			<div class="mt-4 mb-1 text-sm text-center">
				<a href="#" @click="registerForm = !registerForm" class="text-blue-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible-primary">
					{{ registerForm ? "Already have an account? Log In" : "Don't have an account? Sign up!" }}</a
				>
			</div>
		</div>
	</div>
</template>
