"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var order_items_1 = __importDefault(require("./handlers/order_items"));
var app = (0, express_1.default)();
var address = '0.0.0.0:3000';
// const corsOptions = {
//     origin: 'http://someotherdomain.com',
//     optionsSuccessStatus: 200
// }
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
(0, order_items_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
