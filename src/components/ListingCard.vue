<template>
    <div :class="['h-64 shadow-md rounded-lg cursor-pointer', {'hover:shadow-xl transition-shadow duration-300 ease-in-out' : !onHeart}]">
        <div class="relative">
            <img v-if="image != ''" class="object-cover w-full h-40 bg-gray-400 rounded-t-lg" :src="image">
            <i :class="['fa-solid fa-heart absolute top-2 right-2 text-4xl cursor-pointer', 
                        isHearted ? 'text-red-400' : 'text-gray-200 hover:text-gray-300']" 
                @mouseenter="onHeart = true" 
                @mouseleave="onHeart = false" 
                @click="handleHeartClick">
            </i>
        </div>
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
           default: ""
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
            onHeart: false,
            isHearted: false
        }
    },
    methods: {
        handleHeartClick: function() {
            this.isHearted = !this.isHearted;
        }
    },
    computed: {
        
    }
};
</script>