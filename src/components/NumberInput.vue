<template>
    <div>
        <input 
            type="number" 
            :value="input"
            step="0.5"
            :min="min"
            :max="max"
            @input="handleInput"
            :placeholder="placeholder"
            :class="['h-8 border p-2 rounded', customWidth, txtSize, {'border-red-500 bg-red-50' : error}]"
        />
    </div>
</template>

<script>
export default {
    name: "NumberInput",
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
            default: "20"
        },
        textSize: {
            type: String,
            default: "md"
        },
        min: {
            type: String,
            default: "0"
        },
        max: {
            type: String,
            default: ""
        },
        error: {
            type: Boolean,
            default: false
        },
    },
    data: function() {
        return {
            input: ""
        }
    },
    methods: {
        handleInput: function(event) {
            let value = event.target.value;
            if (this.isValid(value)) {
                this.input = value;
                this.$emit('update', value);
            }
            this.$forceUpdate()
        },
        isValid: function(input) {
            if (parseInt(input) < parseInt(this.min)) {
                return false;
            }
            else if (parseInt(input) > parseInt(this.max)) {
                return false;
            }
            else if (this.max.length === 1) {
                if (input.includes('.')) {
                    if (input.length == 3 && input[input.length - 1] !== '5') {
                        return false;
                    }
                    if (input.length > 3) {
                        return false;
                    }
                }
            }
            return true;
        }
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

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>