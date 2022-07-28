<template>
    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="">
            <div class="grid grid-cols-1 items-center pl-8">
                <FormGridLabel text="Address Line 1" :required="true" alignment="start"/>
                <TextInput :error="addr1Error" :text="addressL1" @update="handleAL1" class="pb-2"/>
                <FormGridLabel text="Address Line 2" alignment="start"/>
                <TextInput :text="addressL2" @update="handleAL2" class="pb-2"/>
                <FormGridLabel text="City" :required="true" alignment="start"/>
                <TextInput :text="city" :error="cityError" @update="handleCity" class="pb-2"/>
                <FormGridLabel text="State" :required="true" alignment="start"/>
                <TextInput :text="state" :error="stateError" @update="handleState" class="pb-2"/>
                <FormGridLabel text="Zip Code" :required="true" alignment="start"/>
                <NumberInput :text="zipCode" :error="zipError" max="99999" @update="handleZipCode"/>
                <FormGridLabel text="Price" :required="true" class="pt-8" alignment="start"/>
                <NumberInput :text="price" :error="priceError" max="5000" @update="handlePrice" class="pb-2"/>
                <FormGridLabel text="# of Bedrooms" :required="true" alignment="start"/>
                <NumberInput :text="numBeds" :error="bedroomError" max="9" @update="handleNumBedrooms" class="pb-2"/>
                <FormGridLabel text="# of Bathrooms" :required="true" alignment="start"/>
                <NumberInput :text="numBaths" :error="bathroomError" max="9" @update="handleNumBathrooms" class="pb-2"/>
                <FormGridLabel text="Room Type" :required="true" alignment="start"/>
                <RadioList :options="roomTypeOptions" @update="handleRoomType" class="pb-6"/>
            </div>     
        </div>
        <div class=" flex flex-col items-center pt-4 pb-8">
            <div class="pb-4">
                <input type="file" ref="fileInput2" name="file2" id="file2" accept="image/png, image/jpeg" multiple @change="handleFiles" class="hidden"/>
                <label for="file2" class="cursor-pointer border border-gray-300 rounded py-1 px-4 text-lg bg-gray-200 text-gray-700 hover:opacity-80">Select Images</label>
            </div>
            <div class="border w-full h-full bg-white">
                <div v-if="images.length === 0" class="grid place-content-center customHeight">
                    <p class="text-gray-300">No images</p>
                </div>
                <div v-else class="p-4 grid grid-cols-1 justify-items-center gap-2 w-full customHeight overflow-y-auto">
                    <template v-for="image in images" :key="image">
                        <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${image})`}"></div>
                    </template>
                </div>
            </div>
        </div>

        <LoadingIcon v-if="isLoading"/>
    </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
import RadioList from "@/components/RadioList.vue";
import NumberInput from "@/components/NumberInput.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
export default {
    name: "EditListingView",
    components: {
        TextInput,
        FormGridLabel,
        RadioList,
        NumberInput,
        LoadingIcon,
    },  
    props: {
        listing: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            isLoading: false,
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
            // if (this.hasValidInput()) {
            //     this.isLoading = true;
            //     let imageURLs = [];
            //     for (const image of this.files) {
            //         //const url = await uploadImage(image);
            //         imageURLs.push(url);
            //     }
            //     const listing = {
            //         address: this.combinedAddress,
            //         bathrooms: this.numBaths,
            //         bedrooms: this.numBeds,
            //         images: imageURLs,
            //         price: this.price,
            //         roomType: this.roomType,
            //         address1: this.addressL1,
            //         address2: this.addressL2,
            //         city: this.city,
            //         state: this.state,
            //         zipCode: this.zipCode
            //     }
            //     // const newListing = await createListing(listing);
            //     // await addListingToMyListings(this.userID, newListing.id);
            //     this.isLoading = false;
            // }
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
    },
    computed: {
        roomTypeString: function() {
            return this.listing.roomType ? this.listing.roomType.charAt(0).toUpperCase() + this.listing.roomType.slice(1) : "";
        },
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
        },
    },
    created: function() {
        this.roomType = this.listing.roomType;
        this.numBaths = this.listing.bathrooms;
        this.numBeds = this.listing.bedrooms;
        this.price = this.listing.price;
        this.zipCode = this.listing.zipCode;
        this.state = this.listing.state;
        this.city = this.listing.city;
        this.addressL2 = this.listing.address2;
        this.addressL1 = this.listing.address1;
        this.images = this.listing.images;
    }
};
</script>

<style scoped>
.formGridStyle {
    grid-template-columns: 40% 60%;
}
.customHeight {
    height: 32rem;
}
.imagePreviewWrapper {
    width: 100%;
    height: 256px;
    object-fit: cover;
    background-size: cover;
    background-position: center center;
}
</style>