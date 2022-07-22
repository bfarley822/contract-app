<template>
    <div>
        <input 
            :type="type" 
            v-model="changingText"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="['h-8 border p-2 rounded', customWidth, txtSize, {'border-red-500 bg-red-50' : error}]"
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
        },
        error: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            changingText: this.text
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
        changingText: function() {
            this.$emit('update', this.changingText);
        }
    }
};
</script>