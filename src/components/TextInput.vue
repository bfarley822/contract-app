<template>
    <div>
        <input 
            type="text" 
            :value="value"
            @input="$emit('update', $event.target.value)"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="['h-8 border p-2 rounded', customWidth, txtSize]"
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
        },
        width: {
            type: String,
            default: ""
        },
        textSize: {
            type: String,
            default: "md"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        customWidth: function() {
            return "w-" + this.width;
        },
        txtSize: function() {
            return "text-" + this.textSize;
        }
    }
};
</script>