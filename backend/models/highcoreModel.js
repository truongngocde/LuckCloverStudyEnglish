const mongoose = require('mongoose');

const highcoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    top: [
        {
            accountId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account',
            },
            score: Number,
        },
    ],
});

const Highscore = mongoose.model('highscore', highcoreSchema);

module.exports = Highscore;