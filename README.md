# fac-it
<img src="./icon.png">
  
***
## ASCII to Factory Records colour code alphabet converter.
As designed by Peter Saville.

Takes a string of ASCII and encodes it as embeddable SVG and CSS.

### Installation

```
npm i fac-it
```

### Usage

Include in project
```
const fac-it = require("fac-it");
```

Available methods:
```
fac-it.encode()
  * @params {String} a string of ASCII
  * @returns {Array} an array of hex values 
```


```
fac-it.render()
  * @params {Array} an array of hex values - as returned by encode()
  * @params {Object} an options object - { type:String, size:String, direction:String } 
  * @returns {String} SVG or CSS code block of encoded string
```
The type option field should be "svg" or "css" depending on desired output, size denotes width of character in px, and direction can be either "row" or "column".
The returned CSS is a flexbox, and as such responsive. The SVG is not, and will just generate on a single row/column.

### Notes

* Technically speaking, it's not ASCII - it's the 36 alphanumeric characters, whitespace, and the available symbols on my keyboard. Peep data.js for that stuff.

* Props to <a href="https://github.com/scolion">scoliono</a> for the far more elegant <a href="https://libraries.io/npm/psaville">psaville</a>
