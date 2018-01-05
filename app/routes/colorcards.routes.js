module.exports = (app)=>{
	var colorPalette = require('../controllers/colorcards.controller.js')
	//Create a new color palette
	app.post('/newPalette',colorPalette.create);
	
	//Add a color to an existing color palette
	app.put('/addColor/:paletteName',colorPalette.addColor)

	//Get all colors in an existing color palette
	app.get('/getColors/:paletteId',colorPalette.getColor)
	
	//Remove a color from the color palette
	app.put('/deleteColor/:paletteName',colorPalette.removeColor)

	//Get all colors in an existing color palette by the palette name
	app.get('/getColorsByName/:paletteName',colorPalette.getPaletteByName)

}