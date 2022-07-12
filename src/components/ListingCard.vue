<template>
    <div class="w-96 h-64 shadow-xl rounded-lg">
        <img class="object-contain w-full h-40 bg-gray-400 rounded-t-lg" src="@/assets/contract-handshake.jpg">
        <div class="w-full h-24 bg-gray-100 border-r border-l border-b border-gray-300 rounded-b-lg">
            <div class="px-4 py-2 ">
                <p class="font-semibold text-xl">${{dollarsPerMonth}}/month</p>
                <p class="text-lg">{{numOfBeds}} bed {{numOfBaths}} bath - Shared Room</p>
                <p class="text-sm">240 E 600 N Provo, UT 84606</p>
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
            default: "----"
        },
        numOfBeds: {
            type: String,
            default: "-"
        },
        numOfBaths: {
            type: String,
            default: "-"
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