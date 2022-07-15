<template>
  <div>
    <div class="grid grid-cols-3">
      <div>
        <img v-if="image !== ''" class="object-cover w-80 h-80" :src="require(`@/assets/${image}`)">
        <div v-else class="object-cover w-80 h-80 bg-white"></div>
        <input type="file" name="file" id="file" accept="image/png, image/jpeg" @change="handleImage" class="hidden"/>
        <label for="file" class="mb-4 cursor-pointer border border-gray-300 rounded py-1 px-4 text-lg bg-gray-200 text-gray-700 hover:opacity-80">Select Images</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Account",
    components: {
        
    },  
    props: {
        
    },
    data: function() {
        return {
            image: ""
        }
    },
    methods: {
        handleImage: function(event) {
          this.image = event.target.files[0].name;
        }
    },
    computed: {
        
    }
};
</script>