<template>
    <div class="flex items-center">
        <TextInput placeholder="Search Address" width="80" textSize="lg" @update="handleInput"/>
        <i class="fa-solid fa-magnifying-glass text-lg pl-2 text-gray-400"></i>
    </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
export default {
    name: "SearchBar",
    components: {
        TextInput
    },  
    props: {
        
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        handleInput: function(input) {
            this.$emit('update', input);
        }
    },
    computed: {
        
    }
};
</script>