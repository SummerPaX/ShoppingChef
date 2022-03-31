<script lang="ts">
export default {};
</script>

<template>
<div class="h-screen min-h-screen max-h-screen flex justify-center items-center p-4">
  <div class="border border-black dark:border-green-600 rounded-sm shadow-md 
                bg-white dark:bg-gray-700 w-full p-4 rounded shadow-2xl text-gray-700 dark:text-white sm:w-96">
    <div class="flex justify-end">
      <img src="https://www.ns-logo.com/wp-content/uploads/2020/07/logo-icon-png-8.png" alt="" class="w-8">
    </div>
    
    <p class="text-center pb-2 text-3xl">Welcome</p>
    
    
    <form action="#" class="my-5">
      <div class="pb-5 text-sm text-center">
        <p>You don´t have an account? <a href="#" class="text-blue-500">Register now!</a></p>
      </div>
      
      <div class="pb-5">
        <input type="text" class="block w-full p-2 rounded shadow bg-gray-100 dark:bg-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none" placeholder="Username or email">
      </div>

      <div class="pb-5">
        <input type="text" class="block w-full p-2 rounded shadow bg-gray-100 dark:bg-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none" placeholder="Password">
      </div>
      
      <div class="pb-5">
        <input id="remember-ceckbox" class="" type="checkbox">
        <label for="remember-ceckbox" class="pl-1">keep me logged in</label>
      </div>

      <div class="pb-5 text-right text-sm">
        <a href="#" class="text-blue-500">Forgot your password?</a>
      </div>

      <button type="submit" class="bg-green-600 p-2 w-full text-white rounded">LogIn</button>
    </form>
    
    <hr>
    
    <div class="mt-8 relative flex justify-around">
      <div class="bg-blue-800 h-12 w-12 flex justify-center items-center rounded-full text-white">
        <i class="fab fa-facebook text-3xl"></i>
      </div>
      <div class="bg-blue-500 h-12 w-12 flex justify-center items-center rounded-full text-white">
        <i class="fab fa-twitter text-3xl"></i>
      </div>
      
       <div class="bg-red-500 h-12 w-12 flex justify-center items-center rounded-full text-white">
        <i class="fab fa-google text-3xl"></i>
      </div>
    </div>
  </div>
</div>

<div class="fixed bottom-0 right-0">
  <button id="switchTheme">
      <i classs="fab fa-codepen"></i>s
  </button>
</div>
</template>

<style></style>
