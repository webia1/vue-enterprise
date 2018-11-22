<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1>Text Fields</h1>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        label="Label"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        label="Label (with hint)"
        hint="Hint!"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        label="Label (with counter)"
        :counter="50"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        success
        label="Label (success)"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        success
        success-messages="Success!"
        label="Label (success)"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        error
        label="Label (error)"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        error
        error-messages="Error!"
        label="Label (error)"
      />
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-text-field
        box
        error
        :error-count="2"
        :error-messages="['Error!', 'Another Error!']"
        label="Label (error)"
      />
    </v-flex>
  </v-layout>
</template>
