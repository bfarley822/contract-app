<template>
  <div>
    <p class="text-3xl w-full border-b font-medium flex justify-center md:justify-start">Create Listing</p>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="lg:border-r border-b p-4">
        <p class="text-2xl pb-4 flex justify-center">Add Details</p>
        <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
          <FormGridLabel text="Address Line 1" :required="true"/>
          <TextInput :error="addr1Error" :text="addressL1" @update="handleAL1"/>
          <FormGridLabel text="Address Line 2"/>
          <TextInput :text="addressL2" @update="handleAL2"/>
          <FormGridLabel text="City" :required="true"/>
          <TextInput :text="city" :error="cityError" @update="handleCity"/>
          <FormGridLabel text="State" :required="true"/>
          <TextInput :text="state" :error="stateError" @update="handleState"/>
          <FormGridLabel text="Zip Code" :required="true"/>
          <NumberInput :text="zipCode" :error="zipError" max="99999" @update="handleZipCode"/>
          <FormGridLabel text="Price" :required="true" class="pt-8"/>
          <NumberInput :text="price" :error="priceError" max="5000" @update="handlePrice" class="pt-8"/>
          <FormGridLabel text="# of Bedrooms" :required="true"/>
          <NumberInput :text="numBeds" :error="bedroomError" max="9" @update="handleNumBedrooms"/>
          <FormGridLabel text="# of Bathrooms" :required="true"/>
          <NumberInput :text="numBaths" :error="bathroomError" max="9" @update="handleNumBathrooms"/>
          <FormGridLabel text="Room Type" :required="true"/>
          <RadioList :options="roomTypeOptions" @update="handleRoomType"/>
        </div>     
      </div>
      <div class="grid justify-items-center border-b pt-4 pb-8 pl-4">
        <p class="text-2xl pb-4">Upload Images</p>
        <input type="file" ref="fileInput" name="file" id="file" accept="image/png, image/jpeg" multiple @change="handleFiles" class="hidden"/>
        <label for="file" class="mb-4 cursor-pointer border border-gray-300 rounded py-1 px-4 text-lg bg-gray-200 text-gray-700 hover:opacity-80">Select Images</label>
        <div class="border w-full h-full bg-white">
          <div v-if="images.length === 0" class="grid place-content-center customHeight">
            <p class="text-gray-300">No images</p>
          </div>
          <div v-else class="p-4 grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-2 w-full customHeight overflow-y-auto">
            <template v-for="image in images" :key="image">
              <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${image})`}"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="grid justify-items-center pt-4">
      <Button text="Submit" backgroundColor="blue-700" @isClick="handleListingSubmit"/>
    </div>

    <Announcement  
      v-if="showAnnouncement" 
      :message="announcementMessage" 
      @close="showAnnouncement = false"
    />

    <LoadingIcon v-if="isLoading"/>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
import RadioList from "@/components/RadioList.vue";
import NumberInput from "@/components/NumberInput.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import Announcement from "@/components/Announcement.vue";
import {createListing, uploadImage, addListingToMyListings} from "@/firebase.js";
export default {
    name: "Sell",
    components: {
        TextInput,
        Button,
        FormGridLabel,
        RadioList,
        NumberInput,
        LoadingIcon,
        Announcement
    },  
    props: {
        
    },
    data: function() {
        return {
            roomType: "",
            numBaths: "",
            numBeds: "",
            price: "",
            zipCode: "",
            state: "",
            city: "",
            addressL2: "",
            addressL1: "",
            images: [],
            isLoading: false,
            showAnnouncement: false,
            announcementMessage: "",
            addr1Error: false,
            cityError: false,
            stateError: false,
            zipError: false,
            priceError: false,
            bedroomError: false,
            bathroomError: false,
            imageError: false,
            files: []
        }
    },
    methods: {
        handleRoomType: function(value) {
          this.roomType = value;
        },
        handleNumBathrooms: function(value) {
          this.numBaths = value;
          if (this.bathroomError) {
            this.showAnnouncement = false;
          }
          this.bathroomError = false;
        },
        handleNumBedrooms: function(value) {
          this.numBeds = value;
          if (this.bedroomError) {
            this.showAnnouncement = false;
          }
          this.bedroomError = false;
        },
        handlePrice: function(value) {
          this.price = value;
          if (this.price) {
            this.showAnnouncement = false;
          }
          this.priceError = false;
        },
        handleZipCode: function(value) {
          this.zipCode = value;
          if (this.zipError) {
            this.showAnnouncement = false;
          }
          this.zipError = false;
        },
        handleState: function(value) {
          this.state = value;
          if (this.stateError) {
            this.showAnnouncement = false;
          }
          this.stateError = false;
        },
        handleCity: function(value) {
          this.city = value;
          if (this.cityError) {
            this.showAnnouncement = false;
          }
          this.cityError = false;
        },
        handleAL2: function(value) {
          this.addressL2 = value;
        },
        handleAL1: function(value) {
          this.addressL1 = value;
          if (this.addr1Error) {
            this.showAnnouncement = false;
          }
          this.addr1Error = false;
        },
        handleFiles: function(event) {
          let files = event.target.files;
          if (files.length > 0) {
            if (this.imageError) {
              this.showAnnouncement = false;
            }
            this.images = [];
            this.files = [];
            for (const file of files) {
              let reader = new FileReader;
              reader.onload = e => {
                this.images.push(e.target.result);
              }
              reader.readAsDataURL(file)
            }
            this.files = files;
          }
        },
        handleListingSubmit: async function() {
          if (this.$store.state.isLoggedIn) {
            if (this.hasValidInput()) {
              this.isLoading = true;
              let imageURLs = [];
              for (const image of this.files) {
                const url = await uploadImage(image);
                imageURLs.push(url);
              }
              const listing = {
                address: this.combinedAddress,
                bathrooms: this.numBaths,
                bedrooms: this.numBeds,
                images: imageURLs,
                price: this.price,
                roomType: this.roomType
              }
              const newListing = await createListing(listing);
              await addListingToMyListings(this.userID, newListing.id);
              this.isLoading = false;
              this.$store.commit('setCurrTab', 'account');
              this.$router.replace({name: "Account"});
              //this.clearPageData(); 
            }
          }
          else {
            this.announcementMessage = "You must be logged in first in order to create a listing."
            this.showAnnouncement = true;
          }
        },
        hasValidInput: function() {
          this.showAnnouncement = false;
          this.addr1Error = false;
          this.stateError = false;
          this.cityError = false;
          this.zipError = false;
          this.priceError = false;
          this.bedroomError = false;
          this.bathroomError = false;

          if (this.addressL1.length == 0) {
            this.announcementMessage = "Address Line 1 is required";
            this.showAnnouncement = true;
            this.addr1Error = true;
            return false;
          }
          else if (this.city.length == 0) {
            this.announcementMessage = "City is required";
            this.showAnnouncement = true;
            this.cityError = true;
            return false;
          }
          else if (this.state.length == 0) {
            this.announcementMessage = "State is required";
            this.showAnnouncement = true;
            this.stateError = true;
            return false;
          }
          else if (this.zipCode.length != 5) {
            this.announcementMessage = "Must be a valid Zip Code";
            this.showAnnouncement = true;
            this.zipError = true;
            return false;
          }
          else if (this.price.length == 0) {
            this.announcementMessage = "Price is required";
            this.showAnnouncement = true;
            this.priceError = true;
            return false;
          }
          else if (this.numBeds.length == 0) {
            this.announcementMessage = "# of Bedrooms is required";
            this.showAnnouncement = true;
            this.bedroomError = true;
            return false;
          }
          else if (this.numBaths.length == 0) {
            this.announcementMessage = "# of Bathrooms is required";
            this.showAnnouncement = true;
            this.bathroomError = true;
            return false;
          }
          else if (this.roomType.length == 0) {
            this.announcementMessage = "Room Type is required";
            this.showAnnouncement = true;
            return false;
          }
          else if (this.images.length == 0) {
            this.announcementMessage = "You must submit at least one image";
            this.showAnnouncement = true;
            this.imageError = true;
            return false;
          }
          else {
            return true;
          }
        },
        clearPageData: function() {
          this.roomType = "";
          this.numBaths = "";
          this.numBeds = "";
          this.price = "";
          this.zipCode = "";
          this.state = "";
          this.city = "";
          this.addressL2 = "";
          this.addressL1 = "";
          this.images = [];
        }
    },
    computed: {
        roomTypeOptions: function() {
          return [
            {
              text: "Private",
              value: "private"
            },
            {
              text: "Shared",
              value: "shared"
            }
          ]
        },
        combinedAddress: function() {
          return this.addressL1 + " " + this.addressL2 + " " + this.city + ", " + this.state + " " + this.zipCode;
        },
        userID: function() {
          return this.$store.state.userID;
        }
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: 40% 60%;
  }
  .customHeight {
    height: 36rem;
  }
  .imagePreviewWrapper {
      width: 100%;
      height: 256px;
      object-fit: cover;
      background-size: cover;
      background-position: center center;
  }
</style>