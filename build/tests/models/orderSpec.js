"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var user_1 = require("../../models/user");
var product_1 = require("../../models/product");
var order_item_1 = require("../../models/order_item");
var store = new order_1.OrderStore();
var storeU = new user_1.UserStore();
var storeP = new product_1.ProductStore();
var storeI = new order_item_1.OrderItemStore();
describe('Order Model', function () {
    var orderId = 0;
    var productId = 0;
    var userId = 0;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, resP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeU.create({
                        firstname: 'Rana',
                        lastname: 'Badr',
                        password: 'password',
                    })];
                case 1:
                    res = _a.sent();
                    userId = res.id;
                    return [4 /*yield*/, storeP.create({
                            name: 'T-shirt',
                            price: 500,
                            category: 'sporty',
                        })];
                case 2:
                    resP = _a.sent();
                    productId = resP.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create({
                        status: 'active',
                        user_id: userId
                    })];
                case 1:
                    order = _a.sent();
                    orderId = order.id;
                    expect(order.status).toBe('active');
                    expect(order.user_id).toBe(userId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    orders = _a.sent();
                    expect(orders).toContain({ id: orderId, status: 'active', user_id: userId });
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show(orderId)];
                case 1:
                    order = _a.sent();
                    expect(order.id).toBe(orderId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('addProduct method should work', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeI.addProduct({ quantity: 50, order_id: orderId, product_id: productId })];
                case 1:
                    orderItem = _a.sent();
                    expect(orderItem.order_id).toBe(orderId);
                    expect(orderItem.product_id).toBe(productId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method should remove the order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.delete(orderId)];
                case 1:
                    order = _a.sent();
                    expect(order.id).toBe(orderId);
                    return [2 /*return*/];
            }
        });
    }); });
});
