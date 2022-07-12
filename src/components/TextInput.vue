<template>
    <div>
        <input 
            type="text" 
            v-model="input" 
            :placeholder="placeholder"
            class="w-96 h-8 border p-2 text-lg rounded"
            @input="updateInput" :focus="true"/>
    </div>
</template>

<script>
export default {
    name: "TextInput",
    components: {
 
    },  
    props: {
        placeholder: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            input: ""
        }
    },
    methods: {
        updateInput: function() {
            this.$emit('input', this.input);
        }
    },
    computed: {
        
    }
};
</script>