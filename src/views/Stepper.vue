<template>
    <v-container v-if="brew">

        <v-card class="mx-auto" max-width="800">
            <v-card-text>
                <div class="display-1 mb-1">{{ activeStep ? activeStep.name : '' }}</div>
                <p class="display-2 text--primary">
                    {{duration}}
                </p>
                <p>{{brew.brewName}} ({{brew.brewType}}) </p>
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

        <steps-component
            v-bind:activeStep=activeStep
            v-bind:brewSteps=brew.brewSteps
        ></steps-component>

    </v-container>
</template>

<script>

    export default {

        props: ['id'],

        components: {
            StepsComponent: () => import("@/components/StepsComponent"),
        },

        data() {
            return {
                duration: "0d 0h 0m 0s",
            };
        },

        mounted() {
            if (this.id) {
                this.$store.commit('setSelectedId', this.id);
            }
            this.setDuration();
        },

        computed: {
            brew() {
                return this.$store.getters.getSelectedBrew;
            },
            activeStep() {
                if (this.brew && this.brew.brewSteps) {
                    for(let i = 0; i < this.brew.brewSteps.length; i++) {
                        if (!this.brew.brewSteps[i].ended) {
                            return this.brew.brewSteps[i];
                        }
                    }
                }
                return null;
            }
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

            nextStep() {
                let timestamp = new Date().toISOString();
                this.$store.dispatch('nextBrewStep', timestamp)
            }

        }
    };
</script>

<style>
</style>
