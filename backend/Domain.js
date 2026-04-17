const mongoose = require("mongoose")

const domainSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
        unique: true
    },

    icon: {
        type: String,
        default: null
    },

    totalTime: {
        type: Number, // in seconds
        default: 0
    },

    todayTime: {
        type: Number,
        default: 0
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    },

    limit: {
        type: Number,
        default: null
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    history: [
        {
            date: String,
            timeSpent: Number
        }
    ]
},
    { timestamps: true },
)

const Domain = mongoose.model("Domain", domainSchema)

module.exports = Domain