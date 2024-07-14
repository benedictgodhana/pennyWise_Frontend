<template>
  <v-app style="background-image: url('medium-shot-smiley-man-with-vegetables_23-2148761606.avif'); background-size:cover; background-position: center;">
    <div class="background-overlay">
      <v-container fluid fill-height>
        <v-row justify="center" align="center" class="ma-0">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="pa-4" elevation="0" color="transparent">
              <v-img src="People_Dollar_logo__Money_Finances_logo_1_-removebg-preview.png" alt="logo" height="600" contain></v-img>
              <v-row class="my-6">
                <v-col>
                  <v-btn width="100%" color="orange" style="text-transform: capitalize;" rounded elevation="10" to="/register">
                    <v-icon left>mdi-account-plus</v-icon> Get Started
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn width="100%" color="orange" style="text-transform: capitalize;" rounded elevation="10" to="/login">
                    <v-icon left>mdi-login</v-icon> Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<style scoped>
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity to make it darker/lighter */
}
</style>
