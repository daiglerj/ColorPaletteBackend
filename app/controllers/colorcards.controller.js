console.log("controller")
var ColorPalette = require('../models/colorcard.model.js')
exports.create = (req,res)=>{
	if(!req.body.user){
		res.status(400).send({message:"Color palette must have a user"})
	}

	var colorPalette = new ColorPalette({
		user: req.body.user,
		paletteName: req.body.paletteName,
	})
	colorPalette.save((err,data)=>{
		if(err){
			res.status(500).send({message: "error"})
		}
		else{
			res.send(data)
		}
	})
}

exports.addColor = (req,res)=>{
	let query = {paletteName: req.params.paletteName}
	ColorPalette.find(query,(err,palette)=>{
		if(err){
			console.log("Error adding a color")
		}
		else{
			
			palette[0].colors.push(req.body.color)
			palette[0].save((err,data)=>{
				if(err){
					console.log("Error adding color")
				}
				else{
					res.send(data)
				}
			})
		}
	})
}

exports.getColor = (req,res)=>{
	ColorPalette.findById(req.params.paletteId,(err,palette)=>{
		if(err){
			console.log("error loading colors")
		}
		else{
			res.send(palette.colors)
		}
	})
}

exports.removeColor = (req,res)=>{
	ColorPalette.findById(req.params.paletteId,(err,palette)=>{
		if(err){
			console.log("error deleting the color")
		}
		else{
			var index = palette.colors.indexOf(req.body.color)
			palette.colors.splice(index,1)
			res.send(palette.colors)
		}
	})
}

exports.getPaletteByName = (req,res)=>{
	let query = {paletteName: req.params.paletteName}
	ColorPalette.find(query,(err,result)=>{
		if(err){
			console.log("Error loading palette")
		}
		else{
			res.send(result[0])
		}
	})
}

