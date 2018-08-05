// libreria obtenida con 
// npm add slugify
import slugify from 'slugify'

export default function slug(name) {
	// el regex es: todo lo que no sea una palabra o un
	// guion se rellena con '' nada
	return slugify(name, {
		lower: true
	}).replace(/[^\w\-]+/g,'')
}