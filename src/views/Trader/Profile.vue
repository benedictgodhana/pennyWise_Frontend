<template>
  <v-app style="background-image: url('867.jpg'); background-size: cover; background-position: center;">
    <v-container>
      <v-card class="profile-card" elevation="7">
        <v-toolbar dark color="orange">
          <v-card-title><v-icon>mdi-account</v-icon> Profile</v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="user.name" label="Name" readonly variant="outlined" prepend-inner-icon="mdi-account"></v-text-field>
            <v-text-field v-model="user.email" label="Email" readonly variant="outlined" prepend-inner-icon="mdi-email"></v-text-field>
            <!-- <v-text-field v-model="user.trader" label="Phone" readonly variant="outlined" prepend-inner-icon="mdi-phone"></v-text-field> -->
            <v-btn color="orange" block @click="showPasswordDialog = true" style="text-transform: capitalize;">
              <v-icon>mdi-lock-reset</v-icon> Update Password
            </v-btn>
            <v-btn color="red" block @click="deleteAccount" class="mt-2" style="text-transform: capitalize;">
              <v-icon>mdi-delete</v-icon> Delete Account
            </v-btn>
            <v-btn color="blue" block @click="logout" class="mt-2" style="text-transform: capitalize;">
              <v-icon>mdi-logout</v-icon> Logout
            </v-btn>
            <v-btn color="green" block @click="contactSupport" class="mt-2" style="text-transform: capitalize;">
              <v-icon>mdi-help-circle</v-icon> Contact Support
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-bottom-navigation v-model="active" color="primary" grow rounded app>
        <v-btn
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          @click="navigate(item.route)"
          icon
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <!-- Password Update Dialog -->
      <v-dialog v-model="showPasswordDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center" style="background-color: orange;">Update Password</v-card-title>
          <v-card-text>
            <v-form ref="passwordForm" v-model="valid">
              <v-text-field v-model="currentPassword" :type="'password'" label="Current Password" variant="outlined"></v-text-field>
              <v-text-field v-model="newPassword" :type="'password'" label="New Password" variant="outlined"></v-text-field>
              <v-text-field v-model="newPasswordConfirmation" :type="'password'" label="Confirm New Password" variant="outlined"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn style="text-transform: capitalize;background-color: green;color:white" text @click="updatePassword">Save</v-btn>
            <v-btn style="text-transform: capitalize;background-color: red;color:white" text @click="showPasswordDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import axiosInstance from '@/service/api';

export default {
  data() {
    return {
      user: {},
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      valid: false,
      showPasswordDialog: false,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/welcomePage' },
        { title: 'Articles', icon: 'mdi-newspaper', route: '/articles' },
        { title: 'Saving Calculator', icon: 'mdi-calculator', route: '/savingCalculator' },
        { title: 'Savings', icon: 'mdi-database', route: '/savings' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
      ],
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
  const token = localStorage.getItem('token');
  
  // If there's a token, fetch the user data from the backend
  if (token) {
    try {
      console.log('Token:', token); // Check token
      const response = await axiosInstance.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.user = response.data;

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user:', error.response ? error.response.data : error);
      alert('Failed to fetch user details. Please try again.');
      
      // Optional: handle specific errors (e.g., unauthorized)
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
        // Redirect to login page if necessary
        this.$router.push('/login');
      }
    }
  } else {
    alert('No active session found. Please log in.');
    // Redirect to login page if no token is found
    this.$router.push('/login');
  }
},


    async updatePassword() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.post('/user/update-password', {
          current_password: this.currentPassword,
          new_password: this.newPassword,
          new_password_confirmation: this.newPasswordConfirmation,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response.data.message);
        this.currentPassword = '';
        this.newPassword = '';
        this.newPasswordConfirmation = '';
        this.showPasswordDialog = false;
      } catch (error) {
        console.error('Error updating password:', error);
        alert('Error updating password');
      }
    },

    async deleteAccount() {
      const token = localStorage.getItem('token');
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
          const response = await axiosInstance.delete('/user/delete-account', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert(response.data.message);
          // Perform any additional logout or redirect actions here
        } catch (error) {
          console.error('Error deleting account:', error);
          alert('Error deleting account');
        }
      }
    },
    async logout() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No active session found.');
    return;
  }

  try {
    const response = await axiosInstance.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(response.data.message);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to home page
    this.$router.push('/welcomePage'); // Change '/welcomePage' to your home route
  } catch (error) {
    console.error('Error logging out:', error);
    if (error.response && error.response.status === 401) {
      alert('Your session has expired. Please log in again.');
      this.$router.push('/login'); // Redirect to login page
    } else {
      alert('Error logging out');
    }
  }
}


  }
};
</script>

<style scoped>
.profile-card {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}
</style>
