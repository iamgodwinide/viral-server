const {
    Schema,
    model
} = require("mongoose");


const PopulationSchema = new Schema({
    batches: {
        type: Object,
        required: true
    },
    currentBatch: {
        type: Number,
        default: 0
    }
});

module.exports = Population = model("Population", PopulationSchema)