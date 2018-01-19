// load javascript
import './login'
import './address'
import './orders'
import './admin'
import './cart'

// load images
var req = require.context('../img', true, /\.(png|jpg|gif)$/);
req.keys().forEach(req);
