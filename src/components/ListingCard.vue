<template>
    <div class="h-64 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
        <img class="object-cover w-full h-40 bg-gray-400 rounded-t-lg" :src="require(`@/assets/${image}`)">
        <div class="w-full h-24 bg-gray-100 border-r border-l border-b border-gray-300 rounded-b-lg">
            <div class="px-4 py-2 ">
                <p class="font-semibold text-xl">${{dollarsPerMonth}}/month</p>
                <p class="text-lg">{{numOfBeds}} bed {{numOfBaths}} bath - {{roomType}} Room</p>
                <p class="text-sm">{{address}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListingCard",
    components: {
 
    },  
    props: {
        dollarsPerMonth: {
            type: String,
            required: true,
            default: "0"
        },
        address: {
            type: String,
            required: true,
            default: "address"
        },
        image: {
           type: String,
           required: true,
           default: "fake-house.jpg"
        },
        numOfBeds: {
            type: String,
            default: "0"
        },
        numOfBaths: {
            type: String,
            default: "0"
        },
        roomType: {
            type: String,
            default: "Shared"
        }
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        
    }
};
</script>