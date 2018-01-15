import './login'
import './address'
import './orders'

var req = require.context('../img', true, /\.(png|jpg|gif)$/);
req.keys().forEach(req);
