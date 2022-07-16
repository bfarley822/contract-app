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
                :image="listing.image"
                class="w-80 md:w-96"/>
        </template>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ListingCard from "@/components/ListingCard.vue";
import Dropdown from "@/components/Dropdown.vue";
export default {
    name: "Buy",
    components: {
        SearchBar,
        ListingCard,
        Dropdown
    },  
    data: function() {
        return {
            searchInput: "",
            filter: "none",
            roomType: "both",
            listings: []
        }
    },
    methods: {
        setFilter: function(selection) {
            this.filter = selection;
        },
        setRoomType: function(selection) {
            this.roomType = selection;
        },
        setSearchInput: function(input) {
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
        }
    },
    computed: {
        filteredListings: function() {
            var updatedListings = this.listingsBySearchInput();
            updatedListings = this.listingsByRoomType(updatedListings);
            updatedListings = this.listingsByFilter(updatedListings);
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
                    value: "Shared"
                },
                {
                    title: "Private",
                    value: "Private"
                }
            ]
        }
    },
    created: function() {
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
