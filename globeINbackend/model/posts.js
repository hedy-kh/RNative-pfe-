const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String },
    publishDate: { type: Date, default: Date.now },
    price: { type: Number },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    active: { type: Boolean, default: false }
});

ProductSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

ProductSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Product', ProductSchema);
