<template>
    <div>
        <input 
            :type="type" 
            v-model="text"
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
        },
        type: {
            type: String,
            default: "text"
        }
    },
    data: function() {
        return {
            text: ""
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
    },
    watch: {
        text: function() {
            this.$emit('update', this.text);
        }
    }
};
</script>