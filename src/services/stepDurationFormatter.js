const stepDurationFormatter = {}

stepDurationFormatter.install = function (Vue, options) {

   Vue.prototype.$formatDuration = (distance) => {

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let durationString = seconds + "s"
        if (!minutes) return durationString;
        durationString =  minutes + "m " + durationString;
        if (!hours) return durationString;
        durationString = hours + "h " + durationString;
        if (!days) return durationString;
        return days + "d " + durationString;

   }

}

export default stepDurationFormatter;