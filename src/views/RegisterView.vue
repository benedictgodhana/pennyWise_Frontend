<template>
  <v-app style="background-image: url('medium-shot-smiley-man-with-vegetables_23-2148761606.avif'); background-size: cover; background-position: center;">
    <div class="background-overlay">
      <v-container fluid fill-height>
        <v-img src="People_Dollar_logo__Money_Finances_logo_1_-removebg-preview.png" alt="logo" height="" contain></v-img>

        <!-- Step 1: Basic Information -->
        <v-card v-if="step === 1" width="100%" color="transparent" elevation="0" style="margin-top: -70px;" class="pa-1">
  <v-form @submit.prevent="nextStep">
    <v-text-field v-model="Name" label="Full Name" required prepend-inner-icon="mdi-account" style="color: white" variant="outlined"></v-text-field>
    <v-text-field v-model="email" label="Email" required prepend-inner-icon="mdi-email" style="color: white" variant="outlined"></v-text-field>
    <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" label="Password" required prepend-inner-icon="mdi-lock" style="color: white" variant="outlined" @click:append-inner="toggleShowPassword" append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" append-icon-color="white"></v-text-field>
    <v-text-field :type="showConfirmPassword ? 'text' : 'password'" v-model="confirm_password" label="Confirm Password" required prepend-inner-icon="mdi-lock" style="color: white" variant="outlined" @click:append-inner="toggleShowConfirmPassword" append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'" append-icon-color="white"></v-text-field>
    <v-btn type="submit" color="orange" width="100%" rounded style="text-transform: capitalize;">Next<v-icon>mdi-chevron-right</v-icon></v-btn>
  </v-form>
</v-card>


<v-card v-if="step === 2" width="100%" color="transparent" elevation="0" style="margin-top: -70px;" class="pa-1">
    <v-form @submit.prevent="nextStep">

      <!-- Business Name -->
      <v-text-field v-model="businessName" label="Business Name" outlined prepend-inner-icon="mdi-domain" style="color: white" variant="outlined"></v-text-field>

      
      <!-- Business Type -->
      <v-select v-model="businessType" :items="businessTypes" label="Business Type" outlined prepend-inner-icon="mdi-briefcase" style="color: white" variant="outlined"></v-select>
      <v-select v-model="location" :items="nairobiLocations" label="Location in Nairobi" outlined prepend-inner-icon="mdi-map-marker" style="color: white;" variant="outlined"></v-select>     
      <!-- Phone Number -->
      <v-text-field v-model="phone" label="Phone Number" outlined prepend-inner-icon="mdi-phone" style="color: white" variant="outlined">
        <template v-slot:prepend-inner>
          <vue-tel-input v-model="phone"  style="width: 100%;"></vue-tel-input>
        </template>
      </v-text-field>

      <!-- Navigation Buttons -->
      <v-row>
        <v-col>
          <v-btn @click="prevStep" color="orange" width="100%" rounded style="text-transform: capitalize;"><v-icon>mdi-chevron-left</v-icon>Previous</v-btn>
        </v-col>
        <v-col>
          <v-btn type="submit" color="orange" width="100%" rounded style="text-transform: capitalize;">Next <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-card>


        <!-- Step 3: Financial & Demographic Information -->
        <v-card v-if="step === 3" width="100%" color="transparent" elevation="0" style="margin-top:-70px;" class="pa-1">
          <v-form @submit.prevent="nextStep">
            <v-text-field v-model="age" label="Age" outlined prepend-inner-icon="mdi-face-recognition" style="color: white;" variant="outlined"></v-text-field>
            <v-select v-model="gender" :items="genders" label="Gender" outlined prepend-inner-icon="mdi-gender-male-female" style="color: white;" variant="outlined"></v-select>
            <v-checkbox v-model="consentMarketing" label="Consent for Marketing" style="color: white"></v-checkbox>

            <v-row>
              <v-col>
                <v-btn @click="prevStep" color="orange" width="100%" rounded style="text-transform: capitalize;"><v-icon>mdi-chevron-left</v-icon>Previous</v-btn>
              </v-col>
              <v-col>
                <v-btn type="submit" color="orange" width="100%" rounded style="text-transform: capitalize;">Register <v-icon>mdi-account-plus</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

      

       
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
 
  data() {
    return {
      step: 1,

      // Step 1: Basic Information
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      showPassword: false,
      showConfirmPassword: false,

      // Step 2: Business Details
      businessName: '',
      businessType: null,
      businessTypes: ['Retail', 'Wholesale', 'Services', 'Manufacturing'],
      industrySector: null,
      industrySectors: ['Retail', 'Food & Beverage', 'Technology', 'Finance', 'Other'],

      // Step 3: Financial & Demographic Information
      incomeLevel: '',
      age: '',
      gender: null,
      genders: ['Male', 'Female', 'Other'],
      familySize: '',

      // Step 4: Trading Habits & Preferences
      tradingExperience: null,
      tradingExperiences: ['Beginner', 'Intermediate', 'Advanced'],
      preferredProducts: null,
      preferredProductOptions: ['Commodities', 'Stocks', 'Forex', 'Cryptocurrency'],
      communicationChannels: [],
      communicationChannelOptions: ['Email', 'SMS', 'Phone', 'App Notifications'],

      // Step 5: Education, Training & Marketing Preferences
      educationLevel: null,
      educationLevels: ['High School', 'College', 'University', 'Postgraduate'],
      trainingNeeds: '',
      consentMarketing: false,
      location: null,
      nairobiLocations: [
        'CBD',
        'Westlands',
        'Karen',
        'Langata',
        'Kileleshwa',
        'Runda',
        'Parklands',
        'Industrial Area',
        'Lavington',
        'Eastlands'
        // Add more locations as needed
      ]
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    registerTrader() {
      // Perform registration logic here, e.g., submit data to backend API
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        businessName: this.businessName,
        businessType: this.businessType,
        industrySector: this.industrySector,
        incomeLevel: this.incomeLevel,
        age: this.age,
        gender: this.gender,
        familySize: this.familySize,
        tradingExperience: this.tradingExperience,
        preferredProducts: this.preferredProducts,
        communicationChannels: this.communicationChannels,
        educationLevel: this.educationLevel,
        trainingNeeds: this.trainingNeeds,
        consentMarketing: this.consentMarketing
      };
      console.log('Form Data:', formData);

      // Example: Submit form data to backend API
      // Replace this with your actual API call
      // axios.post('/api/register', formData)
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
    }
  }
};
</script>

<style scoped>
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity (last value) to make it darker/lighter */
}


.vue-tel-input .vti__input {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 10px;
  background-color: transparent;
  color: white;
  width: 100%;
}

.vue-tel-input input {
  outline: none;
  border: none;
  background: transparent;
  color: white;
}

.vue-tel-input .vti__dropdown {
  background-color: #333;
  color: white;
}

</style>
