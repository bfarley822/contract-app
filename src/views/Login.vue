<template>
    <div class="h-full">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="border-b md:border-b-0 md:border-r border-gray-300 md:py-24">
                <p class="text-2xl py-4 flex justify-center">Login</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="Email"/>
                    <TextInput @update="handleLoginEmail"/>
                    <FormGridLabel text="Password"/>
                    <TextInput @update="handleLoginPassword"/>
                </div>
                <div class="grid justify-items-center pt-8 pb-4">
                    <Button text="Login" backgroundColor="blue-700" @isClick="login"/>
                </div>
                <div class="flex justify-center text-gray-400 pb-16 md:pb-0">
                    <p>Don't have an account? Signup for one</p>
                </div>
            </div>
            <div class="md:py-16">
                <p class="text-2xl py-4 flex justify-center">Signup</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="First Name"/>
                    <TextInput @update="handleFirstName"/>
                    <FormGridLabel text="Last Name"/>
                    <TextInput @update="handleLastName"/>
                    <FormGridLabel text="Email"/>
                    <TextInput @update="handleEmail"/>
                    <FormGridLabel text="Password" class="pt-8"/>
                    <TextInput class="pt-8" @update="handlePassword"/>
                    <FormGridLabel text="Confirm Pass"/>
                    <TextInput/>
                </div>
                <div class="grid justify-items-center py-8">
                    <Button text="Create Account" backgroundColor="blue-700" @isClick="createAccount"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
export default {
    name: "Login",
    components: {
        TextInput,
        Button,
        FormGridLabel
    },  
    props: {
        
    },
    data: function() {
        return {
            newUser: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            loginInfo: {
                email: "",
                password: ""
            }
        }
    },
    watch: {
        
    },
    methods: {
        handleFirstName: function(firstName) {
            this.newUser.firstName = firstName;
        },
        handleLastName: function(lastName) {
            this.newUser.lastName = lastName;
        },
        handleEmail: function(email) {
            this.newUser.email = email;
        },
        handlePassword: function(password) {
            this.newUser.password = password;
        },
        createAccount: async function() {
            //createUserWithEmailAndPassword(getAuth(), this.newUser.email, this.newUser.password)
            // await createAuthenticatedUser(this.newUser.email, this.newUser.password);
            // this.$store.commit('setUser', this.newUser);
            // this.$store.commit('setLoggedIn');
            // this.$router.replace({name: "Home"});
        },
        handleLoginEmail: function(email) {
            this.loginInfo.email = email;
        },
        handleLoginPassword: function(password) {
            this.loginInfo.password = password;
        },
        login: async function() {
            // await loginUser(this.loginInfo.email, this.loginInfo.password);
            // this.$store.commit('setUser', this.loginInfo);
            // this.$store.commit('setLoggedIn');
            // this.$router.replace({name: "Home"});
        }
    },
    computed: {
        
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: minmax(min-content, auto) minmax(min-content, auto);
  }
</style>