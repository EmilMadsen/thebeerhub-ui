<template>
  <v-container class="home-main">
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Ølstil</th>
            <th class="text-left">Target CO2</th>
            <th class="text-left">Glucose</th>
            <th class="text-left">Sugar</th>
            <th class="text-left">Spraymalt</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in brewTypes"
            :key="item.name"
            @click="selected = item"
            v-bind:class="{ isselected : isSelected(item) }"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.co2 }} g/L</td>
            <td>{{ item.glucose }} g/L</td>
            <td>{{ item.sugar }} g/L</td>
            <td>{{ item.spraymalt }} g/L</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
hej
    <v-row class="mt-3">
      <v-col cols="12" md="2">
        <v-text-field
          v-model="volume"
          type="number"
          label="Beer Volume (L)"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="1">
        <v-text-field
          :value="getRequiredAmount('glucose')"
          label="Glucose"
          disabled
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="1">
        <v-text-field
          :value="getRequiredAmount('sugar')"
          label="Sugar"
          disabled
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="1">
        <v-text-field
          :value="getRequiredAmount('spraymalt')"
          label="Spraymalt"
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      brewTypes: [
        {
          name: "Light lager, bock, pale ale og frugtøl",
          co2: 2.5,
          glucose: 7.4,
          sugar: 6.5,
          spraymalt: 8.4,
        },
        {
          name: "Amber lager, lyse og rødlige hybridøl",
          co2: 2.4,
          glucose: 7,
          sugar: 6.1,
          spraymalt: 7.9,
        },
        {
          name: "Dark lager",
          co2: 2.6,
          glucose: 7.9,
          sugar: 6.9,
          spraymalt: 8.9,
        },
        {
          name: "IPA, mild, øl med urter og krydderier",
          co2: 2,
          glucose: 5.1,
          sugar: 4.5,
          spraymalt: 5.8,
        },
        {
          name: "Sour, lambic, hvede og rugøl",
          co2: 3.75,
          glucose: 13.2,
          sugar: 11.5,
          spraymalt: 14.9,
        },
        { name: "Bitter", co2: 1.5, glucose: 2.8, sugar: 2.5, spraymalt: 3.2 },
        {
          name: "Strong ale",
          co2: 1.9,
          glucose: 4.7,
          sugar: 4.1,
          spraymalt: 5.3,
        },
        {
          name: "Brown ale",
          co2: 1.75,
          glucose: 4,
          sugar: 3.5,
          spraymalt: 4.5,
        },
        {
          name: "Barley wine",
          co2: 1.8,
          glucose: 4.2,
          sugar: 3.7,
          spraymalt: 4.8,
        },
        {
          name: "Stout og porter",
          co2: 2,
          glucose: 5.1,
          sugar: 4.5,
          spraymalt: 5.8,
        },
      ],
      selected: null,
      volume: 0,
    };
  },

  methods: {
    getRequiredAmount(property) {
      let value = 0;
      if (this.selected) {
        value = this.selected[property] * this.volume;
      }
      return value + " g.";
    },

    isSelected(item) {
      if (!this.selected) {
        return false;
      }
      return item.name === this.selected.name;
    }
  },
};
</script>

<style>

  .isselected {
    background-color: var(--v-primary-base);
  }

  .theme--dark.v-data-table>.v-data-table__wrapper>table>tbody>tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    opacity: 0.5;
    background-color: var(--v-primary-base);
  }


</style>

