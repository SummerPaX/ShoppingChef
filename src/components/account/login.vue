<script lang="ts">
import { accountStore } from "../../stores/accountStore";

export default {
	data() {
		return {
			email: "",
			password: "",
			registerForm: false,
		};
	},
	setup() {
		const account = accountStore();
		return {
			account,
		};
	},
	methods: {
		toggleRegister() {
			this.registerForm = !this.registerForm;
		},
	},
};
</script>

<template>
	<div class="fixed h-screen w-screen flex items-start justify-center">
		<div
			class="border border-black dark:border-green-600 rounded-sm shadow-md bg-white dark:bg-gray-700 w-full p-4 mt-[10vh] text-gray-700 dark:text-white max-w-lg overflow-y-auto"
			:class="{ registerForm: registerForm }"
		>
			<div class="flex justify-center">
				<img src="..\..\assets\logo.png" alt="" class="h-24" />
			</div>

			<p class="text-center pb-2 text-2xl">
				{{
					registerForm ? "Sign up for your Account" : "Log in to Shopping Chef"
				}}
			</p>

			<form
				v-on:submit.prevent="registerForm ? account.createUser(email, password) : account.standardSignIn(email, password)"
				class="my-5"
			>
				<div class="pb-5">
					<input
						v-model="email"
						type="text"
						class="block w-full p-2 rounded-sm shadow bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800 placeholder:text-gray-500 border-2 focus:border-collapse focus:border-green-500 outline-none transition-all duration-500"
						placeholder="Email"
					/>
				</div>

				<div class="pb-5">
					<input
						v-model="password"
						type="password"
						class="block w-full p-2 rounded-sm shadow bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800 placeholder:text-gray-500 border-2 focus:border-collapse focus:border-green-500 outline-none transition-all duration-500"
						placeholder="Password"
					/>
				</div>

				<div
					class="pb-5 pl-1 flex flex-row justify-between"
					v-if="!registerForm"
				>
					<input id="keep-ceckbox" class="check" type="checkbox" />
					<label for="keep-ceckbox" c>keep me logged in</label>
					<a href="#" class="text-blue-500 focus-visible-green"
						>Forgot your password?</a
					>
				</div>

				<div
					class="pb-5 pl-1 flex flex-row justify-between"
					v-if="registerForm"
				>
					<input id="terms-ceckbox" class="check" type="checkbox" />
					<label for="terms-ceckbox" c
						>I agree to the&nbsp;<a
							href="#"
							class="text-blue-500 focus-visible-green"
							>Terms and Conditions</a
						></label
					>
				</div>

				<button
					type="submit" required
					class="bg-green-600 hover:bg-green-700 p-2 w-full text-white rounded-sm focus-visible:bg-green-700 focus-visible-green transition-all ease-in-out duration-200"
				>
					{{ registerForm ? "Sign up" : "Sign In" }}
				</button>
			</form>

			<div
				class="text-center border-b border-gray-500 dark:border-gray-200"
				style="line-height: 0px"
			>
				<span
					class="p-1 text-xs tracking-wide text-gray-500 dark:text-gray-200 text-inherit uppercase bg-white dark:bg-gray-700"
					style="line-height: 0px"
					>Or</span
				>
			</div>

			<div class="mt-5 mb-3 relative flex flex-wrap justify-around items-center">
				<button
				@click="account.googleSignIn"
					id="googleAuth"
					class="before:w-5 before:h-5 before:mr-2 before:bg-no-repeat before:bg-cover before:content-[''] shadow hover:bg-green-500 hover:dark:bg-green-700 hover:shadow-lg hover:text-white focus-visible:ring-2 focus-visible:ring-green-500 focus-visible-green rounded-sm bg-gray-100 dark:bg-gray-800 h-10 w-80 grow-0 flex items-center justify-center font-semibold whitespace-nowrap mb-2 transition-all ease-in-out duration-200 google-icon"
				>
					{{ registerForm ? "Sign up " : "Continue "}}  with Google
				</button>
				<button
					id="microsoftAuth"
					class="before:w-5 before:h-5 before:mr-2 before:bg-no-repeat before:bg-cover before:content-[''] shadow hover:bg-green-500 hover:dark:bg-green-700 hover:shadow-lg hover:text-white focus-visible:ring-2 focus-visible:ring-green-500 focus-visible-green rounded-sm bg-gray-100 dark:bg-gray-800 h-10 w-80 grow-0 flex items-center justify-center font-semibold whitespace-nowrap mb-2 transition-all ease-in-out duration-200 microsoft-icon"
				>
					{{ registerForm ? "Sign up " : "Continue "}} with Microsoft
				</button>
				<button
					id="appleAuth"
					class="before:w-5 before:h-5 before:mr-2 before:bg-no-repeat before:bg-cover before:content-[''] shadow hover:bg-green-500 hover:dark:bg-green-700 hover:shadow-lg hover:text-white focus-visible:ring-2 focus-visible:ring-green-500 focus-visible-green rounded-sm bg-gray-100 dark:bg-gray-800 h-10 w-80 grow-0 flex items-center justify-center font-semibold whitespace-nowrap mb-2 transition-all ease-in-out duration-200 apple-icon"
				>
					{{ registerForm ? "Sign up " : "Continue "}}  with Apple
				</button>
				<button
					id="twitterAuth"
					class="before:w-5 before:h-4 before:mr-2 before:bg-no-repeat before:bg-cover before:content-[''] shadow hover:bg-green-500 hover:dark:bg-green-700 hover:shadow-lg hover:text-white focus-visible:ring-2 focus-visible:ring-green-500 focus-visible-green rounded-sm bg-gray-100 dark:bg-gray-800 h-10 w-80 grow-0 flex items-center justify-center font-semibold whitespace-nowrap mb-2 transition-all ease-in-out duration-200 twitter-icon"
				>
					{{ registerForm ? "Sign up " : "Continue "}}  with Twitter
				</button>
			</div>

			<div
				class="text-center border-b border-gray-500 dark:border-gray-200"
			></div>

			<div class="mt-4 mb-1 text-sm text-center">
				<a
					href="#"
					@click="toggleRegister"
					class="text-blue-500 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible-green"
				>
					{{
						registerForm
							? "Already have an account? Log In"
							: "Don't have an account? Sign up!"
					}}</a
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.google-icon:before {
	background-image: url("../../assets/auth/google.svg");
}
.microsoft-icon:before {
	background-image: url("../../assets/auth/microsoft.svg");
}
.apple-icon:before {
	background-image: url("../../assets/auth/apple-dark.svg");
}
@media (prefers-color-scheme: dark) {
	.apple-icon:before {
		background-image: url("../../assets/auth/apple.svg");
	}
}
.twitter-icon:before {
	background-image: url("../../assets/auth/twitter.svg");
}
</style>
