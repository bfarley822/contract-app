<template>
  <div>
    <p class="text-3xl w-full border-b font-medium">Create Post</p>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="lg:border-r border-b p-4">
        <p class="text-2xl pb-4 flex justify-center">Add Details</p>
        <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
          <FormGridLabel text="Address Line 1" :required="true"/>
          <TextInput/>
          <FormGridLabel text="Address Line 2"/>
          <TextInput/>
          <FormGridLabel text="City" :required="true"/>
          <TextInput/>
          <FormGridLabel text="State" :required="true"/>
          <TextInput/>
          <FormGridLabel text="Zip Code" :required="true"/>
          <TextInput/>
          <FormGridLabel text="Price" :required="true" class="pt-8"/>
          <TextInput class="pt-8"/>
          <FormGridLabel text="# of Bedrooms" :required="true"/>
          <TextInput/>
          <FormGridLabel text="# of Bathrooms" :required="true"/>
          <TextInput/>
          <FormGridLabel text="Room Type" :required="true"/>
        </div>     
      </div>
      <div class="grid justify-items-center border-b pt-4 pb-8 pl-4">
        <p class="text-2xl pb-4">Upload Images</p>
        <div class="border w-full h-full bg-white">
          <div class="p-4 grid grid-cols-1 2xl:grid-cols-2 justify-items-center gap-2 w-full h-96 overflow-y-auto">
            <div class="w-80 h-64 bg-gray-300"></div>
            <div class="w-80 h-64 bg-gray-300"></div>
            <div class="w-80 h-64 bg-gray-300"></div>
            <div class="w-80 h-64 bg-gray-300"></div>
          </div>
        </div>
        <Button text="Select Images" backgroundColor="gray-200" textColor="gray-700" class="pt-4"/>
      </div>
    </div>
    <div class="grid justify-items-center pt-4">
      <Button text="Submit" backgroundColor="blue-700"/>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
export default {
    name: "Sell",
    components: {
        TextInput,
        Button,
        FormGridLabel
    },  
    props: {
        
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        handleInput: function(input) {
            this.$emit('update', input);
        }
    },
    computed: {
        
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: 40% 60%;
  }
</style>