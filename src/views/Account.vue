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
    <div class="border-b pb-2">
      <p class="text-2xl pt-4 pb-8 md:pt-8">My Listings</p>
      <div class="flex items-center overflow-x-auto">
        <div class="flex flex-nowrap pb-4">
          <template v-for="listing in myListings" :key="listing.id">
            <ListingCard 
                :address="listing.address"
                :dollarsPerMonth="listing.price" 
                :numOfBeds="listing.bedrooms"
                :numOfBaths="listing.bathrooms"
                :roomType="listing.roomType"
                :image="listing.images[0]"
                :hideHeart="hideHeart(listing.ownerID)"
                class="mr-4 w-72 md:w-96"
                @isClick="handleListingClick(listing)"/>
        </template>
        </div>
      </div>
    </div>
    <div>
      <p class="text-2xl pt-4 pb-8 md:pt-8">Saved Listings</p>
      <div class="flex items-center overflow-x-auto">
        <div class="flex flex-nowrap pb-4">
          <template v-for="listing in savedListings" :key="listing.id">
            <ListingCard 
                :address="listing.address"
                :dollarsPerMonth="listing.price" 
                :numOfBeds="listing.bedrooms"
                :numOfBaths="listing.bathrooms"
                :roomType="listing.roomType"
                :image="listing.images[0]"
                :isHearted="isHearted(listing.id)"
                class="mr-4 w-72 md:w-96"
                @heartClick="handleHeartClick(listing)"
                @isClick="handleListingClick(listing)"/>
        </template>
        </div>
      </div>
    </div>

    <Popup
        v-show="showListingPopup"
        :popupTitle="selectedListing.address ?? ''"
        @close="showListingPopup = false"
    >
        <div>
            Test message
        </div>
    </Popup>

  </div>
</template>

<script>
import FormGridLabel from "@/components/FormGridLabel.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import ListingCard from "@/components/ListingCard.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import Popup from "@/components/Popup.vue";
import {updateAuthUser, uploadProfilePic, addListingToSavedListings, removeListingFromSavedListings} from "@/firebase.js";
export default {
    name: "Account",
    components: {
      FormGridLabel,
      TextInput,
      Button,
      ListingCard,
      LoadingIcon,
      Popup
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
            isLoading: false,
            showListingPopup: false,
            selectedListing: {}
        }
    },
    methods: {
        handleImage: async function(event) {
          if (event.target.files.length > 0) {
            this.isLoading = true;
            const image = event.target.files[0];
            this.imageURL = await uploadProfilePic(image);
            this.updateUserDetails();
          }
        },
        handleUpdateDetails: function() {
          if (!this.allDisabled) {
            this.isLoading = true;
            this.updateUserDetails();
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
          await updateAuthUser(user);
          this.$store.commit('setUser', user);
          this.isLoading = false;
        },
        handleListingClick: function(listing) {
            this.showListingPopup = true;
            this.selectedListing = listing;
        },
        handleHeartClick: async function(listing) {
            if (this.isHearted(listing.id)) {
                this.$store.commit('removeSavedListing', listing);
                await removeListingFromSavedListings(this.userID, listing.id);
            }
            else {
                this.$store.commit('addSavedListing', listing);
                await addListingToSavedListings(this.userID, listing.id);
            }
        },
        isHearted: function(listingID) {
            let isSaved = false;
            for (var listing of this.savedListings) {
                if (listing.id === listingID) {
                    isSaved = true;
                }
            }
            return isSaved;
        },
        hideHeart: function(listingOwnerID) {
          return listingOwnerID === this.userID;
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
        },
        savedListings: function() {
          return this.$store.state.savedListings;
        },
        userID: function() {
            return this.$store.state.userID;
        },
        myListings: function() {
          return this.$store.state.myListings;
        }
    }, 
    created: async function() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.phoneNumber = this.user.phoneNumber;
      this.email = this.user.email;
      this.imageURL = this.user.photoURL;
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