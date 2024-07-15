<template>
  <v-app style="background-image: url('medium-shot-smiley-man-with-vegetables_23-2148761606.avif'); background-size: cover; background-position: center;">
    <div class="background-overlay">
      <v-container fluid fill-height>
        <v-img src="People_Dollar_logo__Money_Finances_logo_1_-removebg-preview.png" alt="logo" height="" contain></v-img>
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col cols="12" sm="8" md="4">
            <v-card color="transparent" elevation="0" class="pa-4" style="margin-top: -70px;">
              <v-form @submit.prevent="login" ref="loginForm">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  prepend-inner-icon="mdi-email"
                  color="white"
                  style="color: white;"
                  :rules="emailRules"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  color="white"
                  style="color: white;"
                  :rules="passwordRules"
                  required
                  variant="outlined"
                ></v-text-field>
                <v-btn type="submit" color="orange" width="100%" rounded style="text-transform: capitalize;">Login
                  <v-icon right>mdi-login</v-icon>
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="6000">
        {{ snackbarMessage }}
      </v-snackbar>
    </div>
  </v-app>
</template>
<script>
import axiosInstance from '../service/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'error',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    };
  },
  methods: {
    async login() {
      const isValid = this.$refs.loginForm.validate();
      if (!isValid) {
        return;
      }

      try {
        const response = await axiosInstance.post('/login', {
          email: this.email,
          password: this.password
        });

        // Assuming the API returns user details including token, role, and other details
        const { token, user } = response.data;

        // Store token, role, and user details in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.snackbarColor = 'success';
        this.snackbarMessage = 'Login successful!';
        this.snackbar = true;

        // Redirect to welcome page after successful login
        this.$router.push('/welcomePage');
      } catch (error) {
        this.snackbarColor = 'error';
        if (error.response && error.response.status === 401) {
          this.snackbarMessage = 'Invalid email or password. Please try again.';
        } else {
          this.snackbarMessage = 'An error occurred. Please try again.';
        }
        this.snackbar = true;
      }
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
</style>
