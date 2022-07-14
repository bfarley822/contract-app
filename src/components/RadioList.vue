<template>
    <div>
        <template v-for="option in options" :key="option">
            <input 
                type="radio" 
                :id="option.text" 
                name="same" 
                @change="$emit('update', option.value)"
                class=""
            >
            <label :for="option.text" class="pl-1 pr-4">{{option.text}}</label>
        </template>
    </div>
</template>

<script>
export default {
    name: "RadioList",
    components: {
        
    },  
    props: {
        options: {
            type: Array,
            defualt: []
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