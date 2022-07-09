<template>
    <!-- class="sticky top-0 z-50" -->
  <header> 
    <div class="w-full flex justify-between p-5 bg-gray-700">
        <router-link to="/">
            <div class="flex items-center text-white text-4xl">
                <img src="@/assets/handshake.png" class="w-16 pr-4">
                CONTRAX
            </div>
        </router-link>
        <div class="text-white flex items-center text-2xl">
            <router-link to="/">
                <div :class="['py-1 px-4 mr-2 rounded-md', 
                             selectedTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']" 
                     @click="updateSelection('home')"
                >
                     Home
                </div>
            </router-link>
            <router-link to="buy">
                <div :class="['py-1 px-4 mr-2 rounded-md', 
                             selectedTab === 'buy' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('buy')"
                >
                     Buy
                </div>
            </router-link>
            <router-link to="sell">
                <div :class="['py-1 px-4 mr-2 rounded-md', 
                             selectedTab === 'sell' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('sell')"
                >
                     Sell
                </div>
            </router-link>
            <router-link to="account">
                <div :class="['py-1 px-4 rounded-md', 
                             selectedTab === 'account' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('account')"
                >
                     Account
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
        
    },
    created: function() {
        this.$router.replace({path: '/'})
    }
};
</script>