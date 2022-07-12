<template>
  <div>
    <div class="grid justify-items-center sm:justify">
        <SearchBar/>
    </div>
    <div class="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
        <ListingCard dollarsPerMonth="780" address="240 E 600 N Provo, UT 84606" image="contract-handshake.jpg"/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ListingCard from "@/components/ListingCard.vue";
export default {
    name: "Buy",
    components: {
        SearchBar,
        ListingCard
    },  
    data: function() {
        return {
            input: ""
        }
    },
    methods: {
        
    },
    computed: {
        
    }
};
</script>
