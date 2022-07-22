<template>
    <!-- class="sticky top-0 z-50" -->
  <header> 
    <div class="w-full flex justify-between py-2 px-4 bg-gray-700">
        <router-link to="/">
            <div class="flex items-center text-white text-4xl" @click="updateSelection('home')">
                <img src="@/assets/handshake.png" class="w-16 pr-4">
                CONTRAX
            </div>
        </router-link>
        <div class="text-white flex items-center text-lg">
            <router-link to="/">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             currTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']" 
                     @click="updateSelection('home')"
                >
                     Home
                </div>
            </router-link>
            <router-link to="buy">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             currTab === 'buy' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('buy')"
                >
                     Buy
                </div>
            </router-link>
            <router-link to="sell">
                <div :class="['py-1 px-4 mr-2 rounded-md hidden md:block', 
                             currTab === 'sell' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('sell')"
                >
                     Sell
                </div>
            </router-link>
            <router-link to="account" v-if="$store.state.isLoggedIn">
                <div :class="['py-1 px-4 rounded-md hidden md:block', 
                             currTab === 'account' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('account')"
                >
                Account
                </div>
            </router-link>
            <router-link to="login" v-if="!$store.state.isLoggedIn">
                <div :class="['py-1 px-4 rounded-md hidden md:block', 
                             currTab === 'login' ? 'bg-white text-gray-700' : 'hover:bg-gray-500 hover:text-gray-400']"
                     @click="updateSelection('login')"
                >
                     Login
                </div>
            </router-link>
            <div v-if="$store.state.isLoggedIn" class="pl-2 hidden md:block">
                <img class="object-cover w-9 h-9 rounded-full" :src="require(`@/assets/contract-handshake.jpg`)">
            </div>



            <div class="block md:hidden pr-4">
                <div class="text-2xl relative">
                    <i class="fa-solid fa-bars cursor-pointer" @click="toggle"></i>
                </div>
                <div v-if="isShown" class="absolute top-12 right-10 bg-gray-500 select-none z-40">
                    <div class="p-4 grid grid-cols-1 gap-y-2 justify-items-center">
                        <router-link to="/">
                            <div>
                                <div :class="['py-1 px-4 rounded-md', 
                                        currTab === 'home' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']" 
                                    @click="updateSelection('home')"
                                >
                                    Home
                                </div>
                            </div>
                        </router-link>
                        <router-link to="buy">
                            <div>
                                <div :class="['py-1 px-4 rounded-md', 
                                        currTab === 'buy' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                    @click="updateSelection('buy')"
                                >
                                    Buy
                                </div>
                            </div>
                        </router-link>
                        <router-link to="sell">
                            <div class="border-b pb-2">
                                <div :class="['py-1 px-4 rounded-md', 
                                            currTab === 'sell' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                    @click="updateSelection('sell')"
                                >
                                    Sell
                                </div>
                            </div>
                        </router-link>
                        <router-link to="account" v-if="$store.state.isLoggedIn">
                            <div>
                                <div :class="['py-1 px-4 rounded-md', 
                                            currTab === 'account' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                    @click="updateSelection('account')"
                                >
                                    Account
                                </div>
                            </div>
                        </router-link>
                        <router-link to="login" v-if="!$store.state.isLoggedIn">
                            <div>
                                <div :class="['py-1 px-4 rounded-md', 
                                            currTab === 'login' ? 'bg-white text-gray-700' : 'hover:bg-gray-400 hover:text-gray-300']"
                                    @click="updateSelection('login')"
                                >
                                    Login
                                </div>
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
            isShown: false
        }
    },
    methods: {
        updateSelection: function(selection) {
            this.isShown = false;
            this.$store.commit('setCurrTab', selection);
        },
        toggle: function() {
            this.isShown = !this.isShown;
        },
    },
    computed: {
        currTab: function() {
            return this.$store.state.currTab;
        }
    },
    created: function() {
        this.$router.replace({path: '/'});
    }
};
</script>