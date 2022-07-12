<template>
    <!-- class="sticky top-0 z-50" -->
  <header> 
    <div class="w-full flex justify-between p-5 bg-gray-700">
        <router-link to="/">
            <div class="flex items-center text-white text-4xl" @click="updateSelection('home')">
                <img src="@/assets/handshake.png" class="w-16 pr-4">
                CONTRAX
            </div>
        </router-link>
        <div class="text-white flex items-center text-lg">
            <router-link to="/">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             selectedTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']" 
                     @click="updateSelection('home')"
                >
                     Home
                </div>
            </router-link>
            <router-link to="buy">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             selectedTab === 'buy' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('buy')"
                >
                     Buy
                </div>
            </router-link>
            <router-link to="sell">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             selectedTab === 'sell' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('sell')"
                >
                     Sell
                </div>
            </router-link>
            <router-link to="account">
                <div :class="['py-1 px-4 rounded-md hidden md:block', 
                             selectedTab === 'account' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('account')"
                >
                     Account
                </div>
            </router-link>



            <div class="block md:hidden pr-4">
                <div class="text-2xl relative">
                    <i class="fa-solid fa-bars cursor-pointer" @click="toggle"></i>
                </div>
                <div v-if="isShown" class="absolute top-16 right-8 bg-gray-500 select-none">
                    <div class="px-6 py-6 grid grid-cols-1 gap-y-2">
                        <router-link to="/">
                            <div :class="['py-1 px-4 w-4/5 mr-2 rounded-md', 
                                        selectedTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']" 
                                @click="updateSelection('home')"
                            >
                                Home
                            </div>
                        </router-link>
                        <router-link to="buy">
                            <div :class="['py-1 px-4 w-3/5 mr-2 rounded-md', 
                                        selectedTab === 'buy' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                @click="updateSelection('buy')"
                            >
                                Buy
                            </div>
                        </router-link>
                        <router-link to="sell">
                            <div :class="['py-1 px-4 w-3/5 mr-2 rounded-md', 
                                        selectedTab === 'sell' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                @click="updateSelection('sell')"
                            >
                                Sell
                            </div>
                        </router-link>
                        <router-link to="account">
                            <div :class="['py-1 px-4 rounded-md', 
                                        selectedTab === 'account' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                @click="updateSelection('account')"
                            >
                                Account
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </header>
</template>

<script>
export default {
    name: "NavBar",
    components: {
 
    },  
    data: function() {
        return {
            isShown: false,
            selectedTab: 'home',
        }
    },
    methods: {
        updateSelection: function(selection) {
            this.isShown = false;
            this.selectedTab = selection;
        },
        toggle: function() {
            this.isShown = !this.isShown;
        },
    },
    computed: {
        
    },
    created: function() {
        this.$router.replace({path: '/'})
    }
};
</script>