<template>
  <div class="pt-4">
    <div class="grid md:grid-cols-2 gap-4 md:gap-8 border-b">
      <div class="grid justify-items-center md:justify-self-end">
        <p class="text-2xl flex justify-center md:justify-end pb-4 md:mr-1 md:hidden">Account Details</p>
        <img v-if="userImage" class="object-cover w-80 h-80" :src="userImage">
        <div v-else :class="['object-cover w-80 h-80 border grid place-content-center', 'bg-[#F6F7F7]']">
          <p class="text-gray-300">No profile picture</p>
        </div>
        <input type="file" name="file" id="file" accept="image/png, image/jpeg" @change="handleImage" class="hidden"/>
        <label for="file" :class="['md:mb-8 cursor-pointer border border-gray-300 rounded py-1 px-4 text-lg bg-gray-200 text-gray-700 hover:opacity-80 mt-4']">Change Picture</label>
        <LoadingIcon v-if="isLoading"/>
      </div>
      <div class="flex flex-col justify-between md:justify-self-start">
        <div class="hidden md:block">
          <p class="text-2xl flex justify-center md:justify-end pb-4 md:mr-4">Account Details</p>
        </div>
        <div class="grid gri-cols-2 gap-2 items-center formGridStyle">
          <FormGridLabel text="First Name"/>
          <TextInput :disabled="allDisabled" :text="firstName" @update="handleFirstName"/>
          <FormGridLabel text="Last Name"/>
          <TextInput :disabled="allDisabled" :text="lastName" @update="handleLastName"/>
          <FormGridLabel text="Phone Number"/>
          <TextInput :disabled="true" :text="phoneNumber" @update="handlePhoneNumber"/>
          <FormGridLabel text="Email"/>
          <TextInput type="email" :disabled="true" :text="email" @update="handleEmail"/>
        </div>
        <Button :text="buttonText" backgroundColor="blue-700" class="flex justify-center md:justify-end py-8 md:mr-6" @isClick="handleUpdateDetails"/>
      </div>
    </div>
    <div>
      <p class="text-2xl pt-4 pb-8 md:pt-8">My Listings</p>
      <div class="flex items-center overflow-x-auto">
        <div class="flex flex-nowrap pb-4">
          <template v-for="listing in listings" :key="listing.id">
            <ListingCard 
                :address="listing.address"
                :dollarsPerMonth="listing.price" 
                :numOfBeds="listing.bedrooms"
                :numOfBaths="listing.bathrooms"
                :roomType="listing.roomType"
                :image="listing.image"
                class="mr-4 w-72 md:w-96"/>
        </template>
        </div>
      </div>
    </div>
    <div>
      <p class="text-2xl pt-4 pb-8 md:pt-8">Saved Listings</p>
      <div class="flex items-center overflow-x-auto">
        <div class="flex flex-nowrap pb-4">
          <template v-for="listing in listings" :key="listing.id">
            <ListingCard 
                :address="listing.address"
                :dollarsPerMonth="listing.price" 
                :numOfBeds="listing.bedrooms"
                :numOfBaths="listing.bathrooms"
                :roomType="listing.roomType"
                :image="listing.image"
                class="mr-4 w-72 md:w-96"/>
        </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormGridLabel from "@/components/FormGridLabel.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import ListingCard from "@/components/ListingCard.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import {updateUser, uploadImage} from "@/firebase.js";
export default {
    name: "Account",
    components: {
      FormGridLabel,
      TextInput,
      Button,
      ListingCard,
      LoadingIcon
},  
    props: {
        
    },
    data: function() {
        return {
            imageURL: "",
            allDisabled: true,
            listings: [],
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            isLoading: true
        }
    },
    methods: {
        handleImage: async function(event) {
          this.isLoading = true;
          const image = event.target.files[0];
          this.imageURL = await uploadImage(image);
          this.updateUserDetails();
          this.isLoading = false;
        },
        handleUpdateDetails: function() {
          if (!this.allDisabled) {
            this.isLoading = true;
            this.updateUserDetails();
            this.isLoading = false;
          }
          this.allDisabled = !this.allDisabled;
        },
        handleFirstName: function(value) {
          this.firstName = value;
        },
        handleLastName: function(value) {
          this.lastName = value;
        },
        handlePhoneNumber: function(value) {
          this.phoneNumber = value;
        },
        handleEmail: function(value) {
          this.email = value;
        },
        updateUserDetails: async function() {
          const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            photoURL: this.imageURL
          }
          await updateUser(user);
          this.$store.commit('setUser', user);
        }
    },
    computed: {
        buttonText: function() {
          return this.allDisabled ? 'Update Details' : 'Save Changes';
        },
        user: function() {
          return this.$store.state.user;
        },
        userImage: function() {
          return this.user.photoURL;
        }
    }, 
    created: function() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.phoneNumber = this.user.phoneNumber;
      this.email = this.user.email;
      this.imageURL = this.user.photoURL;
      
        this.listings = [
            {
                id: "0",
                address: "240 E 600 N Apt. 2 Provo, UT 84606",
                price: "780",
                bedrooms: "2",
                bathrooms: "1",
                roomType: "Shared",
                image: "contract-handshake.jpg"
            },
            {
                id: "1",
                address: "240 N 600 E Apt. 4 Provo, UT 84606",
                price: "1,000",
                bedrooms: "3",
                bathrooms: "1.5",
                roomType: "Private",
                image: "fake-house.jpg"
            },
            {
                id: "2",
                address: "240 E 600 N Apt. 2 Provo, UT 84606",
                price: "780",
                bedrooms: "2",
                bathrooms: "1",
                roomType: "Shared",
                image: "contract-handshake.jpg"
            },
            {
                id: "3",
                address: "240 N 600 E Apt. 4 Provo, UT 84606",
                price: "1,000",
                bedrooms: "3",
                bathrooms: "1.5",
                roomType: "Private",
                image: "fake-house.jpg"
            }
        ]
    }
};
</script>

<style scoped>
.gridStyle {
  grid-template-columns: minmax(320px, 320px) 50% 50%
}
.formGridStyle {
  grid-template-columns: 37% 60%;
}
</style>