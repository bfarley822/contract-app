<template>
    <div :class="['z-50 fixed right-0 left-0 bg-red-200 text-gray-700', topDisplacement]">
        <div class="p-2 flex justify-between">
            <div></div>
            <p><i class="fa-solid fa-circle-exclamation pr-2"></i>{{message}}</p>
            <div class="flex items-center px-2 lg:px-0">
                <i class="fa-solid fa-xmark px-2 cursor-pointer" @click="$emit('close')"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Announcement",
    components: {
 
    },  
    props: {
        message: {
            type: String,
            default: "Error"
        },
        yScroll: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        topDisplacement: function() {
            if (this.yScroll > 60) {
                return 'top-0';
            }
            else if (this.yScroll > 55) {
                return 'top-1';
            }
            else if (this.yScroll > 50) {
                return 'top-2';
            }
            else if (this.yScroll > 40) {
                return 'top-4';
            }
            else if (this.yScroll > 30) {
                return 'top-6';
            }
            else if (this.yScroll > 20) {
                return 'top-8';
            }
            else if (this.yScroll > 10) {
                return 'top-10';
            }
            else if (this.yScroll > 6) {
                return 'top-12';
            }
            else if (this.yScroll > 3) {
                return 'top-14';
            }
            else {
                return 'top-16';
            }
        }
    }
};
</script>