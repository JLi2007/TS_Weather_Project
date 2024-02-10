var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 4000;
app.use(express.static('client'));
app.use(express.json({ limit: '2mb' }));
app.listen(port, () => console.log(`running on port ${port}`));
app.post('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('request received!');
}));
