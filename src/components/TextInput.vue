<template>
    <div>
        <input 
            type="text" 
            :value="value"
            @input="$emit('update', $event.target.value)"
            :placeholder="placeholder"
            class="w-96 h-8 border p-2 text-lg rounded"
        />
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
        },
        value: {
            type: String
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