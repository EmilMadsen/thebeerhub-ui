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
                    step: <i>{{ activeStep ? activeStep.index : '?' }} out of {{steps.length}}</i>
                </div>
                <div class="text--primary">
                    started: <i>{{ activeStep ? activeStep.started : '' }}</i>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary" @click="startNextStep">
                    Next Step
                </v-btn>
            </v-card-actions>
        </v-card>

        {{steps}}

    </v-container>
</template>

<script>
    import axios from "axios";

    export default {

        props: ['id'],

        data() {
            return {
                steps: [],
                brew: {},
                duration: "0d 0h 0m 0s",
            };
        },

        mounted() {
            if (this.id) {
                this.loadSteps(this.id);
                this.loadBrew();
            }
            this.setDuration();
        },

        computed: {

            activeStep() {
                if (this.steps) {
                    for (let i = 0; i < this.steps.length; i++) {
                        if (this.steps[i].started && !this.steps[i].ended) {
                            return this.steps[i];
                        }
                    }
                    return this.steps[0];
                }
                return null;
            }

        },

        methods: {

            setDuration() {
                // Update the duration every 1 second
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

            startNextStep() {
                if (this.activeStep) {
                    // check if index 1 and not started
                    if (!this.activeStep.started && this.activeStep.index === 1) {
                        this.activeStep.started = new Date().toISOString();
                        this.updateStep(this.activeStep)
                    } else {
                        // else set ended on old, and start new.
                        let index = this.activeStep.index;
                        this.activeStep.ended = new Date().toISOString();
                        this.updateStep(this.activeStep)
                            .then(response => {
                                console.log(response)
                                if (this.steps[index]) {
                                    this.steps[index].started = new Date().toISOString();
                                    this.updateStep(this.steps[index])
                                }
                            })
                    }
                }
            },

            loadSteps(parentId) {
                if (parentId) {
                    axios
                        .get(process.env.VUE_APP_API_BREW + "/step/parent/" + this.id)
                        .then((response) => {
                            console.log(response);
                            this.steps = response.data.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            },

            loadBrew() {
                axios
                    .get(process.env.VUE_APP_API_BREW + "/brew/" + this.id)
                    .then((response) => {
                        console.log(response);
                        this.brew = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            updateStep(step) {
                return axios
                    .post(process.env.VUE_APP_API_BREW + '/step/', step)
                    .then((response) => {
                        console.log(response);
                        this.loadSteps(this.id);
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
