<template>
    <div>
        <button 
            type="button" 
            :class="['border rounded py-1 px-4 text-lg hover:opacity-80', bgColor, opacity, txtColor]" 
            @mousedown="mouseDown = true" 
            @mouseup="handleClick"
        >
            {{text}}
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",
    components: {
        
    },  
    props: {
        text: {
            type: String,
            default: "Change Me"
        },
        backgroundColor: {
            type: String,
            default: "gray-600"
        },
        textColor: {
            type: String,
            default: "white"
        }
    },
    data: function() {
        return {
            mouseDown: false
        }
    },
    methods: {
        handleClick: function() {
            this.mouseDown = false
            this.$emit('click');
        }
    },
    computed: {
        bgColor: function() {
            return "bg-" + this.backgroundColor;
        },
        txtColor: function() {
            return "text-" + this.textColor;
        },
        opacity: function() {
            if (this.mouseDown) {
                return "opacity-80";
            }
            else {
                return "opacity-100";
            }
        }
    }
};
</script>