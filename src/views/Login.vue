<template>
    <div class="h-full">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="border-b md:border-b-0 md:border-r border-gray-300 md:py-24">
                <p class="text-2xl py-4 flex justify-center">Login</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="Email"/>
                    <TextInput/>
                    <FormGridLabel text="Password"/>
                    <TextInput/>
                </div>
                <div class="grid justify-items-center pt-8 pb-4">
                    <Button text="Login" backgroundColor="blue-700"/>
                </div>
                <div class="flex justify-center text-gray-400 pb-16 md:pb-0">
                    <p>Don't have an account? Signup for one</p>
                </div>
            </div>
            <div class="md:py-16">
                <p class="text-2xl py-4 flex justify-center">Signup</p>
                <div class="grid grid-cols-2 gap-2 items-center formGridStyle">
                    <FormGridLabel text="First Name"/>
                    <TextInput/>
                    <FormGridLabel text="Last Name"/>
                    <TextInput/>
                    <FormGridLabel text="Email"/>
                    <TextInput/>
                    <FormGridLabel text="Password" class="pt-8"/>
                    <TextInput class="pt-8"/>
                    <FormGridLabel text="Confirm Pass"/>
                    <TextInput/>
                </div>
                <div class="grid justify-items-center py-8">
                    <Button text="Create Account" backgroundColor="blue-700"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import FormGridLabel from "@/components/FormGridLabel.vue";
export default {
    name: "Login",
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
    watch: {
        
    },
    methods: {
        
    },
    computed: {
        
    }
};
</script>

<style scoped>
  .formGridStyle {
    grid-template-columns: minmax(min-content, auto) minmax(min-content, auto);
  }
</style>