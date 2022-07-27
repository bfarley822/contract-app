<template>
    <div>
        <div class="flex w-full overflow-x-auto">
            <template v-for="image in listing.images" :key="image">
                <img v-if="image" class="object-cover w-80 md:w-96 h-72 md:h-80 pr-1" :src="image">
            </template>
        </div>
        <div class="mt-4 pt-2 border-t">
            <div class="flex flex-wrap">
                <p class="text-3xl font-semibold">${{listing.price}}</p>
                <p class="pt-3 font-semibold">/month</p>
                <p class="text-2xl pl-2 pt-1">(</p>
                <div class="flex pt-2">
                    <p class="text-xl">{{listing.bedrooms}}</p>
                    <p class="pt-1 pl-1">bed,</p>
                </div>
                <div class="flex pt-2 pl-1">
                    <p class="text-xl">{{listing.bathrooms}}</p>
                    <p class="pt-1 pl-1">bath</p>
                </div>
                <p class="text-2xl pt-1">)</p>
                <div class="border-r h-6 pl-2 mt-3 border-gray-300 hidden sm:block"></div>
                <div class="flex">
                    <p class="pt-3 pl-2 sm:hidden">-</p>
                    <p class="pt-3 pl-2">{{roomTypeString}} Room</p>
                </div>
            </div>
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
</style>