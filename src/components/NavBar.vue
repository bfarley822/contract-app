<template>
  <header>
    <div class="w-full flex justify-between p-5 bg-gray-700">
        <router-link to="/">
            <div class="flex items-center text-white text-4xl">
                <img src="@/assets/handshake.png" class="w-16 pr-4">
                Contrex
            </div>
        </router-link>
        <div class="grid grid-cols-2 gap-x-4 text-white flex items-center text-2xl">
            <router-link to="/">
                <div :class="['py-1 px-4 rounded-md', 
                             selectedTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']" 
                     @click="updateSelection('home')"
                >
                     Home
                </div>
            </router-link>
            <router-link to="about">
                <div :class="['py-1 px-4 rounded-md', 
                             selectedTab === 'about' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('about')"
                >
                     About
                </div>
            </router-link>
        </div>
    </div>
  </header>
</template>

<script>
export default {
    name: "NavBar",
    data: function() {
        return {
            selectedTab: 'home'
        }
    },
    methods: {
        updateSelection: function(selection) {
            this.selectedTab = selection;
        }
    },
    computed: {
        
    }
};
</script>