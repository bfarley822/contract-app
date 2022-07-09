<template>
  <header>
    <div class="w-full grid justify-items-end p-5 bg-gray-700">
        <div class="grid grid-cols-2 gap-x-4 text-white text-2xl">
            <router-link to="/">
                <div class="py-1 px-4 hover:bg-white hover:text-gray-700 rounded-md">Home</div>
            </router-link>
            <router-link to="about">
                <div class="py-1 px-4 hover:bg-white hover:text-gray-700 rounded-md">About</div>
            </router-link>
        </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>