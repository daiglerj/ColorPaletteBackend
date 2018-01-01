const mongoose = require('mongoose')

const ColorPaletteSchema = mongoose.Schema({
	user: String,
	paletteName: String,
	colors: []
}, {
	timestamps: true
	}
)


module.exports = mongoose.model('ColorPalette',ColorPaletteSchema)
