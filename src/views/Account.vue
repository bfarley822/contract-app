<template>
  <div>
    <div class="grid grid-cols-3 gridStyle border-b">
      <div class="grid justify-items-center">
        <img v-if="image !== ''" class="object-cover w-80 h-80" :src="require(`@/assets/${image}`)">
        <div v-else class="object-cover w-80 h-80 bg-white border grid place-content-center">
          <p class="text-gray-300">No profile picture</p>
        </div>
        <input type="file" name="file" id="file" accept="image/png, image/jpeg" @change="handleImage" class="hidden"/>
        <label for="file" class="mb-4 cursor-pointer border border-gray-300 rounded py-1 px-4 text-lg bg-gray-200 text-gray-700 hover:opacity-80 mt-4">Upload Picture</label>
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-2xl pb-4 flex justify-center">Account Details</p>
        <div class="grid gri-cols-2 gap-2 items-center formGridStyle">
          <FormGridLabel text="First Name"/>
          <TextInput :disabled="allDisabled"/>
          <FormGridLabel text="Last Name"/>
          <TextInput :disabled="allDisabled"/>
          <FormGridLabel text="Phone Number"/>
          <TextInput :disabled="allDisabled"/>
          <FormGridLabel text="Email"/>
          <TextInput :disabled="allDisabled"/>
          <FormGridLabel text="Password"/>
          <TextInput :disabled="allDisabled"/>
        </div>
        <Button :text="buttonText" backgroundColor="blue-700" class="flex justify-center pb-4" @isClick="handleUpdateDetails"/>
      </div>
    </div>
  </div>
</template>

<script>
import FormGridLabel from "@/components/FormGridLabel.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
export default {
    name: "Account",
    components: {
        FormGridLabel,
        TextInput,
        Button
    },  
    props: {
        
    },
    data: function() {
        return {
            image: "",
            allDisabled: true
        }
    },
    methods: {
        handleImage: function(event) {
          this.image = event.target.files[0].name;
        },
        handleUpdateDetails: function() {
          this.allDisabled = !this.allDisabled;
        }
    },
    computed: {
        buttonText: function() {
          return this.allDisabled ? 'Update' : 'Save';
        }
    }
};
</script>

<style scoped>
.gridStyle {
  grid-template-columns: minmax(320px, 320px) 50% 50%
}
.formGridStyle {
  grid-template-columns: 40% 60%;
}
</style>