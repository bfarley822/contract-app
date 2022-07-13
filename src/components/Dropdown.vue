<template>
    <div>
        <label v-if="leftLabel" for="dropdown" class="pr-1">{{leftLabel}}</label>

        <select name="dropdown" id="dropdown" class="p-1 border rounded" v-model="selection">
            <template v-for="option in options" :key="option">
                <option :value="option.value">{{option.title}}</option>
            </template>
        </select>
    </div>
</template>

<script>
export default {
    name: "Dropdown",
    components: {
 
    },  
    props: {
        leftLabel: {
            type: String,
            default: null
        },

        // Array of option objects. Ex) [{title: "Yes", value: "yes"}, {title: "No", value: "no"}]
        options: {
            type: Array,
            required: true
        },

        // Takes in the value, NOT text
        defaultOption: {
            type: String,
            default: "none"
        }
    },
    data: function() {
        return {
            selection: this.defaultOption
        }
    },
    watch: {
        selection: function() {
            this.$emit('change', this.selection);
        }
    },
    methods: {
        handleSelection: function() {
            //var value = event.target.options[event.target.options.selectedIndex].text;
            //this.$emit('change', this.selection);
        }
    },
    computed: {
        
    }
};
</script>