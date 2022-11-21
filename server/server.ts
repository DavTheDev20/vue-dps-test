import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Sequelize, Model, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 8080;
const sequelize = new Sequelize('sqlite://./main.db');

interface DealModel {
  id: number;
  accountName: string;
  relationshipManager: string;
  balance: number;
  dealDate: Date;
}

const Deal = sequelize.define('Deal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationshipManager: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dealDate: DataTypes.DATE,
});
sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/api/deals', async (req, res) => {
  const deals = await Deal.findAll();

  return res.status(200).json({ success: true, deals });
});

app.post('/api/deals', async (req, res) => {
  const dealData = req.body;
  try {
    const newDeal = await Deal.create({
      ...dealData,
      dealDate: dealData.dealDate || new Date(),
    });
    newDeal.save();
    sequelize.sync();
    return res.status(200).json({ success: true, deal: newDeal });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
