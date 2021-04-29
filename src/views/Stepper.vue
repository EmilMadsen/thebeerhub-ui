<template>
    <v-container>

        <v-card class="mx-auto" max-width="800">
            <v-card-text>
                <div class="display-1 mb-1">{{ activeStep ? activeStep.name : '' }}</div>
                <p class="display-2 text--primary">
                    {{duration}}
                </p>
                <p>{{brew.brew_name}} ({{brew.brew_type}}) </p>
                <div class="text--primary">
                    started: <i>{{ activeStep.started ? new Date(activeStep.started).toLocaleString() : '-' }}</i>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary" @click="nextStep">
                    {{ activeStep.started ? 'Next Step': 'Start' }}
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-container>
</template>

<script>
    import axios from "axios";

    export default {

        props: ['id'],

        data() {
            return {
                activeStep: {},
                brew: {},
                duration: "0d 0h 0m 0s",
            };
        },

        mounted() {
            if (this.id) {
                this.loadStep();
                this.loadBrew();
            }
            this.setDuration();
        },

        methods: {

            setDuration() {
                // Update the duration every second
                let self = this;

                setInterval(function () {

                    if (self.activeStep && self.activeStep.started) {
                        // get todays date and time
                        let now = new Date().getTime();
                        let started = new Date(self.activeStep.started).getTime();

                        // find the distance between now and the started date
                        let distance = now - started;

                        // time calculations for days, hours, minutes and seconds
                        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        // set result
                        self.duration = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                    }

                }, 1000);
            },

            loadStep() {
                  axios.get(process.env.VUE_APP_API_BREW + "/step/parent/" + this.id + '/active')
                      .then((response) => {
                          console.log(response);
                          this.activeStep = response.data;
                      })
                      .catch((error) => {
                          console.log(error);
                      });
            },

            loadBrew() {
                axios.get(process.env.VUE_APP_API_BREW + "/brew/" + this.id)
                    .then((response) => {
                        console.log(response);
                        this.brew = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            nextStep() {
                let timestamp = new Date().toISOString();
                axios.post(process.env.VUE_APP_API_BREW + "/step/parent/" + this.id + '/next/' + timestamp)
                    .then((response) => {
                        console.log(response);
                        this.loadStep()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        }
    };
</script>

<style>
</style>
