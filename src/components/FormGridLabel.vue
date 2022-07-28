<template>
    <div :class="['flex', currAlignment]">
        <p :class="['text-gray-700', {'pr-2' : !required}]">{{text}}</p>
        <p v-if="required" class="text-red-600">*</p>
    </div>
</template>

<script>
export default {
    name: "FormGridLabel",
    components: {
        
    },  
    props: {
        text: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        alignment: {
            type: String,
            default: 'end'
        }
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        currAlignment: function() {
            return 'justify-' + this.alignment;
        }
    }
};
</script>