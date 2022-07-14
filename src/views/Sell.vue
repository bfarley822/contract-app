<template>
  <div>
    <p class="text-3xl w-full border-b font-medium">Create Post</p>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="lg:border-r border-b p-4">
        <p class="text-2xl pb-4 flex justify-center">Add Details</p>
        <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
          <FormGridLabel text="Address Line 1" :required="true"/>
          <TextInput @update="handleAL1"/>
          <FormGridLabel text="Address Line 2"/>
          <TextInput @update="handleAL2"/>
          <FormGridLabel text="City" :required="true"/>
          <TextInput @update="handleCity"/>
          <FormGridLabel text="State" :required="true"/>
          <TextInput @update="handleState"/>
          <FormGridLabel text="Zip Code" :required="true"/>
          <NumberInput max="99999" @update="handleZipCode"/>
          <FormGridLabel text="Price" :required="true" class="pt-8"/>
          <NumberInput max="5000" @update="handlePrice" class="pt-8"/>
          <FormGridLabel text="# of Bedrooms" :required="true"/>
          <NumberInput max="9" @update="handleNumBedrooms"/>
          <FormGridLabel text="# of Bathrooms" :required="true"/>
          <NumberInput max="9" @update="handleNumBathrooms"/>
          <FormGridLabel text="Room Type" :required="true"/>
          <RadioList :options="roomTypeOptions" @update="handleRoomType"/>
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
import RadioList from "@/components/RadioList.vue";
import NumberInput from "@/components/NumberInput.vue";
export default {
    name: "Sell",
    components: {
        TextInput,
        Button,
        FormGridLabel,
        RadioList,
        NumberInput
    },  
    props: {
        
    },
    data: function() {
        return {
            roomType: "",
            numBaths: "",
            numBeds: "",
            price: "",
            zipCode: "",
            state: "",
            city: "",
            addressL2: "",
            addressL1: ""
        }
    },
    methods: {
        handleRoomType: function(value) {
          this.roomType = value;
        },
        handleNumBathrooms: function(value) {
          this.numBaths = value;
        },
        handleNumBedrooms: function(value) {
          this.numBeds = value;
        },
        handlePrice: function(value) {
          this.price = value;
        },
        handleZipCode: function(value) {
          this.zipCode = value;
        },
        handleState: function(value) {
          this.state = value;
        },
        handleCity: function(value) {
          this.city = value;
        },
        handleAL2: function(value) {
          this.addressL2 = value;
        },
        handleAL1: function(value) {
          this.addressL1 = value;
        }
    },
    computed: {
        roomTypeOptions: function() {
          return [
            {
              text: "Private",
              value: "private"
            },
            {
              text: "Shared",
              value: "shared"
            }
          ]
        }
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: 40% 60%;
  }
</style>