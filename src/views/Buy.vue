<template>
  <div>
    <div class="grid justify-items-center">
        <div class="flex flex-col md:flex-row flex-wrap items-center">
            <SearchBar @update="setSearchInput"/>
            <Dropdown 
                class="pl-0 md:pl-8 pt-2 md:pt-0" 
                leftLabel="Sort by:" 
                :options="filterOptions" 
                @change="setFilter"
            />
            <Dropdown 
                class="pl-0 md:pl-8 pt-2 md:pt-0" 
                leftLabel="Room type:" 
                :options="roomTypeOptions" 
                @change="setRoomType"
                defaultOption="both"
            />
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
    </div>
    <div class="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
        <template v-for="listing in filteredListings" :key="listing.id">
            <ListingCard 
                :address="listing.address"
                :dollarsPerMonth="listing.price" 
                :numOfBeds="listing.bedrooms"
                :numOfBaths="listing.bathrooms"
                :roomType="listing.roomType"
                :image="listing.images[0]"
                :isHearted="isHearted(listing.id)"
                class="w-80 md:w-96"
                @heartClick="handleHeartClick(listing)"
                @isClick="handleListingClick(listing)"/>
        </template>
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
import SearchBar from "@/components/SearchBar.vue";
import ListingCard from "@/components/ListingCard.vue";
import Dropdown from "@/components/Dropdown.vue";
import Popup from "@/components/Popup.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import Announcement from "@/components/Announcement.vue";
import {getAllListings, getAllSavedListings, addListingToSavedListings, removeListingFromSavedListings} from "@/firebase.js";
export default {
    name: "Buy",
    components: {
        SearchBar,
        ListingCard,
        Dropdown,
        Popup,
        LoadingIcon,
        Announcement
    },  
    data: function() {
        return {
            searchInput: "",
            filter: "none",
            roomType: "both",
            listings: [],
            showListingPopup: false,
            selectedListing: {},
            isLoading: false,
            showAnnouncement: false,
            announcementMessage: "",
            savedListings: []
        }
    },
    methods: {
        setFilter: function(selection) {
            this.filter = selection;
        },
        setRoomType: function(selection) {
            this.roomType = selection;
        },
        setSearchInput: async function(input) {
            this.searchInput = input;
        },
        listingsBySearchInput: function() {
            if (this.searchInput !== "") {
                return this.listings.filter(listing => listing.address.toLowerCase().includes(this.searchInput.toLowerCase()));
            }
            else {
                return this.listings;
            }
        },
        listingsByRoomType: function(currListings) {
            if (this.roomType === "both") {
                return currListings;
            }
            else {
                return currListings.filter(listing => listing.roomType === this.roomType);
            }
        },
        listingsByFilter: function(currListings) {
            if (this.filter === "none") {
                return currListings.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            }
            else if (this.filter === "priceHL") {
                return currListings.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
            }
            else if (this.filter === "priceLH") {
                 return currListings.sort((a,b) => (b.price > a.price) ? 1 : ((a.price > b.price) ? -1 : 0));
            }
            else if (this.filter === "bed") {
                return currListings.sort((a,b) => (b.bedrooms > a.bedrooms) ? 1 : ((a.bedrooms > b.bedrooms) ? -1 : 0));
            }
            else if (this.filter === "bath") {
                return currListings.sort((a,b) => (b.bathrooms > a.bathrooms) ? 1 : ((a.bathrooms > b.bathrooms) ? -1 : 0));
            }
            else {
                return [];
            }
        },
        handleListingClick: function(listing) {
            this.showListingPopup = true;
            this.selectedListing = listing;
        },
        handleHeartClick: async function(listing) {
            if (this.isLoggedIn) {
                if (this.isHearted(listing.id)) {
                    this.savedListings = this.savedListings.filter(currListing => currListing.id !== listing.id);
                    await removeListingFromSavedListings(this.userID, listing.id);
                }
                else {
                    this.savedListings.push(listing);
                    await addListingToSavedListings(this.userID, listing.id);
                }
            }
            else {
                this.announcementMessage = "You must be logged in to save a listing";
                this.showAnnouncement = true;
            }
        },
        isHearted: function(listingID) {
            let isSaved = false;
            for (const listing of this.savedListings) {
                if (listing.id === listingID) {
                    isSaved = true;
                }
            }
            return isSaved;
        }
    },
    computed: {
        filteredListings: function() {
            /* eslint-disable */
            this.isLoading = true;
            var updatedListings = this.listingsBySearchInput();
            updatedListings = this.listingsByRoomType(updatedListings);
            updatedListings = this.listingsByFilter(updatedListings);
            this.isLoading = false;
            return updatedListings;
        },
        filterOptions: function() {
            return [
                {
                    title: "None",
                    value: "none"
                },
                {
                    title: "Price (High to Low)",
                    value: "priceHL"
                },
                {
                    title: "Price (Low to High)",
                    value: "priceLH"
                },
                {
                    title: "Bedrooms",
                    value: "bed"
                },
                {
                    title: "Bathrooms",
                    value: "bath"
                }
            ]
        },
        roomTypeOptions: function() {
            return [
                {
                    title: "Both",
                    value: "both"
                },
                {
                    title: "Shared",
                    value: "shared"
                },
                {
                    title: "Private",
                    value: "private"
                }
            ]
        },
        isLoggedIn: function() {
            return this.$store.state.isLoggedIn;
        },
        userID: function() {
            return this.$store.state.userID;
        }
    },
    created: async function() {
        this.isLoading = true;
        const initialListings = await getAllListings();
        this.listings = initialListings.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        if (this.isLoggedIn) {
            this.savedListings = await getAllSavedListings(this.userID);
        }
        this.isLoading = false;
    }
};
</script>
