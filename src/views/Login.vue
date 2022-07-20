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
                    <TextInput type="email" @update="handleEmail"/>
                    <FormGridLabel text="Password" class="pt-8"/>
                    <TextInput type="password" class="pt-8" @update="handlePassword"/>
                    <div></div>
                    <TextInput type="password" placeholder="Confirm Password" @update="handlePasswordConfirmation"/>
                    <div class="col-span-2 grid justify-items-center text-sm text-gray-400">
                        <p>(Password must be at least 5 characters)</p>
                    </div>
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
import {registerUser, loginUser} from "@/firebase.js";
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
            },
            confirmPassword: ""
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
        handlePasswordConfirmation: function(password) {
            this.confirmPassword = password;
        },
        createAccount: async function() {
            if (this.hasValidSignupInfo) {
                await registerUser(this.newUser.email, this.newUser.password, (this.newUser.firstName + " " + this.newUser.lastName));
            }
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
            await loginUser(this.loginInfo.email, this.loginInfo.password);
            // this.$store.commit('setUser', this.loginInfo);
            // this.$store.commit('setLoggedIn');
            // this.$router.replace({name: "Home"});
        }
    },
    computed: {
        hasValidSignupInfo: function() {
            if (!/^[a-zA-Z]+$/.test(this.newUser.firstName)) {
                console.log("wrong first name")
                return false;
            }
            else if (!/^[a-zA-Z]+$/.test(this.newUser.lastName)) {
                console.log("wrong last name")
                return false;
            }
            else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.newUser.email)) {
                console.log("wrong email")
                return false;
            }
            else if (this.newUser.password != this.confirmPassword) {
                return false;
            }
            else if (this.newUser.password.length < 5 || this.confirmPassword.length < 5) {
                return false;
            }
            else {
                return true;
            }
        }
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: minmax(min-content, auto) minmax(min-content, auto);
  }
</style>