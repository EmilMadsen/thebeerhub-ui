<template>
    <v-container v-if="brew">

        <v-card class="mx-auto" max-width="800">
            <v-card-text>
                <div class="display-1 mb-1">{{ activeStep ? activeStep.name : '' }}</div>
                <p class="display-2 text--primary">
                    {{duration}}
                </p>
                <v-chip
                  label
                  class="mx-0 mb-2 text-uppercase"
                  color="primary"
                  small
                  @click.stop=""
                >
                  {{ brew.brewName }}  ({{brew.brewType}})
                </v-chip>
                <div class="text--primary">
                    started: <i>{{ activeStep.started ? new Date(activeStep.started).toLocaleString() : '-' }}</i>
                </div>
            </v-card-text>
            <v-card-actions v-if="!activeStep.ended">
                <v-btn color="secondary" @click="nextStep">
                    {{ getNextStepText(activeStep) }}
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
                duration: "0s",
                counterInterval: null,
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
                    // get latest that has not ended
                    for(let i = 0; i < this.brew.brewSteps.length; i++) {
                        if (!this.brew.brewSteps[i].ended) {
                            return this.brew.brewSteps[i];
                        }
                    }
                    // else get last item
                    return this.brew.brewSteps[this.brew.brewSteps.length-1];
                }
                return null;
            }
        },

        methods: {

            getNextStepText(activeStep) {
                if (!activeStep.started) {
                    return 'Start';
                }
                if (activeStep.nextStep === null) {
                    return 'End';
                }
                return 'Next Step';
            },

            setDuration() {
                // Update the duration every second
                let self = this;

                this.counterInterval = setInterval(function () {

                    if (self.activeStep && self.activeStep.started && !self.activeStep.ended) {
                        // get todays date and time
                        let now = new Date().getTime();
                        let started = new Date(self.activeStep.started).getTime();

                        // find the distance between now and the started date
                        let distance = now - started;

                        // time calculations for days, hours, minutes and seconds
                        let durationString = self.$formatDuration(distance);
            
                        // set result
                        self.duration = durationString;
                    } else if (self.activeStep.ended) {
                        let distance = new Date(self.activeStep.ended).getTime() - new Date(self.activeStep.started).getTime()
                        self.duration = self.$formatDuration(distance);
                        self.stopInterval();
                    }

                }, 1000);
            },

            stopInterval() {
                clearInterval(this.counterInterval);
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
