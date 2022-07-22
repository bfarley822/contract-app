<template>
    <div class="z-50 absolute top-16 right-0 left-0 bg-red-200 text-gray-700">
        <div class="p-2 flex justify-between">
            <div></div>
            <p><i class="fa-solid fa-circle-exclamation pr-2"></i>{{message}}</p>
            <div class="flex items-center px-2 lg:px-0">
                <i class="fa-solid fa-xmark px-2 cursor-pointer" @click="$emit('close')"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Announcement",
    components: {
 
    },  
    props: {
        message: {
            type: String,
            default: "Error"
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