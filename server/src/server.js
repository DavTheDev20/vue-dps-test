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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const sequelize = new sequelize_1.Sequelize('sqlite://../server/src/database/main.db');
const Deal = sequelize.define('Deal', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accountName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    relationshipManager: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    dealDate: sequelize_1.DataTypes.DATE,
});
sequelize.sync();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/api/deals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deals = yield Deal.findAll();
    return res.status(200).json({ success: true, deals });
}));
app.post('/api/deals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dealData = req.body;
    try {
        const newDeal = yield Deal.create(Object.assign(Object.assign({}, dealData), { dealDate: dealData.dealDate || new Date() }));
        newDeal.save();
        sequelize.sync();
        return res.status(200).json({ success: true, deal: newDeal });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
