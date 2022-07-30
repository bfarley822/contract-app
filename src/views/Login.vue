<template>
    <div class="h-full">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="border-b md:border-b-0 md:border-r border-gray-300 md:py-24">
                <p class="text-2xl py-4 flex justify-center">Login</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="Email"/>
                    <TextInput type="email" @update="handleLoginEmail"/>
                    <FormGridLabel text="Password"/>
                    <TextInput type="password" @update="handleLoginPassword"/>
                </div>
                <div class="grid justify-items-center pt-8 pb-4">
                    <Button text="Login" backgroundColor="blue-700" @isClick="login"/>
                </div>
                <div class="flex justify-center text-gray-400 pb-16 md:pb-0">
                    <div>
                        <p>Don't have an account? Signup for one.</p>
                        <!-- <p class="cursor-pointer text-blue-700 pt-2" @click="handlePasswordReset">Forgot your password? Click here to reset it.</p>
                        <p v-if="showResetLinkText" class="text-gray-700">Reset link was sent to: <b>{{loginInfo.email}}</b></p> -->
                    </div>
                </div>
            </div>
            <div class="md:py-16">
                <p class="text-2xl py-4 flex justify-center">Signup</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="First Name"/>
                    <TextInput :error="firstNameError" @update="handleFirstName"/>
                    <FormGridLabel text="Last Name"/>
                    <TextInput :error="lastNameError" @update="handleLastName"/>
                    <FormGridLabel text="Email"/>
                    <TextInput :error="emailError" type="email" @update="handleEmail"/>
                    <FormGridLabel text="Password" class="pt-8"/>
                    <TextInput :error="passwordMatchError || passwordError" type="password" class="pt-8" @update="handlePassword"/>
                    <div></div>
                    <TextInput :error="passwordMatchError" type="password" placeholder="Confirm Password" @update="handlePasswordConfirmation"/>
                    <div class="col-span-2 grid justify-items-center text-sm text-gray-400">
                        <p>*Password must be at least 8 characters with:</p>
                        <div>
                            <p>- one uppercase</p>
                            <p>- one lowercase</p>
                            <p>- one number</p>
                            <p>- one special character</p>
                        </div>
                    </div>
                </div>
                <div class="grid justify-items-center py-8">
                    <Button text="Create Account" backgroundColor="blue-700" @isClick="createAccount"/>
                </div>
            </div>
        </div>
        <Announcement 
            v-if="showAnnouncement" 
            :message="announcementMessage" 
            :yScroll="yScroll"
            @close="showAnnouncement = false"
        />
        <LoadingIcon v-if="isLoading"/>
    </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
import Announcement from "@/components/Announcement.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import {registerUser, loginUser, resetPassword, getUserID, getAllSavedListings, getAllMyListings} from "@/firebase.js";
export default {
    name: "Login",
    components: {
        TextInput,
        Button,
        FormGridLabel,
        Announcement,
        LoadingIcon
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
            confirmPassword: "",
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            passwordError: false,
            passwordMatchError: false,
            showAnnouncement: false,
            announcementMessage: "",
            showResetLinkText: false,
            isLoading: false,
            yScroll: 0
        }
    },
    watch: {
        
    },
    methods: {
        handleFirstName: function(firstName) {
            this.newUser.firstName = firstName;
            this.firstNameError = false;
        },
        handleLastName: function(lastName) {
            this.newUser.lastName = lastName;
            this.lastNameError = false;
        },
        handleEmail: function(email) {
            this.newUser.email = email;
            this.emailError = false;
        },
        handlePassword: function(password) {
            this.newUser.password = password;
            this.passwordError = false;
        },
        handlePasswordConfirmation: function(password) {
            this.confirmPassword = password;
            this.passwordError = false;
        },
        createAccount: async function() {
            if (this.hasValidSignupInfo()) {
                this.isLoading = true;
                this.showAnnouncement = false;
                const errorMessage = await registerUser(this.newUser.email, this.newUser.password, this.newUser.firstName, this.newUser.lastName);
                if (errorMessage != "") {
                    this.announcementMessage = errorMessage;
                    this.showAnnouncement = true;
                    this.isLoading = false;
                }
                else {
                    delete this.newUser.password;
                    this.loginTheUser(this.newUser);
                }
            }
        },
        handleLoginEmail: function(email) {
            this.loginInfo.email = email;
            this.showResetLinkText = false;
        },
        handleLoginPassword: function(password) {
            this.loginInfo.password = password;
        },
        login: async function() {
            this.isLoading = true;
            const data = await loginUser(this.loginInfo.email, this.loginInfo.password);
            if (data.displayName) {
                const user = {
                    firstName: data.displayName.substr(0, data.displayName.indexOf(' ')),
                    lastName: data.displayName.substr(data.displayName.indexOf(' ') + 1, data.displayName.length - 1),
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    photoURL: data.photoURL
                }
                this.loginTheUser(user);
            } 
            else {
                this.announcementMessage = data;
                this.showAnnouncement = true;

                this.firstNameError = false;
                this.lastNameError = false;
                this.emailError = false;
                this.passwordError = false;
                this.passwordMatchError = false;

                this.isLoading = false;
            }
        },
        hasValidSignupInfo: function() {
            this.firstNameError = false;
            this.lastNameError = false;
            this.emailError = false;
            this.passwordError = false;
            this.passwordMatchError = false;

            if (!/^[a-zA-Z]+$/.test(this.newUser.firstName)) {
                this.firstNameError = true;
                this.showAnnouncement = true;
                this.getAnnouncementMessage();
                return false;
            }
            else if (!/^[a-zA-Z]+$/.test(this.newUser.lastName)) {
                this.lastNameError = true;
                this.showAnnouncement = true;
                this.getAnnouncementMessage();
                return false;
            }
            else if (!this.isValidEmail(this.newUser.email)) {
                this.emailError = true;
                this.showAnnouncement = true;
                this.getAnnouncementMessage();
                return false;
            }
            else if (this.newUser.password != this.confirmPassword) {
                this.passwordError = true;
                this.passwordMatchError = true;
                this.showAnnouncement = true;
                this.getAnnouncementMessage();
                return false;
            }
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.newUser.password)) {
                this.passwordError = true;
                this.showAnnouncement = true;
                this.getAnnouncementMessage();
                return false;
            }
            else {
                this.getAnnouncementMessage();
                return true;
            }
        },
        getAnnouncementMessage: function() {
            if (this.firstNameError) {
                this.announcementMessage = "First Name cannot be blank and must only contain letters.";
            }
            else if (this.lastNameError) {
                this.announcementMessage = "Last Name cannot be blank and must only contain letters.";
            }
            else if (this.emailError) {
                this.announcementMessage = "Email must be in the correct format.";
            }
            else if (this.passwordMatchError) {
                this.announcementMessage = "The passwords do not match.";
            }
            else if (this.passwordError) {
                this.announcementMessage = "Password doesn't fit the requirements."
            }
            else {
                this.showAnnouncement = false;
                this.announcementMessage = "Error";
            }
        },
        loginTheUser: async function(user) {
            this.$store.commit('setUser', user);
            this.$store.commit('setLoggedIn');

            const userID = await getUserID(user.email);
            this.$store.commit('setUserID', userID);
            const savedListings = await getAllSavedListings(userID);
            this.$store.commit('setSavedListings', savedListings);
            const myListings = await getAllMyListings(userID);
            this.$store.commit('setMyListings', myListings);

            this.isLoading = false;
            this.$store.commit('setCurrTab', 'account');
            this.$router.replace({name: "Account"});
        },
        handlePasswordReset: async function() {
            if (this.isValidEmail(this.loginInfo.email)) {
                this.showAnnouncement = false;
                await resetPassword(this.loginInfo.email);
                this.showResetLinkText = true;
            }
            else {
                this.announcementMessage = "Please enter a valid email to send the reset link to.";
                this.showAnnouncement = true;
            }
        },
        isValidEmail: function(email) {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                return true;
            }
            else {
                return false;
            }
        },
        handleScroll: function(event) {
          this.yScroll = event.path[1].scrollY;
        }
    },
    computed: {
        
    },
    created: async function() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted: function() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: minmax(min-content, auto) minmax(min-content, auto);
  }
</style>