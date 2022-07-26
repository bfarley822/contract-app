<template>
    <div class="grid md:grid-cols-2 gridStyle">
        <div>
            <p class="text-xl font-medium">Listing Details</p>
            <div class="pl-2">
                <p>- ${{listing.price}}/month</p>
                <p>- {{listing.bedrooms}} bed</p>
                <p>- {{listing.bathrooms}} bath</p>
                <p>- {{roomTypeString}} Room</p>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-1">
            <template v-for="image in listing.images" :key="image">
                <img v-if="image" class="object-cover w-96 h-80" :src="image">
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListingPopupView",
    components: {
        
    },  
    props: {
        listing: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        roomTypeString: function() {
            return this.listing.roomType ? this.listing.roomType.charAt(0).toUpperCase() + this.listing.roomType.slice(1) : "";
        }
    }
};
</script>

<style scoped>
.gridStyle {
  grid-template-columns: 20% 80%;
}
</style>