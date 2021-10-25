# fac-it
***
## ASCII to Factory Records colour code alphabet converter.
As designed by Peter Saville.

Takes a string of ASCII and encodes it as embeddable SVG and CSS.

<a href="http://fac-it.herokuapp.com">fac-it demo</a>


The package has two methods:

encode()
@params {String} a string of ASCII
@returns {Array} an array of hex values


render()
@params {Array} an array of hex values - as returned by encode()
@params {Object} an options object - { type:String, size:String, direction:String } 
@returns {String} SVG or CSS code block of encoded string
The type option field should be "svg" or "css" depending on desired output